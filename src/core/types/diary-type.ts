import { ApiGetDiariesInfinite } from '../api/types/api-diary-interface';

export interface DiaryAtom extends ApiGetDiariesInfinite {
  isInit: boolean;
}
