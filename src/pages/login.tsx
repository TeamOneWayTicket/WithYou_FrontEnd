import { PageSEO } from '@src/components/analytics/SEO';
import { withShouldNoAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import { ImageWrapper } from '@src/components/ui/atom';
import { SignInForm } from '@src/components/ui/molecule';
import siteMetadata from '@src/core/config/siteMetadata';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = withShouldNoAuthSSR();

const LoginPage: NextPage = () => {
  const router = useRouter();

  return (
    <PageLayout fullWidth fixedHeight headerTransparent headerContent={<></>}>
      <PageSEO title={siteMetadata.title + ' Login Page'} description={'login page'} />
      <div className="w-full h-full flex flex-col justify-between pt-28 px-side-padding">
        <div className="text-left">
          <h1 className="font-PyeongChangPeace-Bold text-wy-blue-500">{siteMetadata.title}</h1>
          <h2>
            <div>함께 만드는</div>
            <div>우리 아이 추억</div>
          </h2>
        </div>
        <SignInForm router={router} />
      </div>
      <div className="absolute -z-10 top-0 left-0 w-full h-full">
        <ImageWrapper src="/static/login_bg.png" layout="fill" priority />
      </div>
    </PageLayout>
  );
};

export default LoginPage;
