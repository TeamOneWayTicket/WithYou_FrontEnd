import React, { FC } from 'react';

const DiariesSectionWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="flex flex-col w-full h-auto overflow-scroll space-y-8">{children}</div>;
};

export default DiariesSectionWrapper;
