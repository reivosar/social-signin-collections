import mongoose from "mongoose";
import UserProfile from "./userProfileModel";
import SocialLoginSession from "./socialLoginSessionModel";
import { v4 as uuidv4 } from "uuid";
import {
  UserProfileData,
  SocialLoginSessionData,
} from "../models/socialLoginModels";

export async function findAvailableSocialLoginSession(loginTokenId: string) {
  const now = new Date();
  const result = await SocialLoginSession.find({
    loginTokenId: loginTokenId,
    socialTokenExpiry: { $gt: now },
  });
  return result;
}

export async function save(
  userProfileData: UserProfileData,
  socialLoginSessionData: SocialLoginSessionData
) {
  try {
    const userProfile = await saveUserProfile(userProfileData);
    const socialLoginSession = await saveSocialLoginSession(
      userProfile._id,
      socialLoginSessionData
    );
    return socialLoginSession.loginTokenId;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function saveUserProfile(data: UserProfileData) {
  const { email, name } = data;
  let userProfile = await UserProfile.findOne({ email });
  if (!userProfile) {
    userProfile = new UserProfile({ email, name });
  } else {
    userProfile.email = email;
    userProfile.name = name;
  }
  await userProfile.save();
  return userProfile;
}

async function saveSocialLoginSession(
  userProfileId: mongoose.Types.ObjectId,
  data: SocialLoginSessionData
) {
  const {
    platform,
    platformUsername,
    platformEmail,
    socialAuthToken,
    socialTokenExpiry,
  } = data;
  let socialLoginSession = await SocialLoginSession.findOne({
    userId: userProfileId,
  });

  if (!socialLoginSession) {
    socialLoginSession = new SocialLoginSession({
      userProfileId: userProfileId,
      loginTokenId: uuidv4(),
      platform: platform,
      platformUsername: platformUsername,
      platformEmail: platformEmail,
      socialAuthToken,
      socialTokenExpiry,
    });
  } else {
    socialLoginSession.socialAuthToken = socialAuthToken;
    socialLoginSession.socialTokenExpiry = socialTokenExpiry;
  }
  await socialLoginSession.save();
  return socialLoginSession;
}
