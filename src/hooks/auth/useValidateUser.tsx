import { apiValidate } from '@src/core/api/apiAuth';
import { clearAuthToken } from '@src/utils/authUtil';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function useValidateUser() {
  const router = useRouter();

  const validateUser = useCallback(async () => {
    try {
      const {
        user: { isNew },
      } = await apiValidate();
      if (isNew) {
        router.push('/enroll');
      } else {
        // need router path array for redirect
      }
    } catch (error) {
      clearAuthToken();
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    validateUser();
  }, []);
}
