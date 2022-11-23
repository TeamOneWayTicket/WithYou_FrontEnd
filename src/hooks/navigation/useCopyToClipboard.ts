import { ToastSuccess, ToastWarn } from '@src/utils/toast';
import { useCallback, useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        ToastSuccess('클립보드에 복사되었습니다.');
        return true;
      } catch (error) {
        setCopiedText(null);
        ToastWarn('클립보드 복사에 실패했습니다. 다시 시도해주세요.');
        return false;
      }
    } else {
      if (!document.queryCommandSupported('copy')) {
        ToastWarn('복사 기능을 지원하지 않는 브라우저입니다.');
        setCopiedText(null);
        return false;
      }
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'hidden';

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      ToastSuccess('클립보드에 복사되었습니다.');
      setCopiedText(text);
      return true;
    }
  }, []);

  return [copiedText, copy];
}

export default useCopyToClipboard;
