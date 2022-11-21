import { sheetVariants } from '@src/animations/sheet';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const BottomSheetBaseDesign: FC<{
  sheetHeight: number;
  children: React.ReactNode;
}> = ({ sheetHeight, children }) => {
  return (
    <motion.div
      className={cx(
        'relative z-50 flex items-center max-w-mobile-app',
        'bg-white',
        'rounded-t-2xl',
        'w-full'
      )}
      custom={sheetHeight}
      variants={sheetVariants}
    >
      <div className="w-full h-full">{children}</div>
    </motion.div>
  );
};

export default BottomSheetBaseDesign;
