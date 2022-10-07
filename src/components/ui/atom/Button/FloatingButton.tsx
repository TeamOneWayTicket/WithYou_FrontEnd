import { FloatingButtonVariant } from '@src/animations/button';
import { overLayVariants } from '@src/animations/common';
import { openPostCreateModal } from '@src/atom/modal';
import { IconButton } from '@src/components/ui/atom';
import cx from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { FunctionComponent, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import FloatingSmallButtonWrapper from './wrapper/FloatingSmallButtonWrapper';

export type FloatingButtonProps = {
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
};

const positionSelector: { [key in FloatingButtonProps['position']]: string } = {
  topLeft: 'top-[calc(0.5rem+theme(space.gb-header))] left-[calc(theme(space.side-padding))]',
  topRight: 'top-[calc(0.5rem+theme(space.gb-header))] right-[calc(theme(space.side-padding))]',
  bottomLeft: 'bottom-[calc(0.5rem+theme(space.bt-nav))] left-[calc(theme(space.side-padding))]',
  bottomRight: 'bottom-[calc(0.5rem+theme(space.bt-nav))] right-[calc(theme(space.side-padding))]',
};

const FloatingButton: FunctionComponent<FloatingButtonProps> = ({ position = 'bottomRight' }) => {
  const [active, setActive] = useState(false);
  const openPostCreateModalCB = useSetRecoilState(openPostCreateModal);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };

  const handlePostCreate = () => {
    setActive(false);
    openPostCreateModalCB({ fullScreen: true });
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute z-30 w-full h-full inset-0 bg-black/30"
            variants={overLayVariants}
            onClick={() => setActive(false)}
          />
        )}
      </AnimatePresence>
      <div className={cx('absolute z-40', positionSelector[position])}>
        <div>
          <IconButton
            className="w-16 h-16 rounded-full bg-wy-blue-500"
            name="star"
            size={32}
            onClick={handleToggle}
          />
        </div>
        <AnimatePresence exitBeforeEnter>
          {active && (
            <>
              <FloatingSmallButtonWrapper
                custom={0}
                iconName="plus"
                variants={FloatingButtonVariant}
                onClick={handlePostCreate}
              >
                글쓰기
              </FloatingSmallButtonWrapper>
              <Link href="/album">
                <FloatingSmallButtonWrapper
                  custom={4.5}
                  iconName="album-selected"
                  variants={FloatingButtonVariant}
                >
                  앨범
                </FloatingSmallButtonWrapper>
              </Link>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingButton;
