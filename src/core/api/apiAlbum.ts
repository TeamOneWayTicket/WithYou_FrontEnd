import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';

export interface IFamilyPhoto {
  diaryId: number;
  url: string;
}

export interface ApiFamilyPhotosResponse {
  media: IFamilyPhoto[];
}

export const apiGetFamilyPhotos = async () => {
  try {
    const { data } = await customAxios().get<ApiFamilyPhotosResponse>('/album/family');
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('앨범을 불러오는 과정중 에러가 발생했습니다.');
      throw err;
    }
  }
};
