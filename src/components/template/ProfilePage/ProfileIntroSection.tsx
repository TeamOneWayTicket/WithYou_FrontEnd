import { Button } from '@src/components/ui/atom';
import ImageWithEditButton from '@src/components/ui/organism/ImageWithEditButton';
import { apiGetInviteCode } from '@src/core/api/apiFamily';
import { apiUpdateThumbnail } from '@src/core/api/apiProfile';
import { CommonUserAuthInfoType } from '@src/core/types/auth-type';
import { useCopyToClipboard } from '@src/hooks/navigation';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';

const ProfileIntroSection: FunctionComponent<{
  userInfo: CommonUserAuthInfoType['user'];
}> = ({ userInfo: { thumbnail, nickname, role } }) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [_, copy] = useCopyToClipboard();
  const [familyCode, setFamilyCode] = useState<string | null>(null);

  const handleFamilyCodeIssue = useCallback(async () => {
    const { inviteCode } = await apiGetInviteCode();
    await copy(inviteCode);
    setFamilyCode(inviteCode);
  }, [copy]);

  useEffect(() => {
    (async () => {
      if (imageFiles.length === 0) {
        return;
      }
      await apiUpdateThumbnail(imageFiles[0]);
    })();
  }, [imageFiles]);

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center space-y-2">
      <ImageWithEditButton
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        inputId="modify_profile"
        src={thumbnail === '' ? '/static/default_profile.svg' : thumbnail}
      />
      <div className="text-center space-y-0.5">
        <h2>{nickname}</h2>
        <p className="text-wy-blue-500">{role}</p>
        <Button styles="wy-blue" size="small" onClick={handleFamilyCodeIssue}>
          {familyCode ?? '가족코드 발급'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileIntroSection;
