import { addPosts } from '@src/atom/posts';
import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import HomeMainSection from '@src/components/template/HomePage/HomeMainSection';
import MainPostsSection from '@src/components/template/HomePage/MainPostsSection';
import { FloatingButton, FullWidthOverflowScrollWrapper } from '@src/components/ui/atom';
import siteMetadata from '@src/core/config/siteMetadata';
import React from 'react';
import { useRecoilState } from 'recoil';

export const getServerSideProps = withAuthSSR();

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(addPosts);

  return (
    <PageLayout showNavigation fullWidth fixedHeight className="bg-gray-50">
      <PageSEO
        title={siteMetadata.title + ' 메인 페이지'}
        description={'유아 로그를 시작해보세요'}
      />
      <FullWidthOverflowScrollWrapper>
        {posts.posts.length > 0 ? <MainPostsSection posts={posts.posts} /> : <HomeMainSection />}
      </FullWidthOverflowScrollWrapper>
      <FloatingButton />
    </PageLayout>
  );
};

export default withAuthCSR(HomePage);
