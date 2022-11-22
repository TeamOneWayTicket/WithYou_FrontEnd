import { addFamilyDiaries } from '@src/atom/familyDiary';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import BottomSheetLayout from '@src/components/layout/BottomSheetLayout/BottomSheetLayout';
import ProfilePageTemplate from '@src/components/template/ProfilePage/ProfilePageTemplate';
import { Button, IconButton } from '@src/components/ui/atom';
import { apiGetMyDiariesInfinite } from '@src/core/api/diary/apiDiary';
import { ApiGetDiariesInfinite } from '@src/core/api/types/api-diary-interface';
import siteMetadata from '@src/core/config/siteMetadata';
import { CommonUserAuthInfoType } from '@src/core/types/auth-type';
import useLogout from '@src/hooks/auth/useLogout';
import { toBeImplement } from '@src/utils/implUtil';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

export interface ProfilePageProps {
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
  const [diariesInfo, setDiariesInfo] = useRecoilState(addFamilyDiaries);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [handleLogout] = useLogout();

  const isLast = useRef(initialDiaryInfo.isLast);
  const nextId = useRef(initialDiaryInfo.nextId);

  const handleBottomSheetClose = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const handleOnOptionClick = useCallback(() => {
    setIsBottomSheetOpen(true);
  }, []);

  useEffect(() => {
    if (!diariesInfo.isInit) {
      setDiariesInfo({
        isInit: true,
        isLast: initialDiaryInfo.isLast,
        nextId: initialDiaryInfo.nextId,
        diaries: initialDiaryInfo.diaries,
      });
    } else {
      isLast.current = diariesInfo.isLast;
      nextId.current = diariesInfo.nextId;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLast.current) return;

    const nextDiaryRes = await apiGetMyDiariesInfinite({
      nextId: nextId.current,
      take: 5,
    });
    setDiariesInfo({
      isInit: true,
      isLast: nextDiaryRes.isLast,
      nextId: nextDiaryRes.nextId,
      diaries: nextDiaryRes.diaries,
    });
    isLast.current = nextDiaryRes.isLast;
    nextId.current = nextDiaryRes.nextId;
  }, [setDiariesInfo]);

  return (
    <PageLayout
      showNavigation
      fullWidth
      fixedHeight
      headerContent={
        <div className="w-full flex justify-between items-center">
          <p className="font-bold">내 프로필</p>
          <IconButton name="setting" size={20} onClick={handleOnOptionClick} />
        </div>
      }
    >
      <PageSEO title={siteMetadata.title + ' Profile'} description={'profile page'} />
      {diariesInfo.isInit ? (
        <ProfilePageTemplate
          user={user}
          diaries={diariesInfo.diaries}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <ProfilePageTemplate
          user={user}
          diaries={initialDiaryInfo.diaries}
          handleLoadMore={handleLoadMore}
        />
      )}
      <BottomSheetLayout
        sheetHeight={144}
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
      >
        <div className="w-full h-20">
          <Button fullWidth styles="transparent" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button fullWidth styles="transparent" onClick={toBeImplement}>
            탈퇴하기
          </Button>
          <Button fullWidth styles="transparent" onClick={handleBottomSheetClose}>
            취소
          </Button>
        </div>
      </BottomSheetLayout>
    </PageLayout>
  );
};

export default withAuthCSR(ProfilePage);
