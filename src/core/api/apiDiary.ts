import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';
import { apiGetPresignedUrl } from './apiUtil';
import {
  ApiCreateDiary,
  ApiGetAllDiaries,
  ApiGetDiariesInfinite,
  ApiUpdateDiary,
} from './interface/api-diary-interface';

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

export const apiGetAllMyDiaries = async () => {
  try {
    const { data } = await customAxios().get<ApiGetAllDiaries>('/diary/my/all');
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('다이어리를 불러오는데 실패했습니다.');
    }
  }
};

export const apiGetAllFamilyDiaries = async () => {
  try {
    const { data } = await customAxios().get<ApiGetAllDiaries>('/diary/family/all');
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
  imageFile,
}: {
  content: string;
  imageFile: File | Array<File> | null;
}) => {
  try {
    const fileNameArray: string[] = [];
    if (imageFile) {
      if (Array.isArray(imageFile)) {
        for (let i = 0; i < imageFile.length; i++) {
          const { fileName } = await apiGetPresignedUrl(imageFile[i]);
          fileNameArray.push(fileName);
        }
      } else {
        const { fileName } = await apiGetPresignedUrl(imageFile);
        fileNameArray.push(fileName);
      }
    }
    const { data } = await customAxios().post<ApiCreateDiary>('/diary', {
      content,
      fileNameInS3: fileNameArray,
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
