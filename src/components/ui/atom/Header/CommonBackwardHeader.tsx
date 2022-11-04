import { IconButton } from '@src/components/ui/atom';
import React, { FC, memo } from 'react';

const PostsCommonHeader: FC<{
  title?: string;

  children?: React.ReactNode;

  onBack: () => void;
}> = ({ title, children, onBack }) => {
  return (
    <div className="relative w-full flex justify-between items-center">
      <IconButton className="text-gray-400" name={'leftArrow'} size={20} onClick={onBack} />
      {title && <p className="text-black">{title}</p>}
      <div className="w-4" />
      {children}
    </div>
  );
};

export default memo(PostsCommonHeader);
