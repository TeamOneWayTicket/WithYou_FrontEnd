import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import AlbumCommonHeader from '@src/components/template/AlbumPage/AlbumCommonHeader';
import { apiGetFamilyPhotos } from '@src/core/api/apiAlbum';
import siteMetadata from '@src/core/config/siteMetadata';
import { getRandomImageRadio } from '@src/utils/imageUtil';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Gallery from 'react-photo-gallery';

interface IinitialPhoto {
  src: string;
  width: number;
  height: number;
}

interface AlbumPageProps {
  initialPhotos: IinitialPhoto[];
}

export const getServerSideProps = withAuthSSR(async () => {
  const photoInfos = await apiGetFamilyPhotos();

  const ret = photoInfos.media.map((photoInfo) => {
    const rand = getRandomImageRadio();
    return {
      src: photoInfo.url,
      ...rand,
    };
  });

  return {
    props: {
      initialPhotos: ret,
    },
  };
});

const AlbumPage: NextPage<AlbumPageProps> = ({ initialPhotos }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <PageLayout showNavigation fixedHeight headerContent={<AlbumCommonHeader />}>
      <PageSEO title={siteMetadata.title + ' Album Page'} description={'album page'} />
      <div className="w-full h-full overflow-scroll py-5">
        {mounted && initialPhotos.length > 0 && <Gallery photos={initialPhotos} />}
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(AlbumPage);
