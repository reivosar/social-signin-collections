import axios from "axios";
import { save } from "../db/socialLoginRepository";
import {
  UserProfileData,
  SocialLoginSessionData,
  AuthorizedData,
} from "../models/socialLoginModels";

interface Email {
  email: string;
  primary: boolean;
}

export async function handleGitHubRedirect(
  code: string
): Promise<AuthorizedData> {
  try {
    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfoResponse = await axios.get(`https://api.github.com/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userEmailsResponse = await axios.get<Email[]>(
      `https://api.github.com/user/emails`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const primaryEmailObj = userEmailsResponse.data.find(
      (email): email is Email => email.primary
    );
    const primaryEmail = primaryEmailObj ? primaryEmailObj.email : "";

    const userProfileData: UserProfileData = {
      email: primaryEmail,
      name: userInfoResponse.data.name,
    };

    const socialLoginSessionData: SocialLoginSessionData = {
      platform: "GitHub",
      platformUsername: userInfoResponse.data.login,
      platformEmail: primaryEmail,
      socialAuthToken: accessToken,
      socialTokenExpiry: new Date(new Date().getTime() + 60 * 60 * 1000),
    };

    const loginTokenId = await save(userProfileData, socialLoginSessionData);

    return {
      loginTokenId,
      tokenExpiry: socialLoginSessionData.socialTokenExpiry,
    };
  } catch (error) {
    console.error("Error during GitHub authentication:", error);
    throw new Error("Authentication failed");
  }
}
