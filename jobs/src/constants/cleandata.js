import {
  softwareIntern,
  dataAnalystIntern,
  software2023Intern,
  dataScientistIntern,
} from "./salary";

export const fixDate = (text) => {
  let result = text;
  if (isNaN(parseInt(text[text.length - 1]))) {
    result = result + " 01";
  }
  return result;
};

export const extractTextBetweenBrackets = (text) => {
  const regex = /\[(.*?)\]/;
  const match = regex.exec(text);
  return match ? match[1] : text;
};

export const findSalaryByCompanyName = (companyName, role) => {
  companyName = companyName.toLowerCase();
  if (
    (typeof softwareIntern[0][companyName] === "number") &
    role.toLowerCase().includes("software")
  ) {
    return `${softwareIntern[0][companyName].toFixed(2)}`;
  } else if (
    (typeof dataAnalystIntern[0][companyName] === "number") &
    role.toLowerCase().includes("analyst")
  ) {
    return `${dataAnalystIntern[0][companyName].toFixed(2)}`;
  } else if (
    (typeof dataScientistIntern[0][companyName] === "number") &
    role.toLowerCase().includes("scien")
  ) {
    return `${dataScientistIntern[0][companyName].toFixed(2)}`;
  } else if (
    (typeof software2023Intern[0][companyName] === "number") &
    role.toLowerCase().includes("software")
  ) {
    return `${software2023Intern[0][companyName].toFixed(2)}`;
  } else {
    return "N/A";
  }
};

export function convertDateFormat(inputDate) {
  const monthAbbreviations = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [monthAbbrev, day] = inputDate.split(" ");

  const month = monthAbbreviations[monthAbbrev];

  const currentYear = new Date().getFullYear();

  const formattedDate = `${month}/${day}/${currentYear}`;

  return formattedDate;
}

export const extractLocation = (text) => {
  const regexTags = /<[^>]+>|<\/[^>]+>/g;
  const regexLineBreaks = /<br\s*\/?>|<\/br>/gi;
  const removedTags = text.replace(regexLineBreaks, ", ");
  const result = removedTags.replace(regexTags, "");
  return result;
};
