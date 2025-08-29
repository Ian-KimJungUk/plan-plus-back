import { AuthProvider } from 'src/users/entities/user-provider.entity';

export interface OAuthAdapter {
  provider: AuthProvider;
  verifyAndGetProfile(data: { code: string }): Promise<{
    providerId: string;
  }>;
}
