import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthProvider } from '../entities/user-provider.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly provider: AuthProvider;

  @IsNotEmpty()
  @IsString()
  readonly providerId: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly password?: string;
}
