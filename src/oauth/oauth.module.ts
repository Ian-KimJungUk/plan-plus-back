import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { KakaoAdapter } from './adapters/kakao.adapter';
import { NaverAdapter } from './adapters/naver.adapter';
import { GoogleAdapter } from './adapters/google.adapter';

@Module({
  providers: [OauthService, KakaoAdapter, NaverAdapter, GoogleAdapter],
  exports: [OauthService],
})
export class OauthModule {}
