import PostCardWrapper, {
  CommonPostCardWrapperProps,
} from '@src/components/ui/molecule/DiaryCard/Wrapper/DiaryCardWrapper';
import { parseDate } from '@src/utils/dateUtil';
import React, { FunctionComponent } from 'react';

const ProfileDiaryCardWrapper: FunctionComponent<CommonPostCardWrapperProps> = ({
  diaryInfo,
  children,
}) => {
  const {
    diary: { content, createdAt },
  } = diaryInfo;

  return (
    <PostCardWrapper>
      {children}
      <div className="w-full">
        <p className="hide-text-overflow">{content}</p>
        <div className="text-link-700">..더보기</div>
      </div>
      <div className="w-full">
        <p className="text-gray-400">
          {parseDate({
            date: createdAt,
          })}
        </p>
      </div>
    </PostCardWrapper>
  );
};

export default ProfileDiaryCardWrapper;
