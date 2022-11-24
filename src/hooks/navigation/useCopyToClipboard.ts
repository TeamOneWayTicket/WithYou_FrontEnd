import { ToastSuccess, ToastWarn } from '@src/utils/toast';
import { useCallback, useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      ToastWarn('브라우저에서 클립보드를 지원하지 않습니다.');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      ToastSuccess('클립보드에 복사되었습니다.');
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      ToastWarn('클립보드에 복사하지 못했습니다.');
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}

export default useCopyToClipboard;
