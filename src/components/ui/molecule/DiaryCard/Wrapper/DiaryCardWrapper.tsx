import { ApiCommonDiaryProps } from '@src/core/api/types/api-diary-interface';
import cx from 'classnames';
import React, { FC } from 'react';

export type CommonPostCardWrapperProps = {
  hideCommentCount?: boolean;
  diaryInfo: ApiCommonDiaryProps;
  children: React.ReactNode;
};

const DiaryCardWrapper: FC<Pick<CommonPostCardWrapperProps, 'children'>> = ({ children }) => {
  return (
    <div className={cx('space-y-2 bg-primary-bg px-side-padding py-4 cursor-pointer')}>
      {children}
    </div>
  );
};

export default DiaryCardWrapper;
