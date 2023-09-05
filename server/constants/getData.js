import {
  findSalaryByCompanyName,
  fixDate,
  extractTextBetweenBrackets,
  convertDateFormat,
  extractLocation,
} from "./cleandata.js";
import dotenv from "dotenv";
dotenv.config();

export const fetchInternships = async (season) => {
  try {
    let endpoint;

    if (season === "Summer") {
      endpoint = process.env.SUMMER_ENDPOINT;
    } else if (season === "Offseason") {
      endpoint = process.env.OFFSEASON_ENDPOINT;
    }

    const response = await fetch(endpoint);
    const textData = await response.text();

    const jobRegex =
      /\| \*\*(.*?)\*\* \| (.*?) \| (.*?) \| <a href="(.*?)">.*<\/a> \| (.*?) \|\n/g;
    const internshipData = [];

    let match;

    while ((match = jobRegex.exec(textData))) {
      const company = extractTextBetweenBrackets(match[1].trim());
      const role = match[2].trim();
      const location = extractLocation(match[3].trim());
      const applicationLink = match[4].trim();
      const datePosted = convertDateFormat(fixDate(match[5].trim()));
      const salary = findSalaryByCompanyName(company, role);

      if (
        company != "Fyusion" ||
        role != "Computer Vision Intern - Deep Learning"
      ) {
        internshipData.push({
          company,
          role,
          location,
          applicationLink,
          datePosted,
          salary,
          season,
        });
      }
    }
    return internshipData;
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};
