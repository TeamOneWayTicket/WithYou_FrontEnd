import { ToastError, ToastSuccess, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';
import { apiGetPresignedUrl } from './apiUtil';

interface UploadProfileInfoRequest {
  imageFile?: File;
  role: string;
  nickname: string;
  code: string | null;
}

interface UpdateProfileImageRequest {
  s3Url: string;
}

export const apiUpdateThumbnail = async (imageFile: File) => {
  try {
    if (!imageFile || imageFile === null) {
      throw new Error('이미지 파일이 없습니다.');
    }
    const { fileName } = await apiGetPresignedUrl(imageFile);
    await customAxios().post<UpdateProfileImageRequest>('/user/thumbnail/upload', {
      fileName,
    });
    ToastSuccess('프로필 이미지가 변경되었습니다.');
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('프로필 이미지 업로드에 실패했습니다.');
      throw err;
    }
  }
};

export const apiUploadProfileInfo = async ({
  imageFile,
  role,
  nickname,
  code,
}: UploadProfileInfoRequest) => {
  // if code is null, it means that the user should create a new code
  const createFamily = code ? false : true;
  try {
    let fileName = '';
    if (imageFile) {
      const presignedURL = await apiGetPresignedUrl(imageFile);
      fileName = presignedURL.fileName;
    }
    await customAxios().post('/user/profile/upload', {
      fileName,
      role,
      nickname,
      gender: '',
      code,
      createFamily,
    });
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('프로필 등록에 실패했습니다. 다시 시도해주세요.');
      throw err;
    }
  }
};
