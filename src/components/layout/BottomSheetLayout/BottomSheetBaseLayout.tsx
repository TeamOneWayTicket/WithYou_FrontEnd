import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

export interface BottomSheetBaseLayoutProps {
  children: React.ReactNode;
}

const BottomSheetBaseLayout: FC<BottomSheetBaseLayoutProps> = ({ children }) => {
  return (
    <motion.div
      className={cx(
        'z-[1000] w-full h-full',
        'absolute top-0 left-0',
        'flex justify-center items-end'
      )}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default BottomSheetBaseLayout;
