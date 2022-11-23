import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { IWithyouShareAPI } from '@src/hooks/navigation/useShareAPI';
import { parseDate } from '@src/utils/dateUtil';
import { FunctionComponent } from 'react';

import { Icon } from '../../atom';
import ShareButton from '../../atom/Button/ShareButton';
import DiaryCardHeader from '../../atom/Header/DiaryCardHeader';
import DiaryCardWrapper from './common/DiaryCardWrapper';
import DiaryContent from './common/DiaryContent';

interface Props {
  diaryInfo: ApiCommonDiaryProps;
  onShareClick: ({ diaryId, title }: IWithyouShareAPI) => void;
}

const MainDiaryCard: FunctionComponent<Props> = ({ diaryInfo, onShareClick }) => {
  const {
    diary: { createdAt, id },
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
        <ShareButton
          onClick={() => {
            onShareClick({
              diaryId: id,
              title: `
              우리 가족의 로그 - ${nickname}님의 일기
            `,
            });
          }}
        />
      </div>
    </DiaryCardWrapper>
  );
};

export default MainDiaryCard;
