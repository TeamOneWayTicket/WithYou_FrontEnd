// check cookies, axios header
import { envConfig } from '@src/core/config/envConfig';
import { customAxios } from '@src/core/lib/customAxios';
import Cookies from 'js-cookie';

const options = {
  domain: envConfig.jwtDomain,
};

export const setAuthToken = (token: string) => {
  Cookies.set('jwt', token, options);
  customAxios().defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAuthToken = (): string => {
  const token = Cookies.get('jwt')?.toString() || '';
  return token;
};

export const clearAuthToken = () => {
  Cookies.remove('jwt', options);
  customAxios().defaults.headers.common.Authorization = '';
};
