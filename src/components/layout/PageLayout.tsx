import Navigation from '@src/components/layout/PageLayout/Navigation';
import CommonHeader from '@src/components/ui/atom/Header/CommonHeader';
import useWindowResize from '@src/hooks/useWindowResize';
import cx from 'classnames';
import React, { FC, useRef } from 'react';

import HeaderWrapper from './PageLayout/HeaderWrapper';

const PageLayout: FC<{
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  fixedHeight?: boolean;
  headerFixed?: boolean;
  headerTransparent?: boolean;
  headerBackgroundColor?: string;
  headerContent?: React.ReactNode;
  overflowVisible?: boolean;
  showNavigation?: boolean;
}> = ({
  children,
  className,
  fullWidth = false,
  fixedHeight = false,
  headerFixed = false,
  headerTransparent = false,
  headerBackgroundColor,
  headerContent = <CommonHeader />,
  overflowVisible = false,
  showNavigation = false,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  // to recalculate height when mobile browser search bar appeared and disappeared
  useWindowResize(() => {
    if (fixedHeight) {
      mainRef.current.style.setProperty('height', `${window.innerHeight}px`);
      document.body.style.overflow = 'hidden';
    } else {
      mainRef.current.style.setProperty('height', 'h-full');
      document.body.style.overflow = 'auto';
    }
  }, 0);

  // do not remove pt-gb-header pb-bt-nav on motion.main
  // it is for showing content on the top of bottom nav
  // it should be pb-0 on desktop size because bottom nav will not be shown
  return (
    <div
      className={cx(
        'relative w-full max-w-mobile-app m-center',
        overflowVisible ? 'overflow-visible' : 'overflow-hidden'
      )}
    >
      <HeaderWrapper
        fixed={headerFixed}
        transparent={headerTransparent}
        className={headerBackgroundColor}
      >
        {headerContent}
      </HeaderWrapper>
      <main
        ref={mainRef}
        className={cx(
          className,
          'relative m-center w-full pt-gb-header pb-bt-nav',
          fullWidth ? null : `max-w-mobile-app px-side-padding`,
          fixedHeight ? 'overflow-hidden h-screen' : 'min-h-screen'
        )}
      >
        {children}
      </main>
      {showNavigation && <Navigation />}
    </div>
  );
};

export default PageLayout;
