import { useCallback, useEffect } from 'react';

export default function useTimeout(callback: () => void, delay: number) {
  const memoCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const timeout = setTimeout(memoCallback, delay);

    return () => clearTimeout(timeout);
  }, [delay, memoCallback]);
}
