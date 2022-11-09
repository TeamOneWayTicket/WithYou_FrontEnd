import MainPostCardWrapper from '@src/components/ui/molecule/PostCard/Wrapper/MainPostCardWrapper';
import PostImageWrapper from '@src/components/ui/molecule/PostCard/Wrapper/PostImageWrapper';
import { ApiCommonDiaryProps } from '@src/core/api/interface/api-diary-interface';
import Link from 'next/link';
import { FunctionComponent } from 'react';

const MainPostCard: FunctionComponent<{
  postInfo: ApiCommonDiaryProps;
}> = ({ postInfo }) => {
  const {
    diary: { id, content, media },
  } = postInfo;

  return (
    <MainPostCardWrapper postInfo={postInfo}>
      <Link href={`/post/${id}`}>
        <a className="block">
          <PostImageWrapper media={media} />
        </a>
      </Link>
      <div className="w-full">
        <p className="hide-text-overflow">{content}</p>
        <div className="text-link-700">..더보기</div>
      </div>
    </MainPostCardWrapper>
  );
};

export default MainPostCard;
