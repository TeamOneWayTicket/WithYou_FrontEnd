import { ImageWrapper } from '@src/components/ui/atom';
import { IDiaryMediaProps } from '@src/core/api/types/api-diary-interface';
import { FunctionComponent, useCallback, useState } from 'react';

interface Props {
  media: IDiaryMediaProps;
}

const DetailDiaryInfiniteSliderItem: FunctionComponent<Props> = ({ media }) => {
  return (
    <div className="relative w-full h-full">
      <ImageWrapper
        className="rounded-xl select-none pointer-events-none"
        src={media.fileNameInS3}
        alt="diary"
        objectFit="contain"
        layout="fill"
      />
    </div>
  );
};

export default DetailDiaryInfiniteSliderItem;
