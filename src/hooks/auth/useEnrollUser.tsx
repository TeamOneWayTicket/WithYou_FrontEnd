import { apiValidate } from '@src/core/api/apiAuth';
import { clearAuthToken } from '@src/utils/authUtil';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useValidateUser() {
  const router = useRouter();

  const validateUser = async () => {
    try {
      const {
        user: { isNew },
      } = await apiValidate();
      if (!isNew) {
        router.push('/');
      }
    } catch (error) {
      clearAuthToken();
      router.push('/login');
    }
  };

  useEffect(() => {
    validateUser();
  });
}
