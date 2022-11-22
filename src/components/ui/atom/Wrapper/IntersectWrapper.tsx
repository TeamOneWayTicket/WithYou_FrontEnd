import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react';

const IntersectWrapper: FunctionComponent<{
  keepObserve: boolean;
  onIntersect: () => void;
}> = ({ keepObserve = false, onIntersect }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const onIntersection = useCallback(
    (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!keepObserve) {
            io.unobserve(entry.target);
          }
          onIntersect();
        }
      });
    },
    [keepObserve, onIntersect]
  );

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(onIntersection);
    }
    divRef.current && observerRef.current?.observe(divRef.current);
  }, [onIntersection]);

  return <div ref={divRef} />;
};

export default IntersectWrapper;
