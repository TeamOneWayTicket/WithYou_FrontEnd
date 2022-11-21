import { clearAuthToken } from '@src/utils/authUtil';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export default function useLogout() {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    clearAuthToken();
    router.push('/login');
  }, [router]);

  return [handleLogout] as const;
}
