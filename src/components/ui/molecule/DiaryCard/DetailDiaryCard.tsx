import { ImageWrapper } from '@src/components/ui/atom';
import MainPostCardWrapper from '@src/components/ui/molecule/DiaryCard/Wrapper/MainDiaryCardWrapper';
import { ApiCreateDiary } from '@src/core/api/types/api-diary-interface';
import React, { FunctionComponent } from 'react';

const DetailDiaryCard: FunctionComponent<{
  diaryInfo: ApiCreateDiary;
}> = ({ diaryInfo }) => {
  const {
    diary: { content, media },
  } = diaryInfo;
  return (
    <MainPostCardWrapper hideCommentCount diaryInfo={diaryInfo}>
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

export default DetailDiaryCard;
