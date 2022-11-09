import { useCallback, useRef } from 'react';

export default function useInfiniteScroll({
  nextId,
  isLast,
  callback,
}: {
  nextId: string | number | null;
  isLast: boolean;
  callback: () => Promise<void>;
}) {
  const _nextId = useRef(nextId);
  const _isLast = useRef(isLast);

  const handleLoadMore = useCallback(async () => {
    if (_isLast.current) return;
    await callback();
  }, [callback]);

  const onLoadEnd = useCallback(({ isEnd, nextId }) => {
    isEnd ? (_isLast.current = true) : (_nextId.current = nextId);
    _nextId.current = nextId;
  }, []);

  return [handleLoadMore, onLoadEnd] as const;
}
