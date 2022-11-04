import { openEmailSignInModal } from '@src/atom/modal';
import { InputBox } from '@src/components/ui/atom';
import EmailFormButton from '@src/components/ui/organism/EmailForm/EmailFormButton';
import { apiLocalSignUp } from '@src/core/api/apiAuth';
import { useValidateInput } from '@src/hooks';
import { commonRegex } from '@src/utils/regexUtil';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const EmailSignUpForm = () => {
  const router = useRouter();
  const handleCloseModal = useResetRecoilState(openEmailSignInModal);
  const handleOpenSignInModal = useSetRecoilState(openEmailSignInModal);

  const [email, emailIsValid, emailError, handleEmailChange] = useValidateInput(
    '',
    commonRegex.email.regex,
    commonRegex.email.desc
  );

  const [password, pwValid, pwError, handlePwChange] = useValidateInput(
    '',
    commonRegex.password.regex,
    commonRegex.password.desc
  );

  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiLocalSignUp(email, password);
      handleCloseModal();
      await router.push('/');
    } catch (err) {}
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <InputBox
        type="email"
        name="email"
        label="이메일"
        size="small"
        style="transparent"
        value={email as string}
        error={!emailIsValid}
        errorMessage={emailError}
        fullWidth
        onChange={handleEmailChange}
      />
      <InputBox
        type="password"
        name="password"
        label="비밀번호"
        size="small"
        style="transparent"
        value={password as string}
        error={!pwValid}
        errorMessage={pwError}
        fullWidth
        onChange={handlePwChange}
      />
      <InputBox
        type="password"
        name="repassword"
        label="비밀번호 확인"
        size="small"
        style="transparent"
        value={passwordConfirm as string}
        error={passwordConfirm && passwordConfirm !== password}
        errorMessage={'비밀번호가 일치하지 않습니다.'}
        fullWidth
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
      />
      <EmailFormButton
        submitButtonText="회원가입하기"
        notFoundText="계정이 있으신가요?"
        onNotFoundClick={() => {
          handleOpenSignInModal({
            fullScreen: false,
          });
        }}
      />
    </form>
  );
};

export default EmailSignUpForm;
