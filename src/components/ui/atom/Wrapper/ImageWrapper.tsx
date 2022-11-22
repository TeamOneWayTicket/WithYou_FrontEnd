import classNames from 'classnames';
import NextImage, { ImageProps } from 'next/image';
import { Fragment, useCallback, useState } from 'react';

type CustomImageType = {
  bgFilter?: string;
};

/**
 * @param {string} bgFilter - pass bgFilter to add filter to image(parent should be relative)
 * @example 'bg-gradient-to-r from-gray-500/10 to-gray-500/50'
 */
const Image = ({ bgFilter, className, src, objectFit, ...rest }: ImageProps & CustomImageType) => {
  const [isError, setIsError] = useState(false);

  const handleError = useCallback(() => {
    setIsError(true);
  }, []);

  return (
    <Fragment>
      <div
        className={
          bgFilter ? classNames('absolute inset-0 w-full h-full z-[1]', className, bgFilter) : ''
        }
      />
      <NextImage
        className={className}
        src={isError ? '/static/notfound.svg' : src}
        objectFit={isError ? 'contain' : objectFit}
        onError={handleError}
        {...rest}
      />
    </Fragment>
  );
};

export default Image;
