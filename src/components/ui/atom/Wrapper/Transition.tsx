import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';

const Transition: FC<{
  custom?: number;
  children: React.ReactNode;
}> = ({ custom, children }) => {
  return (
    <AnimatePresence custom={custom} initial={false}>
      {children}
    </AnimatePresence>
  );
};

export default Transition;
