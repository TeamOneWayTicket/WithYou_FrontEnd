import { addMyDiary } from '@src/atom/myDiary';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import HomeMainSection from '@src/components/template/HomePage/HomeMainSection';
import MainPostsSection from '@src/components/template/HomePage/MainDiariesSection';
import { FloatingButton, FullWidthOverflowScrollWrapper } from '@src/components/ui/atom';
import { apiGetFamilyDiariesInfinite } from '@src/core/api/apiDiary';
import { ApiGetDiariesInfinite } from '@src/core/api/types/api-diary-interface';
import siteMetadata from '@src/core/config/siteMetadata';
import { NextPage } from 'next';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';

interface HomePageProps {
  initialDiaryInfo: ApiGetDiariesInfinite;
}

export const getServerSideProps = withAuthSSR(async () => {
  const diaryInfo = await apiGetFamilyDiariesInfinite({
    nextId: null,
    take: 5,
  });
  return {
    props: {
      initialDiaryInfo: diaryInfo,
    },
  };
});

const HomePage: NextPage<HomePageProps> = ({ initialDiaryInfo }) => {
  const [diariesInfo, setMyDiariesInfo] = useRecoilState(addMyDiary);
  const isLast = useRef(initialDiaryInfo.isLast);
  const nextId = useRef(initialDiaryInfo.nextId);

  useEffect(() => {
    if (!diariesInfo.isInit) {
      setMyDiariesInfo({
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
    const nextDiaryRes = await apiGetFamilyDiariesInfinite({
      nextId: nextId.current,
      take: 5,
    });
    setMyDiariesInfo({
      isInit: true,
      isLast: nextDiaryRes.isLast,
      nextId: nextDiaryRes.nextId,
      diaries: nextDiaryRes.diaries,
    });
    isLast.current = nextDiaryRes.isLast;
    nextId.current = nextDiaryRes.nextId;
  }, [setMyDiariesInfo]);

  return (
    <PageLayout showNavigation fullWidth fixedHeight className="bg-gray-50">
      <PageSEO
        title={siteMetadata.title + ' 메인 페이지'}
        description={'유아 로그를 시작해보세요'}
      />
      <FullWidthOverflowScrollWrapper>
        {diariesInfo.isInit && diariesInfo.diaries.length > 0 ? (
          <MainPostsSection diaries={diariesInfo.diaries} onScrollReachBottom={handleLoadMore} />
        ) : (
          <HomeMainSection />
        )}
      </FullWidthOverflowScrollWrapper>
      <FloatingButton />
    </PageLayout>
  );
};

export default withAuthCSR(HomePage);
