import { AuthProvider } from 'src/users/entities/user-provider.entity';
import { OAuthAdapter } from './oauth.adapter';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { envKeys } from 'src/common/config/env.const';

export class NaverAdapter implements OAuthAdapter {
  provider = AuthProvider.naver;
  constructor(private readonly configService: ConfigService) {}

  async verifyAndGetProfile(data: { code: string }) {
    const res = await axios.post(
      'https://nid.naver.com/oauth2.0/token',
      new URLSearchParams({
        grant_type: 'code',
        client_id: this.configService.get<string>(envKeys.naverClientId) || '',
        client_secret:
          this.configService.get<string>(envKeys.naverClientSecret) || '',
        code: data.code,
        state: 'STATE_STRING',
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
