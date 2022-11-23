import { ApiCreateDiary } from '@src/core/api/types/api-diary-interface';
import { IWithyouShareAPI } from '@src/hooks/navigation/useShareAPI';
import { parseDate } from '@src/utils/dateUtil';
import React, { FunctionComponent } from 'react';

import ShareButton from '../../atom/Button/ShareButton';
import DiaryCardHeader from '../../atom/Header/DiaryCardHeader';
import DetailDiaryInfiniteSliderItem from '../Slider/contents/DetailDiaryInfiniteSliderItem';
import InfiniteSlider from '../Slider/InfiniteSlider';
import DiaryCardWrapper from './common/DiaryCardWrapper';

interface Props {
  diaryInfo: ApiCreateDiary;
  onShareClick: ({ diaryId, title }: IWithyouShareAPI) => void;
}

const DetailDiaryCard: FunctionComponent<Props> = ({ diaryInfo, onShareClick }) => {
  const {
    diary: { createdAt, content, id, media },
    author: { thumbnail, nickname },
  } = diaryInfo;
  return (
    <DiaryCardWrapper>
      <DiaryCardHeader
        profileImage={thumbnail}
        profileName={nickname}
        timeStamp={parseDate({
          date: createdAt,
        })}
      />
      <p>{content}</p>
      <InfiniteSlider enableDot>
        {media.map((el, idx) => (
          <div key={`detail-diary-slider-item-${idx}`} className="h-[320px]">
            <DetailDiaryInfiniteSliderItem media={el} />
          </div>
        ))}
      </InfiniteSlider>
      <div className="flex space-x-2 py-2">
        <ShareButton
          onClick={() =>
            onShareClick({
              diaryId: id,
              title: `
          우리 가족의 로그 - ${nickname}님의 일기
        `,
            })
          }
        />
      </div>
    </DiaryCardWrapper>
  );
};

export default DetailDiaryCard;
