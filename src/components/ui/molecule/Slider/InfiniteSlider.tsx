import { swipePower } from '@src/utils/framerUtil';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Children, Fragment, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';

import InfiniteSliderItemWrapper from './InfiniteSliderItemWrapper';

const InfiniteSlider: FunctionComponent<{
  enableInfinite?: boolean;
  enableDot?: boolean;
  children: React.ReactNode;
}> = ({ enableInfinite, enableDot, children }) => {
  const controls = useAnimation();
  const sliderItemnRefs = useRef<HTMLDivElement[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);

  const swipeConfidenceThreshold = useMemo(() => 10000, []);
  const numOfItems = useMemo(() => Children.count(children), [children]);

  const paginate = (newDirection: number) => {
    let nextPageIndex: number;
    let nextPage = selectedPage + newDirection;
    if (enableInfinite) {
      nextPage %= numOfItems;
      nextPageIndex = nextPage < 0 ? numOfItems - 1 : nextPage;
    } else {
      nextPage = nextPage > numOfItems - 1 ? numOfItems - 1 : nextPage;
      nextPageIndex = nextPage < 0 ? 0 : nextPage;
    }
    setSelectedPage(nextPageIndex);
  };

  useEffect(() => {
    controls.start('next');
  }, [controls, selectedPage]);

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Fragment>
        <motion.div className="h-full cursor-grab select-none overflow-visible flex justify-center">
          <motion.div
            variants={{
              next: {
                x: -sliderItemnRefs.current[0]?.offsetWidth * selectedPage,
              },
            }}
            transition={{ duration: 0.5, stiffness: 100 }}
            animate={controls}
            drag="x"
            dragConstraints={{
              left: -sliderItemnRefs.current[0]?.offsetWidth * selectedPage,
              right: -sliderItemnRefs.current[0]?.offsetWidth * selectedPage,
            }}
            dragElastic={0.5}
            dragMomentum={false}
            onDragEnd={(event, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="flex w-5/6 h-full"
          >
            {numOfItems > 0 &&
              Children.map(children, (child, idx) => {
                return (
                  <InfiniteSliderItemWrapper
                    key={`infinite-slider-wrapper-${idx}`}
                    ref={(el) => {
                      sliderItemnRefs.current[idx] = el;
                    }}
                    selected={selectedPage === idx}
                  >
                    {child}
                  </InfiniteSliderItemWrapper>
                );
              })}
          </motion.div>
        </motion.div>
        {enableDot && (
          <div className="flex justify-center space-x-2 pt-2">
            {Array(numOfItems)
              .fill(0)
              .map((_, idx) => {
                return (
                  <div
                    key={`infinite-dot-${idx}`}
                    className={`w-2 h-2 rounded-full ${
                      selectedPage === idx ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                );
              })}
          </div>
        )}
      </Fragment>
    </AnimatePresence>
  );
};

export default InfiniteSlider;
