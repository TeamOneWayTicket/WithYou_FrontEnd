import { addFamilyDiaries } from '@src/atom/familyDiary';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import ProfileDiariesSection from '@src/components/template/ProfilePage/ProfileDiariesSection';
import ProfileIntroSection from '@src/components/template/ProfilePage/ProfileIntroSection';
import { FullWidthOverflowScrollWrapper, IconButton } from '@src/components/ui/atom';
import { apiGetMyDiariesInfinite } from '@src/core/api/apiDiary';
import { ApiGetDiariesInfinite } from '@src/core/api/types/api-diary-interface';
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
  const [familyDiariesInfo, setFamilyDiariesInfo] = useRecoilState(addFamilyDiaries);
  const isLast = useRef(initialDiaryInfo.isLast);
  const nextId = useRef(initialDiaryInfo.nextId);

  useEffect(() => {
    if (!familyDiariesInfo.isInit) {
      setFamilyDiariesInfo({
        isInit: true,
        isLast: initialDiaryInfo.isLast,
        nextId: initialDiaryInfo.nextId,
        diaries: initialDiaryInfo.diaries,
      });
    } else {
      isLast.current = familyDiariesInfo.isLast;
      nextId.current = familyDiariesInfo.nextId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLast.current) return;

    const nextDiaryRes = await apiGetMyDiariesInfinite({
      nextId: nextId.current,
      take: 5,
    });
    setFamilyDiariesInfo({
      isInit: true,
      isLast: nextDiaryRes.isLast,
      nextId: nextDiaryRes.nextId,
      diaries: nextDiaryRes.diaries,
    });
    isLast.current = nextDiaryRes.isLast;
    nextId.current = nextDiaryRes.nextId;
  }, [setFamilyDiariesInfo]);

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
        <ProfileDiariesSection
          isInit={familyDiariesInfo.isInit}
          diaries={familyDiariesInfo.diaries}
          onScrollReachBottom={handleLoadMore}
        />
      </FullWidthOverflowScrollWrapper>
    </PageLayout>
  );
};

export default withAuthCSR(ProfilePage);
