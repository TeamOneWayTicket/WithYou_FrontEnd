import { Icon, ImageWrapper } from '@src/components/ui/atom';
import { IDiaryMediaProps } from '@src/core/api/types/api-diary-interface';
import React, { Fragment, FunctionComponent } from 'react';

interface ICommonPostCardWrapperProps {
  media: IDiaryMediaProps[];
}

const DiaryImageLessThanThree: FunctionComponent<ICommonPostCardWrapperProps> = ({ media }) => (
  <Fragment>
    {media.map((el, index) => (
      <div
        key={`post-image-${index}`}
        className="relative flex flex-shrink flex-nowrap w-full h-full"
      >
        <ImageWrapper src={el.fileNameInS3} className="" layout="fill" objectFit="cover" />
      </div>
    ))}
  </Fragment>
);

const DiaryImageMoreThanThree: FunctionComponent<ICommonPostCardWrapperProps> = ({ media }) => (
  <Fragment>
    <div className="relative flex flex-shrink basis-3/5 mr-1">
      <ImageWrapper src={media[0].fileNameInS3} className="" layout="fill" objectFit="cover" />
    </div>
    <div className="relative flex flex-col flex-shrink basis-2/5 space-y-1">
      <div className="relative flex basis-1/2">
        <ImageWrapper src={media[1].fileNameInS3} className="" layout="fill" objectFit="cover" />
      </div>
      <div className="relative flex basis-1/2">
        <ImageWrapper
          src={media[2].fileNameInS3}
          className=""
          layout="fill"
          objectFit="cover"
          {...(media.length > 3 && {
            bgFilter: 'bg-black/50',
          })}
        />
        {media.length > 3 && (
          <div className="absolute translate-center-xy text-white z-10 flex items-center text-2xl">
            <Icon name="plus" />
            <span>{media.length - 3}</span>
          </div>
        )}
      </div>
    </div>
  </Fragment>
);

const DiaryImageWrapper: FunctionComponent<ICommonPostCardWrapperProps> = ({ media }) => {
  return (
    <div className="relative flex w-full h-[240px] pointer-events-none rounded-xl overflow-hidden">
      {media.length <= 2 ? (
        <DiaryImageLessThanThree media={media} />
      ) : (
        <DiaryImageMoreThanThree media={media} />
      )}
    </div>
  );
};

export default DiaryImageWrapper;
