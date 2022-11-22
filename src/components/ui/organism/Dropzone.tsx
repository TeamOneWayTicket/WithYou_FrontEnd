import { FileInputBox, Icon, ImageWrapper } from '@src/components/ui/atom';
import { usePreviewImage } from '@src/hooks';
import { usePreviewImageProps } from '@src/hooks/usePreviewImage';
import React, { Fragment, FunctionComponent } from 'react';

const PreviewImageLessThanThree = ({ images }) => (
  <Fragment>
    {images.map((image, index) => (
      <div
        key={`post-image-${index}`}
        className="relative flex flex-shrink flex-nowrap w-full h-full basis-1/2"
      >
        <ImageWrapper layout="fill" objectFit="cover" src={image} alt="" />
      </div>
    ))}
  </Fragment>
);

const PreviewImageMoreThanThree = ({ images }) => (
  <Fragment>
    <div className="relative flex flex-shrink basis-3/5 mr-1">
      <ImageWrapper src={images[0]} layout="fill" objectFit="cover" />
    </div>
    <div className="relative flex flex-col flex-shrink basis-2/5 space-y-1">
      <div className="relative flex basis-1/2">
        <ImageWrapper src={images[1]} layout="fill" objectFit="cover" />
      </div>
      <div className="relative flex basis-1/2">
        <ImageWrapper
          src={images[2]}
          className=""
          layout="fill"
          objectFit="cover"
          {...(images.length > 3 && {
            bgFilter: 'bg-black/50',
          })}
        />
        {images.length > 3 && (
          <div className="absolute translate-center-xy text-white z-10 flex items-center text-2xl">
            <Icon name="plus" />
            <span>{images.length - 3}</span>
          </div>
        )}
      </div>
    </div>
  </Fragment>
);

const DropZone: FunctionComponent<usePreviewImageProps> = ({ imageFiles, setImageFiles }) => {
  const [images, handleChange] = usePreviewImage({ imageFiles, setImageFiles });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <label
        htmlFor="dropzone-file"
        className="relative flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col justify-center items-center h-full">
          <Icon className="w-10 h-10 text-gray-400" name="upload" size={24} />
        </div>
        <FileInputBox inputId="dropzone-file" multiple onChange={handleChange} />
        {images.length > 0 ? (
          <div className="absolute w-full h-full flex pointer-events-none rounded-xl overflow-hidden">
            {images.length <= 2 ? (
              <PreviewImageLessThanThree images={images} />
            ) : (
              <PreviewImageMoreThanThree images={images} />
            )}
          </div>
        ) : null}
      </label>
    </div>
  );
};

export default DropZone;
