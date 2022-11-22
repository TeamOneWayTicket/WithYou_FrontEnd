import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import AlbumCommonHeader from '@src/components/template/AlbumPage/AlbumCommonHeader';
import AlbumContentTemplate from '@src/components/template/AlbumPage/AlbumContentTemplate';
import { ApiFamilyPhotosResponse, apiGetFamilyPhotos } from '@src/core/api/apiAlbum';
import siteMetadata from '@src/core/config/siteMetadata';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

interface AlbumPageProps {
  initialPhotos: ApiFamilyPhotosResponse;
}

export const getServerSideProps = withAuthSSR(async () => {
  const photoInfos = await apiGetFamilyPhotos();

  return {
    props: {
      initialPhotos: photoInfos,
    },
  };
});

const AlbumPage: NextPage<AlbumPageProps> = ({ initialPhotos }) => {
  const [mounted, setMounted] = useState(false);
  const [photos, setPhotos] = useState(initialPhotos);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <PageLayout showNavigation fixedHeight headerContent={<AlbumCommonHeader />}>
      <PageSEO title={siteMetadata.title + ' Album Page'} description={'album page'} />
      <div className="w-full h-full overflow-scroll py-5 flex flex-wrap">
        {mounted ? (
          <AlbumContentTemplate media={photos.media} />
        ) : (
          <AlbumContentTemplate media={initialPhotos.media} />
        )}
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(AlbumPage);
