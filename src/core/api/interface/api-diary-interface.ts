export interface IDiaryProps {
  id: number;
  familyId: number;
  authorId: number;
  content: string;
  createdAt: string;
}

export type ApiCreateDiary = IDiaryProps;
export type ApiUpdateDiary = IDiaryProps;

export interface ApiGetDiariesInfinite {
  diaries: IDiaryProps[];
  nextId: number;
  isLast: boolean;
}

export interface ApiGetAllDiaries {
  diaries: IDiaryProps[];
}
