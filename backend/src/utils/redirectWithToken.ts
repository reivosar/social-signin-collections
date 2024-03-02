import jwt from 'jsonwebtoken';

interface UserPayload {
  email: string;
  name: string;
}

export function generateRedirectUrl(userPayload: UserPayload): string {
  const redirectUrl = process.env.FRONTEND_LOGIN_SUCCESS_URL;
  if (!redirectUrl) {
    throw new Error('FRONTEND_LOGIN_SUCCESS_URL is not defined in the environment variables.');
  }

  const jwtSecret = process.env.JWT_SECRET as string;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }

  const encodedUserInfo = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });
  return `${redirectUrl}?userInfo=${encodeURIComponent(encodedUserInfo)}`;
}