import { FullWidthOverflowScrollWrapper } from '@src/components/ui/atom';
import { DiaryAtom } from '@src/core/types/diary-type';
import { ProfilePageProps } from '@src/pages/profile';
import React, { Fragment, FunctionComponent } from 'react';

import ProfileDiariesSection from './ProfileDiariesSection';
import ProfileIntroSection from './ProfileIntroSection';

interface ProfilePageTemplateProps {
  user: ProfilePageProps['user'];
  familyDiariesInfo: DiaryAtom;
  handleLoadMore: () => void;
}

const ProfilePageTemplate: FunctionComponent<ProfilePageTemplateProps> = ({
  user,
  familyDiariesInfo,
  handleLoadMore,
}) => {
  return (
    <Fragment>
      <FullWidthOverflowScrollWrapper>
        <ProfileIntroSection userInfo={user} />
        <ProfileDiariesSection
          isInit={familyDiariesInfo.isInit}
          diaries={familyDiariesInfo.diaries}
          onScrollReachBottom={handleLoadMore}
        />
      </FullWidthOverflowScrollWrapper>
    </Fragment>
  );
};

export default ProfilePageTemplate;
