import PostImageWrapper from '@src/components/ui/molecule/DiaryCard/Wrapper/DiaryImageWrapper';
import ProfilePostCardWrapper from '@src/components/ui/molecule/DiaryCard/Wrapper/ProfileDiaryCardWrapper';
import { ApiCreateDiary } from '@src/core/api/types/api-diary-interface';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const ProfileDiaryCard: FunctionComponent<{
  diaryInfo: ApiCreateDiary;
}> = ({ diaryInfo }) => {
  const {
    diary: { media, id },
  } = diaryInfo;
  return (
    <ProfilePostCardWrapper diaryInfo={diaryInfo}>
      <Link href={`/diary/${id}`}>
        <a className="block">
          <PostImageWrapper media={media} />
        </a>
      </Link>
    </ProfilePostCardWrapper>
  );
};

export default ProfileDiaryCard;
