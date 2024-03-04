export interface UserProfileData {
  email: string;
  name: string;
}

export interface SocialLoginSessionData {
  platform: string;
  platformUsername: string;
  platformEmail: string;
  socialAuthToken: string;
  socialTokenExpiry: Date;
}

export interface AuthorizedData {
  loginTokenId: string;
  email: string;
  name: string;
  tokenExpiry: Date;
}
