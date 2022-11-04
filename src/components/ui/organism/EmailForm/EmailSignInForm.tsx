import { openEmailSignUpModal } from '@src/atom/modal';
import { InputBox } from '@src/components/ui/atom';
import { apiLocalSignIn } from '@src/core/api/apiAuth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import EmailFormButton from './EmailFormButton';

const EmailLoginForm = () => {
  const router = useRouter();
  const handleCloseModal = useResetRecoilState(openEmailSignUpModal);
  const handleOpenSignupModal = useSetRecoilState(openEmailSignUpModal);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiLocalSignIn(formData.email, formData.password);
      handleCloseModal();
      router.push('/');
    } catch (err) {}
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <InputBox
        type="email"
        name="email"
        label="이메일"
        style="transparent"
        value={formData.email}
        fullWidth
        onChange={handleOnChange}
      />
      <InputBox
        type="password"
        name="password"
        label="비밀번호"
        style="transparent"
        value={formData.password}
        fullWidth
        onChange={handleOnChange}
      />
      <EmailFormButton
        submitButtonText="로그인하기"
        notFoundText="계정이 없으신가요?"
        onNotFoundClick={() => {
          handleOpenSignupModal({
            fullScreen: false,
          });
        }}
      />
    </form>
  );
};

export default EmailLoginForm;
