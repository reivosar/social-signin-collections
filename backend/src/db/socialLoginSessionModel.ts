import mongoose from "mongoose";

const socialLoginSessionSchema = new mongoose.Schema({
  userProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserProfile",
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  loginTokenId: {
    type: String,
    unique: true,
    required: true,
  },
  platformUsername: {
    type: String,
    required: false,
  },
  platformEmail: {
    type: String,
    required: false,
  },
  socialAuthToken: {
    type: String,
    required: true,
  },
  socialTokenExpiry: {
    type: Date,
    required: true,
  },
});

const SocialLoginSession = mongoose.model(
  "SocialLoginSession",
  socialLoginSessionSchema
);

export default SocialLoginSession;
