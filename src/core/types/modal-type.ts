export type DiaryCreateModal = 'DIARYCREATE';
export type EmailSignInModal = 'EMAILSIGNIN';
export type EmailSignUpModal = 'EMAILSIGNUP';

export type ModalType = DiaryCreateModal | EmailSignInModal | EmailSignUpModal;

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
