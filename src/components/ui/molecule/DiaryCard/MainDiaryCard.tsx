import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { parseDate } from '@src/utils/dateUtil';
import { FunctionComponent } from 'react';

import { Icon } from '../../atom';
import DiaryCardHeader from '../../atom/Header/DiaryCardHeader';
import DiaryCardWrapper from './common/DiaryCardWrapper';
import DiaryContent from './common/DiaryContent';

const MainDiaryCard: FunctionComponent<{
  diaryInfo: ApiCommonDiaryProps;
}> = ({ diaryInfo }) => {
  const {
    diary: { createdAt },
    author: { thumbnail, nickname },
    commentCount,
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
      <DiaryContent diaryInfo={diaryInfo} />
      <div className="flex space-x-2 py-2">
        <div className="flex text-gray-500">
          <Icon name="comment" />
          <span>댓글 {commentCount}개</span>
        </div>
        <div className="flex text-gray-500">
          <Icon name="share" />
          <span>공유하기</span>
        </div>
      </div>
    </DiaryCardWrapper>
  );
};

export default MainDiaryCard;
