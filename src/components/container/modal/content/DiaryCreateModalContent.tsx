import { closeModal } from '@src/atom/modal';
import { addMyDiaryReverse } from '@src/atom/myDiary';
import { Button, IconButton } from '@src/components/ui/atom';
import DropZone from '@src/components/ui/organism/Dropzone';
import { apiCreateDiary } from '@src/core/api/apiDiary';
import { ModalContentType } from '@src/core/types/modal-type';
import { ToastError } from '@src/utils/toast';
import { twcDivide } from '@src/utils/twcUtil';
import cx from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

const PostCreateModalContentHeader: FunctionComponent<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <div
      className={cx(
        'relative top-0 w-full h-gb-header',
        'flex items-center justify-between',
        'bg-primary-bg text-black'
      )}
    >
      <IconButton type="button" name="close" size={28} onClick={onClose} />
      <h2>새 로그</h2>
      <Button type="submit" size="none" styles="transparent" className="text-wy-blue-500 text-lg">
        완료
      </Button>
    </div>
  );
};

const PostCreateModalContent: FunctionComponent<ModalContentType> = ({}) => {
  const addMyDiariesCB = useSetRecoilState(addMyDiaryReverse);
  const closeModalCB = useSetRecoilState(closeModal);
  const [imageFiles, setImageFiles] = useState([]);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageFiles.length === 0) {
      alert('이미지를 업로드해주세요');
      return;
    }
    try {
      const diaryElem = await apiCreateDiary({
        content,
        imageFiles,
      });
      addMyDiariesCB((prev) => {
        return {
          ...prev,
          diaries: [diaryElem],
        };
      });
      closeModalCB();
    } catch (e) {
      ToastError('포스트를 생성할 수 없습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <form onSubmit={handleSubmit} className="h-full">
        <PostCreateModalContentHeader onClose={() => closeModalCB()} />
        <div className={cx('h-full pt-4 children:py-5', twcDivide)}>
          <div className="h-full flex flex-col space-x-2">
            <div className="relative flex-shrink-0 w-full h-1/3">
              <DropZone imageFiles={imageFiles} setImageFiles={setImageFiles} />
            </div>
            <textarea
              className="w-full h-20 border-none outline-none resize-none bg-white"
              placeholder="이 사진에 대해 설명해주세요"
              maxLength={200}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreateModalContent;
