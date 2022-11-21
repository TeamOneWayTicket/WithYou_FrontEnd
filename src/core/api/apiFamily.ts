import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';
import { ApiGetInviteCode } from './types/api-family-interface';

export const apiGetInviteCode = async () => {
  try {
    const { data } = await customAxios().get<ApiGetInviteCode>('/family/invite-code');
    return data;
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('초대코드를 가져오는데 실패했습니다.');
      throw err;
    }
  }
};
