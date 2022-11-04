import ImageWithEditButton from '@src/components/ui/organism/ImageWithEditButton';
import { CommonUserAuthInfoType } from '@src/core/types/auth-type';
import React, { FunctionComponent, useEffect, useState } from 'react';

const ProfileIntroSection: FunctionComponent<{
  userInfo: CommonUserAuthInfoType['user'];
}> = ({ userInfo: { thumbnail, nickname, role } }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    //Todo: call profile change api on every imageFiles change
    // check if imageFile is same with current profile image
  }, [imageFiles]);

  return (
    <div className="w-full h-52 flex flex-col justify-center items-center space-y-2">
      <ImageWithEditButton
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        inputId="modify_profile"
        src={thumbnail === '' ? '/static/default_profile.svg' : thumbnail}
      />
      <div className="text-center space-y-0.5">
        <h1>{nickname}</h1>
        <p className="text-wy-blue-500">{role}</p>
      </div>
    </div>
  );
};

export default ProfileIntroSection;
