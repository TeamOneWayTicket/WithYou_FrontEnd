import { SignInResult, ValidateResult } from '@src/core/types/auth-type';
import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { clearAuthToken, setAuthToken } from '@src/utils/authUtil';
import { ToastError, ToastWarn } from '@src/utils/toast';
import Cookies from 'js-cookie';

import { customAxios } from '../lib/customAxios';

export const apiValidate = async () => {
  try {
    const { data } = await customAxios().get<ValidateResult>('/auth/validate');
    return data;
  } catch (err) {
    if (Cookies.get('jwt')) {
      ToastError('error occured during validation process');
      clearAuthToken();
    }
    throw err;
  }
};

export const apiLocalSignIn = async (email: string, password: string) => {
  try {
    const {
      data: { jwtToken },
    } = await customAxios().post<SignInResult>('/auth/local/login', {
      email,
      password,
    });
    setAuthToken(jwtToken);
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('로그인 과정중 에러가 발생했습니다.');
      throw err;
    }
  }
};

export const apiLocalSignUp = async (email: string, password: string) => {
  try {
    const {
      data: { jwtToken },
    } = await customAxios().post<SignInResult>('/auth/local/register', {
      email,
      password,
    });
    setAuthToken(jwtToken);
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('회원가입 과정중 에러가 발생했습니다.');
      throw err;
    }
  }
};

export const apiKakaoSignIn = async ({ accessToken }: { accessToken: string }) => {
  try {
    await customAxios().post<SignInResult>('/auth/kakao/callback', {
      accessToken,
    });
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('카카오 로그인 과정중 에러가 발생했습니다.');
      throw err;
    }
  }
};
