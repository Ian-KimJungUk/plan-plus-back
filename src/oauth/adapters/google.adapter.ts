import { AuthProvider } from 'src/users/entities/user-provider.entity';
import { OAuthAdapter } from './oauth.adapter';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { envKeys } from 'src/common/config/env.const';

export class GoogleAdapter implements OAuthAdapter {
  provider = AuthProvider.google;
  constructor(private readonly configService: ConfigService) {}

  async verifyAndGetProfile(data: { code: string }) {
    const res = await axios.post(
      'https://oauth2.googleapis.com/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.configService.get<string>(envKeys.googleClientId) || '',
        client_secret:
          this.configService.get<string>(envKeys.googleClientSecret) || '',
        code: data.code,
        redirect_uri:
          this.configService.get<string>(envKeys.googleRedirectUri) || '',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const profileRes = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${res.data.access_token}`,
      },
    });

    return {
      providerId: profileRes.data.response.id,
    };
  }
}
