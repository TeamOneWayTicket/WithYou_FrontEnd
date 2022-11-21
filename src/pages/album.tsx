import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import AlbumCommonHeader from '@src/components/template/AlbumPage/AlbumCommonHeader';
import { ImageWrapper } from '@src/components/ui/atom';
import { ApiFamilyPhotosResponse, apiGetFamilyPhotos } from '@src/core/api/apiAlbum';
import siteMetadata from '@src/core/config/siteMetadata';
import cx from 'classnames';
import { NextPage } from 'next';
import Link from 'next/link';
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

const AlbumPage: NextPage<AlbumPageProps> = ({ initialPhotos: { media } }) => {
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
      <div className="w-full h-full overflow-scroll py-5 flex flex-wrap">
        {mounted &&
          media.length > 0 &&
          media.map((photo, idx) => (
            <Link key={`album-photo-${idx}`} href={`/diary/${photo.diaryId}`}>
              <a
                className={cx(
                  'relative h-[200px]',
                  'basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5',
                  'border-[1px] border-solid border-gray-200/50'
                )}
              >
                <ImageWrapper src={photo.url} layout="fill" objectFit="cover" />
              </a>
            </Link>
          ))}
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(AlbumPage);
