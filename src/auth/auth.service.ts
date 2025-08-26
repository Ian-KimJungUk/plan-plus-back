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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    const [email, password] = tokenSplit;

    return { email, password };
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

  async signUp(dto: CreateUserDto) {
    const user = await this.usersService.findOneByProviderId(dto.email);

    if (user) {
      throw new BadRequestException('이미 가입된 이메일입니다');
    }

    const hash = await bcrypt.hash(
      dto.password,
      this.configService.get<number>(envKeys.bcryptSaltRounds) || 0,
    );

    await this.usersService.create({
      ...dto,
      password: hash,
    });

    return await this.usersService.findOneByProviderId(dto.email);
  }

  async signIn(rawToken: string) {
    const dto = this.parseBasicToken(rawToken);
    const user = await this.usersService.findOneByProviderId(dto.email);

    if (!user) {
      throw new BadRequestException('가입되지 않은 이메일입니다');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  }
}
