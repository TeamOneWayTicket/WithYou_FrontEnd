import cx from 'classnames';
import { motion, Variants } from 'framer-motion';
import React, { forwardRef, ForwardRefRenderFunction } from 'react';

import Icon, { SVGTypes } from '../../Icon/Icon';

interface Props {
  custom: number;
  variants: Variants;
  iconName: SVGTypes;
  children?: React.ReactNode;
  onClick?: () => void;
}

const FloatingSmallButtonWrapper: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { custom, variants, iconName, children, onClick },
  ref
) => (
  <motion.button
    ref={ref}
    custom={custom}
    variants={variants}
    className={cx(
      '-z-10 absolute top-[-70%] left-[-70%]',
      'flex items-center justify-center',
      'w-28 h-10',
      'rounded-xl border-2 border-solid border-gray-500',
      'bg-white text-gray-800'
    )}
    initial="enter"
    animate="center"
    exit="exit"
    onClick={onClick}
  >
    <Icon className="text-wy-blue-500" name={iconName} size={28} />
    <p className="px-2 select-none text-wy-blue-500 font-PyeongChangPeace-Bold">{children}</p>
  </motion.button>
);

export default forwardRef(FloatingSmallButtonWrapper);
