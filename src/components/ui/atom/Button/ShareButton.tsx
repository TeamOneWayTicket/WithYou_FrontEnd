import cx from 'classnames';
import React, { FunctionComponent } from 'react';

import { Icon } from '..';

interface Props {
  className?: string;
  textColor?: 'gray' | 'white';
  onClick: (props: unknown) => void;
}

const _textColor: Record<Props['textColor'], string> = {
  gray: 'text-gray-500',
  white: 'text-white',
};

const ShareButton: FunctionComponent<Props> = ({ className, textColor = 'gray', onClick }) => {
  return (
    <div className={cx('flex', className, _textColor[textColor])} onClick={onClick}>
      <Icon name="share" />
      <span className="pointer-events-none select-none">공유하기</span>
    </div>
  );
};

export default ShareButton;
