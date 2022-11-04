import { Variants } from 'framer-motion';

export const FloatingButtonVariant: Variants = {
  enter: { translateY: 0, translateX: 0 },
  center: (delay) => {
    return { translateY: -10 * delay, translateX: 0, transition: { duration: delay * 0.1 } };
  },
  exit: (delay) => {
    return {
      translateY: 0,
      translateX: 0,
      opacity: 0,
      transition: { duration: (10 - delay) * 0.05 },
    };
  },
};
