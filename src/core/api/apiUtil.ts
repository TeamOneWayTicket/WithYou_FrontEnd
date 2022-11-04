import { parseExtUtil } from '@src/utils/parseUtil';
import { ToastError, ToastWarn } from '@src/utils/toast';

import { customAxios } from '../lib/customAxios';
import { CommonApiError, isAxiosError } from '../types/axios-error';

interface GetProfileUploadUrlRequest {
  s3Url: string;
  fileName: string;
}

export const apiGetPresignedUrl = async (
  originFile: File
): Promise<Pick<GetProfileUploadUrlRequest, 'fileName'>> => {
  try {
    const {
      data: { s3Url, fileName },
    } = await customAxios().get<GetProfileUploadUrlRequest>('/user/profile/upload-url', {
      params: {
        contentType: parseExtUtil(originFile.name),
      },
    });
    await fetch(s3Url, {
      method: 'PUT',
      headers: {
        'Content-Type': originFile.type,
      },
      body: originFile,
    });
    return { fileName };
  } catch (err) {
    if (isAxiosError<CommonApiError>(err)) {
      const { message, error } = err.response.data;
      ToastWarn(message);
      throw new Error(error);
    } else {
      ToastError('error occured during kakao signin process');
      throw err;
    }
  }
};
