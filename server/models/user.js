import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  name: String,
  email: String,
  avatar: String,
  jobApps: [{ type: mongoose.Types.ObjectId, ref: "JobApp" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
