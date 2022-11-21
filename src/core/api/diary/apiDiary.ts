import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../../lib/customAxios';
import { CommonApiError, isAxiosError } from '../../types/axios-error';
import { apiGetPresignedUrl } from '../apiUtil';
import {
  ApiCreateDiary,
  ApiGetDiariesInfinite,
  ApiGetDiary,
  ApiUpdateDiary,
} from '../types/api-diary-interface';

export const apiGetMyDiariesInfinite = async ({
  nextId,
  take,
}: {
  nextId: number;
  take: number;
}) => {
  try {
    const { data } = await customAxios().get<ApiGetDiariesInfinite>('/diary/my', {
      params: {
        nextId,
        take,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('다이어리를 불러오는데 실패했습니다.');
    }
  }
};

export const apiGetFamilyDiariesInfinite = async ({
  nextId,
  take,
}: {
  nextId: number;
  take: number;
}) => {
  try {
    const { data } = await customAxios().get<ApiGetDiariesInfinite>('/diary/family', {
      params: {
        nextId,
        take,
      },
    });
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('다이어리를 불러오는데 실패했습니다.');
    }
  }
};

export const apiUpdateDiary = async ({ id, content }: { id: number; content: string }) => {
  try {
    const { data } = await customAxios().put<ApiUpdateDiary>(`/diary/${id}`, {
      content,
    });
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('다이어리를 수정하는데 실패했습니다.');
    }
  }
};

export const apiCreateDiary = async ({
  content,
  imageFiles,
}: {
  content: string;
  imageFiles: File | Array<File> | null;
}) => {
  try {
    const fileNameArray: string[] = [];
    if (imageFiles) {
      if (Array.isArray(imageFiles)) {
        for (let i = 0; i < imageFiles.length; i++) {
          const { fileName } = await apiGetPresignedUrl(imageFiles[i]);
          fileNameArray.push(fileName);
        }
      } else {
        const { fileName } = await apiGetPresignedUrl(imageFiles);
        fileNameArray.push(fileName);
      }
    }
    const { data } = await customAxios().post<ApiCreateDiary>('/diary', {
      content,
      fileNamesInS3: fileNameArray,
    });
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('다이어리를 생성하는데 실패했습니다.');
      throw err;
    }
  }
};

export const apiGetDiaryById = async (id: number) => {
  try {
    const { data } = await customAxios().get<ApiGetDiary>(`/diary/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      ToastError(err.response.data.message);
    } else {
      ToastError('다이어리를 불러오는데 실패했습니다.');
    }
    throw err;
  }
};
