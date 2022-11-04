import { ButtonWithIcon } from '@src/components/ui/atom';
import { SVGTypes } from '@src/components/ui/atom/Icon/Icon';
import {
  AppleAuthHookType,
  GoogleAuthHookType,
  KakaoAuthHookType,
} from '@src/core/types/auth-type';
import { useKakaoAuth } from '@src/hooks';
import useAppleAuth from '@src/hooks/auth/useAppleAuth';
import useGoogleAuth from '@src/hooks/auth/useGoogleAuth';
import cx from 'classnames';
import React, { FunctionComponent } from 'react';

const SocialLoginButtonWrapper: FunctionComponent<{
  isLoaded: boolean;
  name: SVGTypes;
  vendorText: '이메일' | '카카오' | '구글' | '애플';
  className?: string;
  onClick: () => void;
}> = ({ isLoaded, vendorText, name, className, onClick }) => (
  <span className="w-full">
    <ButtonWithIcon
      className={cx(className, 'relative my-1.5 disabled:opacity-50 text-md')}
      nameChange={name}
      sizeChange={28}
      fullWidth
      disabled={!isLoaded}
      onClick={onClick}
    >
      {vendorText}로 시작하기
    </ButtonWithIcon>
  </span>
);

export const KakaoLoginButton: FunctionComponent<KakaoAuthHookType> = ({ ...props }) => {
  const [isKakaoScriptLoaded, useKakaoLogin] = useKakaoAuth();

  return (
    <SocialLoginButtonWrapper
      className="bg-wy-kakao-yellow"
      isLoaded={isKakaoScriptLoaded}
      name="kakao"
      vendorText="카카오"
      onClick={useKakaoLogin}
    />
  );
};

export const GoogleLoginButton: FunctionComponent<GoogleAuthHookType> = ({ ...props }) => {
  const [isGoogleScriptLoading, useGoogleLogin] = useGoogleAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      className="bg-wy-google-gray"
      isLoaded={false}
      name="google"
      vendorText="구글"
      onClick={useGoogleLogin}
    />
  );
};

export const AppleLoginButton: FunctionComponent<AppleAuthHookType> = ({ ...props }) => {
  const [isAppleScriptLoading, useAppleLogin] = useAppleAuth({ ...props });

  return (
    <SocialLoginButtonWrapper
      className="bg-wy-apple-black text-white"
      isLoaded={false}
      name="apple"
      vendorText="애플"
      onClick={useAppleLogin}
    />
  );
};

export const EmailLoginButton: FunctionComponent<{
  onClick: () => void;
}> = ({ onClick }) => (
  <SocialLoginButtonWrapper
    className="bg-blue-500/80 text-white"
    isLoaded={true}
    name="email"
    vendorText="이메일"
    onClick={onClick}
  />
);
