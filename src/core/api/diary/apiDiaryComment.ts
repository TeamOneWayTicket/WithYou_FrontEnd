import { customAxios } from '@src/core/lib/customAxios';
import { CommonApiError, isAxiosError } from '@src/core/types/axios-error';
import { ToastError } from '@src/utils/toast';

import { ApiCreateDiaryComment, ApiGetDiaryComments } from '../types/api-diary-comment-interface';

export const apiGetCommentsById = async (id: number) => {
  try {
    const { data } = await customAxios().get<ApiGetDiaryComments>(`/diary/comment/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('댓글을 불러오는데 실패했습니다.');
    }
    throw error;
  }
};

export const apiCreateCommentById = async ({ id, content }: { id: number; content: string }) => {
  try {
    const { data } = await customAxios().post<ApiCreateDiaryComment>('/diary/comment', {
      diaryId: id,
      content,
    });
    return data;
  } catch (error) {
    if (isAxiosError<CommonApiError>(error)) {
      ToastError(error.response.data.message);
    } else {
      ToastError('댓글을 작성하는데 실패했습니다.');
    }
    throw error;
  }
};
