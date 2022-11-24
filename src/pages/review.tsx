import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import { CustomDatePicker } from '@src/components/ui/atom';
import { InfiniteSlider } from '@src/components/ui/molecule';
import ReviewInfiniteSliderItem from '@src/components/ui/molecule/Slider/contents/ReviewInfiniteSliderItem';
import { apiGetFamilyRecommandDiariesByDate } from '@src/core/api/diary/apiDiaryRecommend';
import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import siteMetadata from '@src/core/config/siteMetadata';
import { useShareAPI } from '@src/hooks/navigation';
import { parseDateHHMMDD } from '@src/utils/dateUtil';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface ReviewPageProps {
  initialDate: string | null;
  initialDiaries: ApiCommonDiaryProps[];
}

export const getServerSideProps = withAuthSSR(async (ctx) => {
  const { date } = ctx.query;

  if (date) {
    const { diaries } = await apiGetFamilyRecommandDiariesByDate(date as string);
    return {
      props: {
        initialDate: date as string,
        initialDiaries: diaries,
      },
    };
  } else {
    const todayDate = parseDateHHMMDD(new Date());
    const { diaries } = await apiGetFamilyRecommandDiariesByDate(todayDate);
    return {
      props: {
        initialDate: todayDate,
        initialDiaries: diaries,
      },
    };
  }
});

const ReviewPage: NextPage<ReviewPageProps> = ({ initialDate, initialDiaries }) => {
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState(initialDate ? new Date(initialDate) : new Date());
  const [familyDiaries, setFamilyDiaries] = useState<ApiCommonDiaryProps[]>([]);

  const [isShareSupported, shareCB, withyouShareCB] = useShareAPI();

  useEffect(() => {
    setMounted(true);
    setFamilyDiaries(initialDiaries);
  }, [initialDiaries]);

  useEffect(() => {
    if (mounted) {
      (async () => {
        const { diaries } = await apiGetFamilyRecommandDiariesByDate(parseDateHHMMDD(startDate));
        setFamilyDiaries(diaries);
      })();
    }
  }, [mounted, startDate]);

  return (
    <PageLayout fixedHeight showNavigation>
      <PageSEO title={siteMetadata.title + ' - Review'} description={'육아 되돌아보기'} />
      <div className="text-center h-full">
        <CustomDatePicker
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <InfiniteSlider enableDot>
          {mounted ? (
            familyDiaries.length > 0 ? (
              familyDiaries.map((diary, idx) => (
                <ReviewInfiniteSliderItem
                  key={`review-diary-${idx}}`}
                  diary={diary}
                  onShareClick={withyouShareCB}
                />
              ))
            ) : (
              <div className="text-center w-full h-full flex justify-center items-center">
                일기가 없습니다.
              </div>
            )
          ) : initialDiaries.length > 0 ? (
            initialDiaries.map((diary, idx) => (
              <ReviewInfiniteSliderItem
                key={`review-diary-${idx}}`}
                diary={diary}
                onShareClick={withyouShareCB}
              />
            ))
          ) : (
            <div className="text-center w-full h-full flex justify-center items-center">
              일기가 없습니다.
            </div>
          )}
        </InfiniteSlider>
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(ReviewPage);
