import {
  findSalaryByCompanyName,
  fixDate,
  extractTextBetweenBrackets,
  convertDateFormat,
  extractLocation,
  extractTextBetweenParentheses,
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
    let prevName = "";

    while ((match = jobRegex.exec(textData))) {
      const company = extractTextBetweenBrackets(match[1].trim());
      const role = match[2].trim();
      const location = extractLocation(match[3].trim());
      const applicationLink = match[4].trim();
      const datePosted = convertDateFormat(fixDate(match[5].trim()));

      if (company === "↳") {
        company = prevName;
      }

      prevName = company;

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
          season,
        });
      }
    }
    return internshipData;
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};

export const fetchNewGrad = async () => {
  try {
    const response = await fetch(process.env.NEWGRAD_ENDPOINT);
    const textData = await response.text();

    const jobStartIndex = textData.indexOf("| Name ");
    const jobEntries = textData.substring(jobStartIndex);

    const jobRegex =
      /\| \[(.*?)\]\((.*?)\) \| ((?:.*? <br>)*.*?) \| (.*?) \| (.*?) \| (.*?) \|/g;
    const internshipData = [];

    let match;

    while ((match = jobRegex.exec(jobEntries))) {
      const companyName = extractTextBetweenBrackets(match[1].trim());
      const rolesRaw = match[4].trim();
      const roles = rolesRaw.split("<br>").map((role) => role.trim());
      const datePosted = fixDate(match[6].trim());

      const location = match[3].trim();
      const season = "New Grad";

      if (match[6] == "-") {
        break;
      }

      roles.forEach((role) => {
        const applicationLink = extractTextBetweenParentheses(role);
        const roleFixed = extractTextBetweenBrackets(role);

        if (applicationLink[0] === "h" && roleFixed !== "Closed") {
          internshipData.push({
            company: extractTextBetweenBrackets(companyName),
            role: roleFixed,
            location: location,
            applicationLink,
            datePosted: datePosted,
            season,
          });
        }
      });
    }
    return internshipData;
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
};
