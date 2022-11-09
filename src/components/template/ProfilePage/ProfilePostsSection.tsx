import { ImageWrapper, IntersectWrapper } from '@src/components/ui/atom';
import DiariesSectionWrapper from '@src/components/ui/molecule/DiariesSectionWrapper';
import ProfilePostCard from '@src/components/ui/molecule/PostCard/ProfilePostCard';
import { ApiCommonDiaryProps } from '@src/core/api/interface/api-diary-interface';
import React, { Fragment, FunctionComponent } from 'react';

const ProfilePostsSection: FunctionComponent<{
  diaries: ApiCommonDiaryProps[];
  onScrollReachBottom: () => void;
}> = ({ diaries, onScrollReachBottom }) => {
  return (
    <Fragment>
      {diaries.length > 0 ? (
        <div className="bg-gray-50">
          <DiariesSectionWrapper>
            {diaries.map((diary, index) => {
              return (
                <Fragment key={`profile-post-${index}`}>
                  <ProfilePostCard postInfo={diary} />
                </Fragment>
              );
            })}
            <IntersectWrapper keepObserve onIntersect={onScrollReachBottom} />
          </DiariesSectionWrapper>
        </div>
      ) : (
        <div className="w-full h-[calc(100%-24rem)] space-y-2 flex flex-col justify-center items-center text-center">
          <div className="relative w-40 md:w-32">
            <div className="relative w-full">
              <ImageWrapper
                src="/static/mandu_surprise.png"
                layout="responsive"
                width="360px"
                height="300px"
                alt="notebook"
                priority
              />
              <h2 className="absolute w-full -bottom-16">
                <span className="text-gray-400 text-base break-all">아직 작성한 로그가 없어요</span>
              </h2>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProfilePostsSection;
