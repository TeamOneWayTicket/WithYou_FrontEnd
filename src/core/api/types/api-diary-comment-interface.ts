export interface IComment {
  author: string;
  thumbnail: string;
  comment: string;
  createdAt: string;
}

export type ApiCreateDiaryComment = IComment[];
export type ApiGetDiaryComments = IComment[];
