import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { envKeys } from 'src/common/config/env.const';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthProvider } from 'src/users/entities/user-provider.entity';
import { OauthService } from 'src/oauth/oauth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly oauthService: OauthService,
  ) {}

  parseBasicToken(rawToken: string) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다');
    }

    const [basic, token] = basicSplit;

    if (basic.toLowerCase() !== 'basic') {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다');
    }

    const decoded = Buffer.from(token, 'base64').toString('utf-8');

    const tokenSplit = decoded.split(':');

    if (tokenSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다');
    }

    const [id, password] = tokenSplit;

    return { id, password };
  }

  async parseBearerToken(
    rawToken: string,
    isRefreshToken: boolean,
  ): Promise<{ userId: string; role: string }> {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다');
    }

    const [bearer, token] = basicSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포맷이 잘못됐습니다');
    }

    try {
      const payload: {
        type: 'access' | 'refresh';
        userId: string;
        role: string;
      } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get(
          isRefreshToken ? envKeys.jwtRefreshSecret : envKeys.jwtAccessSecret,
        ),
      });

      if (isRefreshToken) {
        if (payload.type !== 'refresh') {
          throw new BadRequestException('Refresh 토큰을 입력해주세요');
        }
      } else {
        if (payload.type !== 'access') {
          throw new BadRequestException('Access 토큰을 입력해주세요');
        }
      }

      return {
        userId: payload.userId,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException('토큰이 만료됐습니다');
    }
  }

  async issueToken(data: any, isRefreshToken: boolean) {
    return await this.jwtService.signAsync(
      {
        ...data,
        type: isRefreshToken ? 'refresh' : 'access',
      },
      {
        secret: this.configService.get(
          isRefreshToken ? envKeys.jwtRefreshSecret : envKeys.jwtAccessSecret,
        ),
        expiresIn: this.configService.get(
          isRefreshToken
            ? envKeys.jwtRefreshExpiresIn
            : envKeys.jwtAccessExpiresIn,
        ),
      },
    );
  }

  async localRegister(dto: CreateUserDto) {
    const user = await this.usersService.findOneByProviderId(
      dto.provider,
      dto.email,
    );

    if (user) {
      throw new BadRequestException('이미 가입된 아이디입니다');
    }

    const hash = await bcrypt.hash(
      dto.password || '',
      this.configService.get(envKeys.bcryptSaltRounds) || 10,
    );

    return await this.usersService.create({
      ...dto,
      password: hash,
    });
  }

  async localLogin(rawToken: string) {
    const dto = this.parseBasicToken(rawToken);
    const user = await this.usersService.findOneByProviderId(
      AuthProvider.local,
      dto.id,
    );

    if (!user) {
      throw new BadRequestException('아이디 또는 비밀번호가 잘못 되었습니다');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.userProviders.find((p) => p.provider === AuthProvider.local)
        ?.password || '',
    );

    if (!isPasswordValid) {
      throw new BadRequestException('아이디 또는 비밀번호가 잘못 되었습니다');
    }

    return {
      accessToken: await this.issueToken(
        { id: user.userId, role: user.role },
        false,
      ),
      refreshToken: await this.issueToken(
        { id: user.userId, role: user.role },
        true,
      ),
    };
  }

  async socialLogin(dto: { provider: AuthProvider; code: string }) {
    const profile = await this.oauthService.verifyAndGetSocialData(
      dto.provider,
      dto,
    );

    const user = await this.usersService.findOneByProviderId(
      dto.provider,
      profile.providerId,
    );

    if (user) {
      return {
        accessToken: await this.issueToken(
          { id: user.userId, role: user.role },
          false,
        ),
        refreshToken: await this.issueToken(
          { id: user.userId, role: user.role },
          true,
        ),
      };
    }

    return {
      nonce: await this.issueToken(
        { provider: dto.provider, providerId: profile.providerId },
        false,
      ),
    };
  }

  async socialRegister(dto: CreateUserDto) {
    const user = await this.usersService.findOneByProviderId(
      dto.provider,
      dto.providerId,
    );

    if (user) {
      throw new BadRequestException('이미 가입된 아이디입니다');
    }

    return await this.usersService.create(dto);
  }
}
