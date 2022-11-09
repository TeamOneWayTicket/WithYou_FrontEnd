import { ApiCommonDiaryProps } from '@src/core/api/interface/api-diary-interface';
import cx from 'classnames';
import React, { FC } from 'react';

export type CommonPostCardWrapperProps = {
  postInfo: ApiCommonDiaryProps;
  children: React.ReactNode;
};

const PostCardWrapper: FC<Omit<CommonPostCardWrapperProps, 'postInfo'>> = ({ children }) => {
  return (
    <div className={cx('space-y-2 bg-primary-bg px-side-padding py-4 cursor-pointer')}>
      {children}
    </div>
  );
};

export default PostCardWrapper;
