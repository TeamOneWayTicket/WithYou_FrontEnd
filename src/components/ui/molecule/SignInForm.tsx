import {
  AppleLoginButton,
  Button,
  EmailLoginButton,
  GoogleLoginButton,
  KakaoLoginButton,
} from '@src/components/ui/atom';
import { SocialAuthHookType } from '@src/core/types/auth-type';
import React, { FunctionComponent, memo } from 'react';

interface SignInFormProps extends SocialAuthHookType {
  onEmailLogin: () => void;
}

const SignInForm: FunctionComponent<SignInFormProps> = ({ onEmailLogin, ...props }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <EmailLoginButton onClick={onEmailLogin} />
        {/* <AppleLoginButton {...props} /> */}
        {/* <GoogleLoginButton {...props} /> */}
        <KakaoLoginButton {...props} />
      </div>
    </div>
  );
};

export default memo(SignInForm);
