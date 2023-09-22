import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import JobApp from "./models/jobApp.js";
import dotenv from "dotenv";
import userModel from "./models/user.js";
import schedule from "node-schedule";
import { fetchInternships } from "./constants/getData.js";
import { SummerJob, OffseasonJob, NewGradJob } from "./models/job.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_URL = process.env.MONGO_DB_CONNECTION;
const PORT = 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.get("/:userId/jobapps", async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 0;
  const pageSize = 8;
  const searchName = req.query.searchName || "";

  try {
    const query = { user: userId };

    if (searchName) {
      query.$or = [
        { jobTitle: { $regex: new RegExp(searchName, "i") } },
        { company: { $regex: new RegExp(searchName, "i") } },
        { location: { $regex: new RegExp(searchName, "i") } },
      ];
    }

    const jobApps = await JobApp.find(query)
      .skip(page * pageSize)
      .limit(pageSize);

    console.log(searchName);
    res.status(200).json(jobApps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);

  try {
    const newApp = new JobApp(body);

    console.log(newApp);
    await newApp.save();

    const user = await userModel.findOne({ _id: body.user });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.jobApps.push(newApp._id);
    await user.save();

    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const appId = req.params.id;

    const updatedApp = await JobApp.findOneAndReplace(
      { _id: appId },
      req.body,
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const appId = req.params.id;

    const deletedApp = await JobApp.findByIdAndRemove(appId);

    res.status();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete;

app.post("/getUser", async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new userModel({
      name,
      email,
      avatar,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while saving the user." });
  }
});

app.get("/:season/jobs", async (req, res) => {
  const season = req.params.season;
  const page = parseInt(req.query.page) || 0;
  const pageSize = 8;
  const searchName = req.query.searchName || "";

  try {
    const query = {};

    if (searchName) {
      query.$or = [
        { jobTitle: { $regex: new RegExp(searchName, "i") } },
        { company: { $regex: new RegExp(searchName, "i") } },
        { location: { $regex: new RegExp(searchName, "i") } },
      ];
    }

    let jobApps;

    if (season === "summer") {
      jobApps = await SummerJob.find(query)
        .sort({ datePosted: -1 })
        .skip(page * pageSize)
        .limit(pageSize);
    } else if (season === "offseason") {
      jobApps = await OffseasonJob.find(query)
        .sort({ datePosted: -1 })
        .skip(page * pageSize)
        .limit(pageSize);
    } else if (season === "newgrad") {
      jobApps = await NewGradJob.find(query)
        .skip(page * pageSize)
        .limit(pageSize);
    } else {
      return res.status(400).json({ message: "Invalid season parameter" });
    }

    console.log(searchName);
    res.status(200).json(jobApps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/recent", async (req, res) => {
  try {
    const jobs = [SummerJob, OffseasonJob, NewGradJob];
    const recentJobs = {};

    for (const jobModel of jobs) {
      const jobDocuments = await jobModel
        .find()
        .sort({ datePosted: -1 })
        .limit(3);
      recentJobs[jobModel.modelName] = jobDocuments;
    }

    res.json(recentJobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting jobs" });
  }
});

async function addJobToDatabase(jobData, JobModel) {
  let isAdded = false;

  try {
    const existingJob = await JobModel.findOne({
      applicationLink: jobData.applicationLink,
      role: jobData.role,
    });

    if (!existingJob) {
      const newJob = new JobModel(jobData);
      await newJob.save();
      console.log("Added a new job to the database:", newJob);
      isAdded = true;
    } else {
      console.log("Job already exists:", existingJob);
    }
  } catch (error) {
    console.error("Error adding job to the database:", error);
  }

  return isAdded;
}

async function updateJobs(season, model) {
  const data = await fetchInternships(season);
  let isAdded = true;

  for (let i = 0; i < data.length; i++) {
    isAdded = await addJobToDatabase(data[i], model);

    if (!isAdded) {
      break;
    }
  }
}

const job = schedule.scheduleJob("*/30 * * * * ", async function () {
  await updateJobs("Summer", SummerJob);
  await updateJobs("Offseason", OffseasonJob);
});
