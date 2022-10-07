import { motion } from 'framer-motion';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

type Props = {
  children: React.ReactNode;
  selected: boolean;
};

const InfiniteSliderItemWrapper: ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { children, selected },
  ref
) => {
  return (
    <motion.div
      ref={ref}
      className="relative h-[520px] min-w-full"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: selected ? 1 : 0.9,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default forwardRef(InfiniteSliderItemWrapper);
