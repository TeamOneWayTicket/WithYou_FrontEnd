import { ImageWrapper } from '@src/components/ui/atom';
import cx from 'classnames';
import { FunctionComponent } from 'react';

const ImageWithBackground: FunctionComponent<{
  src: string;
  bgColor?: string;
}> = ({ src, bgColor }) => {
  return (
    <div className={cx('relative w-full h-full rounded-full', bgColor ?? 'bg-primary-700')}>
      <ImageWrapper
        className="select-none rounded-full object-cover"
        src={src}
        layout="fill"
        objectFit="cover"
        alt="profile"
      />
    </div>
  );
};

export default ImageWithBackground;
