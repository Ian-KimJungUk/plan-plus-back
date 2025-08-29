import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { KakaoAdapter } from './adapters/kakao.adapter';

@Module({
  providers: [OauthService, KakaoAdapter],
  exports: [OauthService],
})
export class OauthModule {}
