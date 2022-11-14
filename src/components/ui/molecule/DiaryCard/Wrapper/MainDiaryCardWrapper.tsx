import { Icon } from '@src/components/ui/atom';
import PostCardHeader from '@src/components/ui/atom/Header/DiaryCardHeader';
import PostCardWrapper, {
  CommonPostCardWrapperProps,
} from '@src/components/ui/molecule/DiaryCard/Wrapper/DiaryCardWrapper';
import { parseDate } from '@src/utils/dateUtil';
import { FC } from 'react';

const MainDiaryCardWrapper: FC<CommonPostCardWrapperProps> = ({
  hideCommentCount,
  diaryInfo,
  children,
}) => {
  const {
    diary: { createdAt },
    author: { thumbnail, nickname },
    commentCount,
  } = diaryInfo;

  return (
    <PostCardWrapper>
      <PostCardHeader
        profileImage={thumbnail}
        profileName={nickname}
        timeStamp={parseDate({
          date: createdAt,
        })}
      />
      {children}
      <div className="flex space-x-2 py-2">
        {!hideCommentCount && (
          <div className="flex text-gray-500">
            <Icon name="comment" />
            <span>댓글 {commentCount}개</span>
          </div>
        )}
        <div className="flex text-gray-500">
          <Icon name="share" />
          <span>공유하기</span>
        </div>
      </div>
    </PostCardWrapper>
  );
};

export default MainDiaryCardWrapper;
