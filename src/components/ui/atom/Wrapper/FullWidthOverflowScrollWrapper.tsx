import React, { FC } from 'react';

const FullWidthOverflowScrollWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative w-full h-full overflow-y-scroll overflow-x-hidden">{children}</div>
  );
};

export default FullWidthOverflowScrollWrapper;
