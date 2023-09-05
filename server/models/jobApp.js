import mongoose from "mongoose";

const jobAppSchema = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  company: String,
  location: String,
  jobTitle: String,
  season: String,
  dateApplied: Date,
  dateScreen: Date,
  dateInterview: Date,
  dateOffer: Date,
  dateRejected: Date,
});

const JobApp = mongoose.model("JobApp", jobAppSchema);

export default JobApp;
