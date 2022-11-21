import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { needDefaultImage } from '@src/utils/imageUtil';
import Link from 'next/link';
import { FunctionComponent } from 'react';

import { Icon, ImageWrapper } from '../../atom';
import ImageWithBackground from '../ImageWithBackground';

interface Props {
  diary: ApiCommonDiaryProps;
}

const InfiniteSliderItem: FunctionComponent<Props> = ({ diary }) => {
  const {
    author: { thumbnail, role },
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
        <div className="absolute z-20 flex flex-col bottom-0 left-0 p-side-padding text-white space-y-4">
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
            <div className="flex text-white">
              <Icon name="share" />
              <span>공유하기</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InfiniteSliderItem;
