import { apiKakaoSignIn } from '@src/core/api/apiAuth';
import { envConfig } from '@src/core/config/envConfig';
import { KakaoAuthHookType } from '@src/core/types/auth-type';
import { useLazyScript } from '@src/hooks';

export default function useKakaoAuth({ router, onSuccess, onFailure }: KakaoAuthHookType) {
  const [isLoaded] = useLazyScript('https://developers.kakao.com/sdk/js/kakao.min.js');

  const processKakaoLogin = async () => {
    if (!isLoaded) {
      throw new Error('Kakao SDK is not loaded');
    }
    if (!Kakao.isInitialized()) {
      Kakao.init(envConfig.kakaoClientId);
    }
    Kakao.Auth.authorize({
      redirectUri: envConfig.kakaoRedirectUrl,
    });
  };

  return [isLoaded, processKakaoLogin] as const;
}
