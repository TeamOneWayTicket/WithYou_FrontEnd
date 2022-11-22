import { toast } from 'react-toastify';

export const ToastError = (message: string) => {
  return toast.error(message, {
    toastId: 1,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastWarn = (message: string) => {
  return toast.warn(message, {
    toastId: 1,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastSuccess = (message: string) => {
  return toast.success(message, {
    toastId: 1,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastInfo = (message: string) => {
  return toast.info(message, {
    toastId: 1,
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastWaitingResult = (message: string, id: number) => {
  return toast.info(message, {
    toastId: id,
    position: 'top-center',
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const ToastWaitingResultClose = (id: number) => {
  return toast.dismiss(id);
};
