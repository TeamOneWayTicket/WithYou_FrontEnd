import { ToastSuccess, ToastWarn } from '@src/utils/toast';
import { useCallback, useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      ToastWarn('클립보드를 지원하지 않는 브라우저입니다.');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      ToastSuccess('클립보드에 복사되었습니다.');
      return true;
    } catch (error) {
      ToastWarn('클립보드에 복사하는데 실패했습니다.');
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}

export default useCopyToClipboard;
