import { sheetOverlayVariants } from '@src/animations/sheet';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

const BottomSheetBaseOverlay: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-black/30"
      variants={sheetOverlayVariants}
      onClick={onClose}
    />
  );
};

export default BottomSheetBaseOverlay;
