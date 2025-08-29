import { AuthProvider } from 'src/users/entities/user-provider.entity';
import { OAuthAdapter } from './oauth.adapter';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { envKeys } from 'src/common/config/env.const';

export class KakaoAdapter implements OAuthAdapter {
  provider = AuthProvider.kakao;
  constructor(private readonly configService: ConfigService) {}

  async verifyAndGetProfile(data: { code: string }) {
    const res = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.configService.get(envKeys.kakaoClientId) || '',
        redirect_uri: this.configService.get(envKeys.kakaoRedirectUri) || '',
        code: data.code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const profileRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${res.data.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    return {
      providerId: profileRes.data.id,
    };
  }
}
