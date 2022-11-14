import { IntersectWrapper } from '@src/components/ui/atom';
import { MainDiaryCard, ReviewCard } from '@src/components/ui/molecule';
import DiariesSectionWrapper from '@src/components/ui/molecule/DiariesSectionWrapper';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import React, { Fragment, FunctionComponent } from 'react';

interface MainPostsSectionProps {
  diaries: ApiCommonDiaryProps[];
  onScrollReachBottom: () => void;
}

const MainDiariesSection: FunctionComponent<MainPostsSectionProps> = ({
  diaries,
  onScrollReachBottom,
}) => {
  return (
    <Fragment>
      {diaries.length > 0 && (
        <Fragment>
          <DiariesSectionWrapper>
            {diaries.slice(0).map((diary, index) => {
              return (
                <Fragment key={`main-post-${index}`}>
                  {index !== 0 && index % 7 === 0 && <ReviewCard />}
                  <MainDiaryCard diaryInfo={diary} />
                </Fragment>
              );
            })}
            <IntersectWrapper keepObserve onIntersect={onScrollReachBottom} />
          </DiariesSectionWrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MainDiariesSection;
