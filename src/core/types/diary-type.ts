import { ApiCommonDiaryProps } from '../api/types/api-diary-interface';

export interface DiaryAtom {
  isInit: boolean;
  isLast: boolean | null;
  nextId: number | null;
  diaries: ApiCommonDiaryProps[];
}
