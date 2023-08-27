import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import JobApp from "./models/jobApp.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.get("/", async (req, res) => {
  try {
    const jobApps = await JobApp.find();
    console.log(jobApps);

    res.status(200).json(jobApps);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.post("/", async (req, res) => {
  const body = req.body;

  const newApp = new JobApp(body);
  try {
    await newApp.save();

    res.status(201).json(newApp);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
