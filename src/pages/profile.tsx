import { addPosts } from '@src/atom/posts';
import { PageSEO } from '@src/components/analytics/SEO';
import { PageLayout } from '@src/components/layout';
import ProfileIntroSection from '@src/components/template/ProfilePage/ProfileIntroSection';
import ProfilePostsSection from '@src/components/template/ProfilePage/ProfilePostsSection';
import { FullWidthOverflowWrapper, IconButton } from '@src/components/ui/atom';
import siteMetadata from '@src/core/config/siteMetadata';
import { NextPage } from 'next';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ProfilePage: NextPage = () => {
  const { posts } = useRecoilValue(addPosts);

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
      <FullWidthOverflowWrapper>
        <ProfileIntroSection />
        <ProfilePostsSection posts={posts} />
      </FullWidthOverflowWrapper>
    </PageLayout>
  );
};

export default ProfilePage;
