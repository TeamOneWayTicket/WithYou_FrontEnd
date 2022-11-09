import { addPosts } from '@src/atom/posts';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import HomeMainSection from '@src/components/template/HomePage/HomeMainSection';
import MainPostsSection from '@src/components/template/HomePage/MainPostsSection';
import { FloatingButton, FullWidthOverflowScrollWrapper } from '@src/components/ui/atom';
import { apiGetFamilyDiariesInfinite } from '@src/core/api/apiDiary';
import { ApiGetDiariesInfinite } from '@src/core/api/interface/api-diary-interface';
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
  const isInit = useRef(false);
  const nextId = useRef(initialDiaryInfo.nextId);
  const isLast = useRef(initialDiaryInfo.isLast);
  const [posts, setPosts] = useRecoilState(addPosts);

  useEffect(() => {
    if (!isInit.current && posts.posts.length === 0) {
      setPosts({
        posts: initialDiaryInfo.diaries,
      });
      isInit.current = true;
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLast.current) return;
    const diaryInfo = await apiGetFamilyDiariesInfinite({
      nextId: nextId.current,
      take: 5,
    });
    nextId.current = diaryInfo.nextId;
    isLast.current = diaryInfo.isLast;
    setPosts({
      posts: diaryInfo.diaries,
    });
  }, [setPosts]);

  return (
    <PageLayout showNavigation fullWidth fixedHeight className="bg-gray-50">
      <PageSEO
        title={siteMetadata.title + ' 메인 페이지'}
        description={'유아 로그를 시작해보세요'}
      />
      <FullWidthOverflowScrollWrapper>
        {posts.posts.length > 0 ? (
          <MainPostsSection posts={posts.posts} onScrollReachBottom={handleLoadMore} />
        ) : (
          <HomeMainSection />
        )}
      </FullWidthOverflowScrollWrapper>
      <FloatingButton />
    </PageLayout>
  );
};

export default withAuthCSR(HomePage);
