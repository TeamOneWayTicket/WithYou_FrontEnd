import { Icon, ImageWrapper } from '@src/components/ui/atom';
import ShareButton from '@src/components/ui/atom/Button/ShareButton';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { IWithyouShareAPI } from '@src/hooks/navigation/useShareAPI';
import { needDefaultImage } from '@src/utils/imageUtil';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import ImageWithBackground from '../../ImageWithBackground';

interface Props {
  diary: ApiCommonDiaryProps;
  onShareClick: ({ diaryId, title }: IWithyouShareAPI) => void;
}

const ReviewInfiniteSliderItem: FunctionComponent<Props> = ({ diary, onShareClick }) => {
  const {
    author: { thumbnail, role, nickname },
    diary: { content, media },
    commentCount,
  } = diary;
  const diaryId = diary.diary.id;
  return (
    <Link href={`/diary/${diaryId}`}>
      <div className="relative w-full h-full">
        <ImageWrapper
          className="rounded-xl pointer-events-none"
          bgFilter="bg-gradient-to-b from-black/0 to-black/30"
          src={media[0].fileNameInS3}
          alt={`diary-${diaryId}`}
          objectFit="cover"
          layout="fill"
        />
        <div
          className="absolute z-50 flex flex-col bottom-0 left-0 p-side-padding text-white space-y-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <ImageWithBackground src={needDefaultImage(thumbnail)} />
            </div>
            <p>{role}</p>
          </div>
          <div>
            <p>{content}</p>
          </div>
          <div className="flex space-x-2 py-2">
            <div className="flex text-white">
              <Icon name="comment" />
              <span>댓글 {commentCount}개</span>
            </div>
            <ShareButton
              textColor="white"
              onClick={() =>
                onShareClick({
                  diaryId,
                  title: `
                  우리 가족의 로그 - ${nickname}님의 일기
                `,
                })
              }
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ReviewInfiniteSliderItem;
