import axios from "axios";
import { save } from "../db/socialLoginRepository";
import {
  UserProfileData,
  SocialLoginSessionData,
  AuthorizedData,
} from "../models/socialLoginModels";

export async function handleGoogleRedirect(
  code: string
): Promise<AuthorizedData> {
  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }
  );

  const accessToken = tokenResponse.data.access_token;
  const expiresIn = tokenResponse.data.expires_in;
  const userInfoResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  const userProfileData: UserProfileData = {
    email: userInfoResponse.data.email,
    name: userInfoResponse.data.name,
  };

  const socialLoginSessionData: SocialLoginSessionData = {
    platform: "Google",
    platformUsername: userInfoResponse.data.name,
    platformEmail: userInfoResponse.data.email,
    socialAuthToken: accessToken,
    socialTokenExpiry: new Date(new Date().getTime() + expiresIn * 1000),
  };

  const loginTokenId = await save(userProfileData, socialLoginSessionData);

  const authorizedData = {
    loginTokenId,
    tokenExpiry: socialLoginSessionData.socialTokenExpiry,
  };

  return authorizedData;
}
