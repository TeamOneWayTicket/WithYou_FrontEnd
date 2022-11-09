import { Icon } from '@src/components/ui/atom';
import PostCardHeader from '@src/components/ui/atom/Header/PostCardHeader';
import PostCardWrapper, {
  CommonPostCardWrapperProps,
} from '@src/components/ui/molecule/PostCard/Wrapper/PostCardWrapper';
import { FC } from 'react';

const MainPostCardWrapper: FC<CommonPostCardWrapperProps> = ({ postInfo, children }) => {
  const {
    diary: { createdAt },
    author: { thumbnail, nickname },
    commentCount,
  } = postInfo;

  return (
    <PostCardWrapper>
      <PostCardHeader
        profileImage={thumbnail}
        profileName={nickname}
        timeStamp={createdAt.slice(0, 7)}
      />
      {children}
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
    </PostCardWrapper>
  );
};

export default MainPostCardWrapper;
