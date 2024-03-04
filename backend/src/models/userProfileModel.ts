import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: String,
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;