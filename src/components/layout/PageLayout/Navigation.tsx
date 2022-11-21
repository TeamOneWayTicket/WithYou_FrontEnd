import { IconButton } from '@src/components/ui/atom';
import { SVGTypes } from '@src/components/ui/atom/Icon/Icon';
import { navRouter } from '@src/core/config/navRouter';
import cx from 'classnames';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const Navigation: FC<{
  transparent?: boolean;
  className?: string;
}> = ({ className, transparent = false }) => {
  const { pathname } = useRouter();

  return (
    <div className="z-10 relative">
      <motion.div
        className={cx(
          'w-full max-w-mobile-app h-bt-nav bottom-0',
          'fixed flex justify-evenly items-center',
          'px-side-padding py-2',
          transparent ? 'bg-transparent' : 'bg-primary-bg',
          className
        )}
      >
        {navRouter.map((info, index) => {
          return (
            <Link href={info.path} key={`nav-router-${index}`}>
              <div
                key={`bottom-sheet-${index}`}
                className="flex flex-col justify-center items-center text-center h-full"
              >
                <IconButton
                  name={
                    pathname === info.path ? ((info.icon + '-selected') as SVGTypes) : info.icon
                  }
                  size={28}
                  onClick={() => {}}
                />
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Navigation;
