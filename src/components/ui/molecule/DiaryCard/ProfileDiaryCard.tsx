import { ApiCreateDiary } from '@src/core/api/types/api-diary-interface';
import { parseDate } from '@src/utils/dateUtil';
import React, { FunctionComponent } from 'react';

import DiaryCardWrapper from './common/DiaryCardWrapper';
import DiaryContent from './common/DiaryContent';

const ProfileDiaryCard: FunctionComponent<{
  diaryInfo: ApiCreateDiary;
}> = ({ diaryInfo }) => {
  const {
    diary: { createdAt },
  } = diaryInfo;
  return (
    <DiaryCardWrapper>
      <DiaryContent diaryInfo={diaryInfo} />
      <div className="w-full">
        <p className="text-gray-400">
          {parseDate({
            date: createdAt,
          })}
        </p>
      </div>
    </DiaryCardWrapper>
  );
};

export default ProfileDiaryCard;
