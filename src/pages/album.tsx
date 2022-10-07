import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import AlbumCommonHeader from '@src/components/template/AlbumPage/AlbumCommonHeader';
import siteMetadata from '@src/core/config/siteMetadata';
import { photoGalleryData } from '@src/core/data/photo-gallery-data';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Gallery from 'react-photo-gallery';

export const getServerSideProps = withAuthSSR();

const AlbumPage: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  //  need to add custom Photo Component to Gallery Component
  return (
    <PageLayout showNavigation fixedHeight headerContent={<AlbumCommonHeader />}>
      <PageSEO title={siteMetadata.title + ' Album Page'} description={'album page'} />
      <div className="w-full h-full overflow-scroll py-5">
        {mounted && <Gallery photos={photoGalleryData} />}
      </div>
    </PageLayout>
  );
};

export default AlbumPage;
