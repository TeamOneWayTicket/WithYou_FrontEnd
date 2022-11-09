import React, { FC } from 'react';

const PostsSectionWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="flex flex-col w-full h-auto overflow-scroll space-y-8">{children}</div>;
};

export default PostsSectionWrapper;
