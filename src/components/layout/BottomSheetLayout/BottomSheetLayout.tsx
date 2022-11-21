import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';

import BottomSheetBaseDesign from './BottomSheetBaseDesign';
import BottomSheetBaseLayout, { BottomSheetBaseLayoutProps } from './BottomSheetBaseLayout';
import BottomSheetBaseOverlay from './BottomSheetBaseOverlay';

interface BottomSheetLayoutProps extends Omit<BottomSheetBaseLayoutProps, 'children'> {
  isOpen: boolean;
  sheetHeight: number;
  children: React.ReactNode;
  onClose?: () => void;
}

const BottomSheetLayout: FC<BottomSheetLayoutProps> = ({
  isOpen,
  sheetHeight,
  children,
  onClose,
}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <BottomSheetBaseLayout>
          <BottomSheetBaseOverlay onClose={onClose} />
          <BottomSheetBaseDesign sheetHeight={sheetHeight}>{children}</BottomSheetBaseDesign>
        </BottomSheetBaseLayout>
      )}
    </AnimatePresence>
  );
};

export default BottomSheetLayout;
