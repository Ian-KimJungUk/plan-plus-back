import { Injectable } from '@nestjs/common';
import { KakaoAdapter } from './adapters/kakao.adapter';
import { AuthProvider } from 'src/users/entities/user-provider.entity';
import { OAuthAdapter } from './adapters/oauth.adapter';
import { NaverAdapter } from './adapters/naver.adapter';

@Injectable()
export class OauthService {
  private adapters = new Map<AuthProvider, OAuthAdapter>();
  constructor(
    kakao: KakaoAdapter,
    naver: NaverAdapter,
    // google: GoogleAdapter,
  ) {
    [
      kakao,
      naver,
      // google,
    ].forEach((adapter) => {
      this.adapters.set(adapter.provider, adapter);
    });
  }

  async verifyAndGetSocialData(privider: AuthProvider, data: any) {
    const adapter = this.adapters.get(privider);
    if (!adapter) {
      throw new Error('지원하지 않는 소셜 로그인입니다');
    }
    return await adapter.verifyAndGetProfile(data);
  }
}
