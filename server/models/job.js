import mongoose from "mongoose";

const summerJobSchema = mongoose.Schema({
  company: String,
  role: String,
  location: String,
  applicationLink: String,
  datePosted: Date,
  salary: String,
  season: String,
});

const offseasonJobSchema = mongoose.Schema({
  company: String,
  role: String,
  location: String,
  applicationLink: String,
  datePosted: Date,
  salary: String,
  season: String,
});

const newGradJobSchema = mongoose.Schema({
  company: String,
  role: String,
  location: String,
  applicationLink: String,
  datePosted: Date,
  season: String,
});

const SummerJob = mongoose.model("SummerJob", summerJobSchema);
const OffseasonJob = mongoose.model("OffseasonJob", offseasonJobSchema);
const NewGradJob = mongoose.model("NewGradJob", newGradJobSchema);

export { SummerJob, OffseasonJob, NewGradJob };
