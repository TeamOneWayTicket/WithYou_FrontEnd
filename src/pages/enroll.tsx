import { withAuthCSR } from '@src/components/hoc';
import { PageLayout } from '@src/components/layout';
import { Button, FullWidthOverflowWrapper, InputBox, SelectBox } from '@src/components/ui/atom';
import CommonBackwardHeader from '@src/components/ui/atom/Header/CommonBackwardHeader';
import { ImageWithEditButton } from '@src/components/ui/organism';
import { useValidateInput } from '@src/hooks';
import { familyRoleList } from '@src/utils/constants';
import { commonRegex } from '@src/utils/regexUtil';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

const EnrollPage = () => {
  const router = useRouter();
  const familyRoleListMemo = useMemo(() => familyRoleList, []);

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [name, nameIsValid, nameError, handleNameChange] = useValidateInput(
    '',
    commonRegex.name.regex,
    commonRegex.name.desc
  );

  const [role, setRole] = useState('');

  const handleBackward = () => {
    router.back();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Todo: api call
    router.push('/');
  };

  return (
    <PageLayout
      className="bg-white"
      headerContent={<CommonBackwardHeader title={'내 프로필 만들기'} onBack={handleBackward} />}
    >
      <FullWidthOverflowWrapper>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-between items-center pt-8 space-y-4">
            <ImageWithEditButton
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              inputId="profile"
              src={'/static/sample_profile.png'}
            />
            <InputBox
              type="id"
              label="이름"
              fullWidth
              value={name as string}
              error={!nameIsValid}
              errorMessage={nameError}
              name="username"
              classNames="border-none bg-gray-50"
              onChange={handleNameChange}
            />
            <SelectBox
              fullWidth
              label="역할"
              name="role"
              defaultValue={'역할'}
              optionList={familyRoleListMemo}
              classNames="border-none bg-gray-50"
              onSelect={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="fixed bottom-0 w-full max-w-mobile-app">
            <Button
              type="submit"
              disabled={!nameIsValid || !role}
              styles="wy-blue"
              fullWidth
              roundness="keyboard"
            >
              시작하기
            </Button>
          </div>
        </form>
      </FullWidthOverflowWrapper>
    </PageLayout>
  );
};

export default withAuthCSR(EnrollPage);