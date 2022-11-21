import { customAxios } from '@src/core/lib/customAxios';
import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { ToastError } from '@src/utils/toast';

import { ApiGetFamilyRecommandDiariesByDate } from '../types/api-diary-interface';

export const apiGetFamilyRecommandDiariesByDate = async (date: string) => {
  try {
    const { data } = await customAxios().get<ApiGetFamilyRecommandDiariesByDate>(
      `/diary/recommend/${date}`
    );
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('일기를 가져오는데 실패했습니다.');
    }
    throw error;
  }
};
