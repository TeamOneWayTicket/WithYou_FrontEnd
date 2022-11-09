import PostImageWrapper from '@src/components/ui/molecule/PostCard/Wrapper/PostImageWrapper';
import ProfilePostCardWrapper from '@src/components/ui/molecule/PostCard/Wrapper/ProfilePostCardWrapper';
import { ApiCreateDiary } from '@src/core/api/interface/api-diary-interface';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const ProfilePostCard: FunctionComponent<{
  postInfo: ApiCreateDiary;
}> = ({ postInfo }) => {
  const {
    diary: { media },
  } = postInfo;
  return (
    <ProfilePostCardWrapper postInfo={postInfo}>
      <Link href={'/post/1'}>
        <a className="block">
          <PostImageWrapper media={media} />
        </a>
      </Link>
    </ProfilePostCardWrapper>
  );
};

export default ProfilePostCard;
