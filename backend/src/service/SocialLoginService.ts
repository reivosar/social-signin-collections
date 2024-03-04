import mongoose from "mongoose";
import UserProfile from "../models/userProfileModel";
import SocialLoginSession from "../models/socialLoginSessionModel";

interface UserProfileData {
  email: string;
  name: string;
}

interface SocialLoginSessionData {
  platform: string;
  platformUsername: string;
  platformEmail: string;
  socialAuthToken: string;
  socialTokenExpiry: Date;
}

export async function findAvailableSocialLoginSession(loginTokenId: string) {
  const result = await SocialLoginSession.find({ loginTokenId: loginTokenId });
  return result;
}

export async function save(
  userProfileData: UserProfileData,
  socialLoginSessionData: SocialLoginSessionData
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    saveUserProfile(session, userProfileData).then((userProfile) => {
      const loginTokenId = saveSocialLoginSession(
        session,
        userProfile._id,
        socialLoginSessionData
      );
      ``;
      return loginTokenId;
    });
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async function saveUserProfile(session: any, data: UserProfileData) {
  const { email, name } = data;
  let userProfile = await UserProfile.findOne({ email: email }).session(
    session
  );
  if (!userProfile) {
    userProfile = new UserProfile({ email, name });
  } else {
    userProfile.email = email;
    userProfile.name = name;
  }
  await userProfile.save({ session }).catch((error) => {
    throw new Error("Failed to save UserProfile.");
  });
  return userProfile;
}

async function saveSocialLoginSession(
  session: any,
  userProfileId: any,
  data: SocialLoginSessionData
) {
  const { socialAuthToken, socialTokenExpiry } = data;
  let socialLoginSession = await SocialLoginSession.findOne({
    userId: userProfileId,
  }).session(session);

  const loginTokenId = socialLoginSession?.loginTokenId;
  if (socialLoginSession) {
    socialLoginSession.socialAuthToken = socialAuthToken;
    socialLoginSession.socialTokenExpiry = socialTokenExpiry;
    await socialLoginSession.save({ session });
  } else {
    socialLoginSession = new SocialLoginSession({
      userId: userProfileId,
      loginTokenId,
      socialAuthToken,
      socialTokenExpiry,
    });
    socialLoginSession.save({ session }).catch((error) => {
      throw new Error("Failed to save SocialLoginSession.");
    });
  }
  return loginTokenId;
}
