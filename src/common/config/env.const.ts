const env = 'NODE_ENV';
const dbHost = 'DB_HOST';
const dbPort = 'DB_PORT';
const dbUsername = 'DB_USERNAME';
const dbPassword = 'DB_PASSWORD';
const dbDatabase = 'DB_DATABASE';
const jwtAccessSecret = 'JWT_ACCESS_SECRET';
const jwtRefreshSecret = 'JWT_REFRESH_SECRET';
const bcryptSaltRounds = 'BCRYPT_SALT_ROUNDS';
const jwtRefreshExpiresIn = 'JWT_REFRESH_EXPIRES_IN';
const jwtAccessExpiresIn = 'JWT_ACESS_EXPIRES_IN';
const kakaoClientId = 'KAKAO_CLIENT_ID';
const kakaoRedirectUri = 'KAKAO_REDIRECT_URI';

export const envKeys = {
  env,
  dbHost,
  dbPort,
  dbUsername,
  dbPassword,
  dbDatabase,
  jwtAccessSecret,
  jwtRefreshSecret,
  bcryptSaltRounds,
  jwtRefreshExpiresIn,
  jwtAccessExpiresIn,
  kakaoClientId,
  kakaoRedirectUri,
  naverClientId: 'NAVER_CLIENT_ID',
  naverRedirectUri: 'NAVER_REDIRECT_URI',
  naverClientSecret: 'NAVER_CLIENT_SECRET',
  googleClientId: 'GOOGLE_CLIENT_ID',
  googleClientSecret: 'GOOGLE_CLIENT_SECRET',
  googleRedirectUri: 'GOOGLE_REDIRECT_URI',
};
