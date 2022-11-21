import { Variants } from 'framer-motion';

const sheetTransition = {
  type: 'spring',
  damping: 70,
  mass: 1,
  stiffness: 500,
};

export const sheetVariants: Variants = {
  enter: (height: number) => {
    return {
      y: '100%',
      height: height,
      speed: 10,
    };
  },
  center: {
    y: '0%',
    transition: sheetTransition,
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: sheetTransition,
  },
};

export const sheetOverlayVariants: Variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
