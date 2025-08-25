import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserProvider } from 'src/users/entities/user-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProvider]), JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
