import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { KakaoAdapter } from './adapters/kakao.adapter';
import { NaverAdapter } from './adapters/naver.adapter';

@Module({
  providers: [OauthService, KakaoAdapter, NaverAdapter],
  exports: [OauthService],
})
export class OauthModule {}
