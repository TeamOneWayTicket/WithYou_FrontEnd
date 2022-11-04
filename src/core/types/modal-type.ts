export type PostCreateModal = 'POSTCREATE';
export type EmailSignInModal = 'EMAILSIGNIN';
export type EmailSignUpModal = 'EMAILSIGNUP';

export type ModalType = PostCreateModal | EmailSignInModal | EmailSignUpModal;

export type ModalInfoType = {
  type: ModalType | null;
  title: string | null;
  fullScreen?: boolean;
  option?: unknown;
};

export type ModalContentType = {
  option?: unknown;
};

export type RoomJoinModalContentOption = {
  roomId: string;
};
