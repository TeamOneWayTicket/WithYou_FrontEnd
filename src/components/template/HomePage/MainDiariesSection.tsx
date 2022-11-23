import { IntersectWrapper } from '@src/components/ui/atom';
import { MainDiaryCard, ReviewCard } from '@src/components/ui/molecule';
import DiariesSectionWrapper from '@src/components/ui/molecule/DiariesSectionWrapper';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import { useShareAPI } from '@src/hooks/navigation';
import React, { Fragment, FunctionComponent } from 'react';

import HomeDiaryEmptySection from './HomeDiaryEmptySection';

interface MainPostsSectionProps {
  diaries: ApiCommonDiaryProps[];
  onScrollReachBottom: () => void;
}

const MainDiariesSection: FunctionComponent<MainPostsSectionProps> = ({
  diaries,
  onScrollReachBottom,
}) => {
  const [isShareSupported, shareCB, withyouShareCB] = useShareAPI();

  return (
    <Fragment>
      {diaries.length > 0 ? (
        <Fragment>
          <DiariesSectionWrapper>
            {diaries.slice(0).map((diary, index) => {
              return (
                <Fragment key={`main-post-${index}`}>
                  {index !== 0 && index % 7 === 0 && <ReviewCard />}
                  <MainDiaryCard diaryInfo={diary} onShareClick={withyouShareCB} />
                </Fragment>
              );
            })}
            <IntersectWrapper keepObserve onIntersect={onScrollReachBottom} />
          </DiariesSectionWrapper>
        </Fragment>
      ) : (
        <HomeDiaryEmptySection />
      )}
    </Fragment>
  );
};

export default MainDiariesSection;
