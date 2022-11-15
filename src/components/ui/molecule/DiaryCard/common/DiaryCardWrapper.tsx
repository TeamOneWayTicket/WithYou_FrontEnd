import React, { FC } from 'react';

const DiaryCardWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className={'space-y-2 bg-primary-bg px-side-padding py-4 cursor-pointer'}>{children}</div>
  );
};

export default DiaryCardWrapper;
