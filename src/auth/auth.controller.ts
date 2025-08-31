import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthProvider } from 'src/users/entities/user-provider.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    if (dto.provider !== AuthProvider.local) {
      throw new BadRequestException('적절하지 않은 회원가입 방식입니다');
    }

    return await this.authService.localRegister(dto);
  }

  @Post('login')
  async login(@Headers('authorization') rawToken: string) {
    return await this.authService.localLogin(rawToken);
  }

  @Post('social')
  async socialLogin(@Body() dto: { provider: AuthProvider; code: string }) {
    if (dto.provider === AuthProvider.local) {
      throw new BadRequestException('적절하지 않은 로그인 방식입니다');
    }

    return await this.authService.socialLogin(dto);
  }

  @Post('social/register')
  async socialRegister(@Body() dto: CreateUserDto) {
    if (dto.provider === AuthProvider.local) {
      throw new BadRequestException('적절하지 않은 회원가입 방식입니다');
    }

    return await this.authService.socialRegister(dto);
  }
}
