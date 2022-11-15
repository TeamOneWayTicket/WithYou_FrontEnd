import { Icon } from '@src/components/ui/atom';
import { ApiCreateDiary } from '@src/core/api/types/api-diary-interface';
import { parseDate } from '@src/utils/dateUtil';
import React, { FunctionComponent } from 'react';

import DiaryCardHeader from '../../atom/Header/DiaryCardHeader';
import DiaryCardWrapper from './common/DiaryCardWrapper';
import DiaryContent from './common/DiaryContent';

const DetailDiaryCard: FunctionComponent<{
  diaryInfo: ApiCreateDiary;
}> = ({ diaryInfo }) => {
  const {
    diary: { createdAt },
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
      <DiaryContent showFullContent showContentReverse diaryInfo={diaryInfo} />
      <div className="flex space-x-2 py-2">
        <div className="flex text-gray-500">
          <Icon name="share" />
          <span>공유하기</span>
        </div>
      </div>
    </DiaryCardWrapper>
  );
};

export default DetailDiaryCard;
