import { modalFullScreenVariants, modalVariants } from '@src/animations/modal';
import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const ModalBaseDesign: FC<{
  fullScreen: boolean;
  children: React.ReactNode;
}> = ({ fullScreen, children }) => {
  return (
    <motion.div
      className={cx(
        'relative z-50 flex items-center max-w-mobile-app',
        fullScreen ? 'w-full h-full' : 'w-full h-auto py-8',
        'bg-primary-bg',
        'rounded-lg'
      )}
      variants={fullScreen ? modalFullScreenVariants : modalVariants}
    >
      <div className="w-full h-full px-side-padding">{children}</div>
    </motion.div>
  );
};

export default ModalBaseDesign;
