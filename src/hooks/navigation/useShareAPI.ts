import { useCallback, useEffect, useState } from 'react';

import useCopyToClipboard from './useCopyToClipboard';

export interface IWithyouShareAPI {
  diaryId: number;
  title: string;
}

export default function useShareAPI() {
  const [isSupported, setIsSupported] = useState(false);
  const [copiedText, copy] = useCopyToClipboard();

  useEffect(() => {
    if (navigator.share) {
      setIsSupported(true);
    }
  }, []);

  const share = useCallback(
    async ({ title, text, url }: { title: string; text: string; url: string }) => {
      if (isSupported) {
        await navigator.share({
          title,
          text,
          url,
        });
      }
    },
    [isSupported]
  );

  const withyouShare = useCallback(
    ({ diaryId, title }: IWithyouShareAPI) => {
      if (isSupported) {
        share({
          title: title,
          text: '우리 가족 로그를 로그를 공유합니다.',
          url: `${window.location.origin}/diary/${diaryId}`,
        });
      } else {
        copy(`${window.location.origin}/diary/${diaryId}`);
      }
    },
    [copy, isSupported, share]
  );

  return [isSupported, share, withyouShare] as const;
}
