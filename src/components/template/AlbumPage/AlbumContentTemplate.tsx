import { ImageWrapper } from '@src/components/ui/atom';
import { IFamilyPhoto } from '@src/core/api/apiAlbum';
import cx from 'classnames';
import Link from 'next/link';
import React, { Fragment, FunctionComponent } from 'react';

interface Props {
  media: IFamilyPhoto[];
}

const AlbumContentTemplate: FunctionComponent<Props> = ({ media }) => {
  return (
    <Fragment>
      {media.length > 0 &&
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
    </Fragment>
  );
};

export default AlbumContentTemplate;
