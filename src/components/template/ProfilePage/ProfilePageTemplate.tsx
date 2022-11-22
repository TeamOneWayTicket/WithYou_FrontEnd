import { FullWidthOverflowScrollWrapper } from '@src/components/ui/atom';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { ProfilePageProps } from '@src/pages/profile';
import React, { Fragment, FunctionComponent } from 'react';

import ProfileDiariesSection from './ProfileDiariesSection';
import ProfileIntroSection from './ProfileIntroSection';

interface ProfilePageTemplateProps {
  user: ProfilePageProps['user'];
  diaries: ApiCommonDiaryProps[];
  handleLoadMore: () => void;
}

const ProfilePageTemplate: FunctionComponent<ProfilePageTemplateProps> = ({
  user,
  diaries,
  handleLoadMore,
}) => {
  return (
    <Fragment>
      <FullWidthOverflowScrollWrapper>
        <ProfileIntroSection userInfo={user} />
        <ProfileDiariesSection diaries={diaries} onScrollReachBottom={handleLoadMore} />
      </FullWidthOverflowScrollWrapper>
    </Fragment>
  );
};

export default ProfilePageTemplate;
