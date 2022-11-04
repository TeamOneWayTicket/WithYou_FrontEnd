import { PageSEO } from '@src/components/analytics/SEO';
import { withAuthCSR, withAuthSSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import { CustomDatePicker } from '@src/components/ui/atom';
import { InfiniteSlider } from '@src/components/ui/molecule';
import siteMetadata from '@src/core/config/siteMetadata';
import { useState } from 'react';

export const getServerSideProps = withAuthSSR();

const ReviewPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  // Todo: Add infinite slider data
  // fetch new data day by day
  // and show it in the slider

  return (
    <PageLayout fixedHeight showNavigation>
      <PageSEO title={siteMetadata.title + ' - Review'} description={'육아 되돌아보기'} />
      <div className="text-center h-full">
        <CustomDatePicker
          onChange={(date) => {
            setStartDate(date);
          }}
        />
        <InfiniteSlider enableDot />
      </div>
    </PageLayout>
  );
};

export default withAuthCSR(ReviewPage);
