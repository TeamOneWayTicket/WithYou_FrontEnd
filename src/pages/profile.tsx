import { addFamilyDiaries } from '@src/atom/familyDiary';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import ProfileIntroSection from '@src/components/template/ProfilePage/ProfileIntroSection';
import ProfilePostsSection from '@src/components/template/ProfilePage/ProfilePostsSection';
import { FullWidthOverflowScrollWrapper, IconButton } from '@src/components/ui/atom';
import { apiGetMyDiariesInfinite } from '@src/core/api/apiDiary';
import { ApiGetDiariesInfinite } from '@src/core/api/interface/api-diary-interface';
import siteMetadata from '@src/core/config/siteMetadata';
import { CommonUserAuthInfoType } from '@src/core/types/auth-type';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

interface ProfilePageProps {
  user: CommonUserAuthInfoType['user'];
  initialDiaryInfo: ApiGetDiariesInfinite;
}

export const getServerSideProps = withAuthSSR(async (ctx) => {
  const { user } = ctx.credInfo;
  const diaryInfo = await apiGetMyDiariesInfinite({
    nextId: null,
    take: 5,
  });
  return {
    props: {
      user,
      initialDiaryInfo: diaryInfo,
    },
  };
});

const ProfilePage: NextPage<ProfilePageProps> = ({ user, initialDiaryInfo }) => {
  const isInit = useRef(false);
  const nextId = useRef(initialDiaryInfo.nextId);
  const isLast = useRef(initialDiaryInfo.isLast);
  const [familyDiaries, setFamilyDiaries] = useRecoilState(addFamilyDiaries);

  useEffect(() => {
    if (!isInit.current && familyDiaries.diaries.length === 0) {
      setFamilyDiaries({
        diaries: initialDiaryInfo.diaries,
      });
      isInit.current = true;
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLast.current) return;
    const diaryInfo = await apiGetMyDiariesInfinite({
      nextId: nextId.current,
      take: 5,
    });
    nextId.current = diaryInfo.nextId;
    isLast.current = diaryInfo.isLast;
    setFamilyDiaries({
      diaries: diaryInfo.diaries,
    });
  }, [setFamilyDiaries]);

  return (
    <PageLayout
      showNavigation
      fullWidth
      fixedHeight
      headerContent={
        <div className="w-full flex justify-between items-center">
          <p className="font-bold">내 프로필</p>
          <IconButton name="setting" size={20} />
        </div>
      }
    >
      <PageSEO title={siteMetadata.title + ' Profile'} description={'profile page'} />
      <FullWidthOverflowScrollWrapper>
        <ProfileIntroSection userInfo={user} />
        <ProfilePostsSection diaries={familyDiaries.diaries} onScrollReachBottom={handleLoadMore} />
      </FullWidthOverflowScrollWrapper>
    </PageLayout>
  );
};

export default withAuthCSR(ProfilePage);
