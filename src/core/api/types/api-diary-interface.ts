export interface IDiaryProps {
  id: number;
  familyId: number;
  authorId: number;
  content: string;
  type: string;
  createdAt: string;
  media: IDiaryMediaProps[];
}

export interface IAuthorProps {
  roles: string[];
  id: number;
  familyId: number;
  nickname: string;
  vendor: string;
  thumbnail: string;
  gender: string;
  role: string;
}

export interface IDiaryMediaProps {
  id: number;
  diaryId: number;
  order: number;
  fileNameInS3: string;
  createdAt: string;
}

export interface ApiCommonDiaryProps {
  diary: IDiaryProps;
  author: IAuthorProps;
  commentCount: number;
}

export type ApiGetDiary = ApiCommonDiaryProps;
export type ApiCreateDiary = ApiCommonDiaryProps;
export type ApiUpdateDiary = ApiCommonDiaryProps;

export interface ApiGetDiariesInfinite {
  diaries: ApiCommonDiaryProps[];
  nextId: number | null;
  isLast: boolean;
}

export interface ApiGetFamilyRecommandDiariesByDate {
  diaries: ApiCommonDiaryProps[];
}
