import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';
import { apiGetPresignedUrl } from './apiUtil';

interface UploadProfileInfoRequest {
  imageFile?: File;
  role: string;
  nickname: string;
  code: string | null;
}

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
      ToastError('error occured during upload profile info process');
      throw err;
    }
  }
};
