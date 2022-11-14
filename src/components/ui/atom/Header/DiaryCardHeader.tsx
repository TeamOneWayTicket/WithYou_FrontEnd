import { ImageWrapper } from '@src/components/ui/atom';
import { parseDate } from '@src/utils/dateUtil';
import { needDefaultImage } from '@src/utils/imageUtil';
import React, { FunctionComponent } from 'react';

export type CommonProfileProps = {
  profileImage: string;
  profileName: string;
  timeStamp: string;
};

const PostCardHeader: FunctionComponent<CommonProfileProps> = ({
  profileImage,
  profileName,
  timeStamp,
}) => {
  return (
    <div className="flex space-x-2">
      <div className="relative w-10 h-10">
        <ImageWrapper
          className="rounded-full"
          src={needDefaultImage(profileImage)}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col">
        <h4>{profileName}</h4>
        <h5 className="text-gray-400">
          {parseDate({
            date: timeStamp,
          })}
        </h5>
      </div>
    </div>
  );
};

export default PostCardHeader;
