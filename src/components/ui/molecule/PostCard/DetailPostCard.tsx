import { ImageWrapper } from '@src/components/ui/atom';
import MainPostCardWrapper from '@src/components/ui/molecule/PostCard/Wrapper/MainPostCardWrapper';
import { ApiCreateDiary } from '@src/core/api/interface/api-diary-interface';
import React, { FunctionComponent } from 'react';

const DetailPostCard: FunctionComponent<{
  postInfo: ApiCreateDiary;
}> = ({ postInfo }) => {
  const {
    diary: { content, media },
  } = postInfo;
  return (
    <MainPostCardWrapper postInfo={postInfo}>
      <div className="w-full">
        <p className="hide-text-overflow">{content}</p>
      </div>
      {media &&
        media.map((mediaInfo, index) => {
          return (
            <div key={`detail-post-image-${index}`} className="relative w-full h-48">
              <ImageWrapper
                src={mediaInfo.fileNameInS3}
                className="rounded-xl pointer-events-none"
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
    </MainPostCardWrapper>
  );
};

export default DetailPostCard;
