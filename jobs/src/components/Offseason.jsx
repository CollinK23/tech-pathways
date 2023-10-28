import React, { useEffect, useState } from "react";
import Job from "./Job";
import {
  softwareIntern,
  dataAnalystIntern,
  software2023Intern,
  dataScientistIntern,
} from "../constants/salary";

const Offseason = () => {
  const [initialData, setInitialData] = useState(null);

  const fixDate = (text) => {
    let result = text;
    if (isNaN(parseInt(text[text.length - 1]))) {
      result = result + " 01";
    }
    return result;
  };

  const extractTextBetweenBrackets = (text) => {
    const regex = /\[(.*?)\]/;
    const match = regex.exec(text);
    return match ? match[1] : text;
  };

  const findSalaryByCompanyName = (companyName, role) => {
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

  const fetchData = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_OFFSEASON);
      const textData = await response.text();

      const jobRegex =
        /\| \*\*(.*?)\*\* \| (.*?) \| (.*?) \| <a href="(.*?)">.*<\/a> \| (.*?) \|\n/g;
      const internshipData = [];

      let match;

      while ((match = jobRegex.exec(textData))) {
        const company = extractTextBetweenBrackets(match[1].trim());
        const role = match[2].trim();
        const location = match[3].trim();
        const applicationLink = match[4].trim();
        const datePosted = fixDate(match[5].trim());
        const salary = findSalaryByCompanyName(company, role);

        internshipData.push({
          company,
          role,
          location,
          applicationLink,
          datePosted,
          salary,
        });
      }
      setInitialData(internshipData);
    } catch (error) {
      console.error("Error reading data from file:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setJsonData(initialData);
  }, [initialData]);

  const [jsonData, setJsonData] = useState(initialData);
  const [sortBySalary, setSortBySalary] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const sortJobsBySalary = () => {
    const sortedData = [...jsonData].sort((a, b) => {
      if (a.salary === "N/A" && b.salary === "N/A") {
        return 0;
      } else if (a.salary === "N/A") {
        return 1;
      } else if (b.salary === "N/A") {
        return -1;
      } else {
        const salaryComparison = parseFloat(b.salary) - parseFloat(a.salary);

        if (sortBySalary) {
          return salaryComparison; // Ascending sorting
        } else {
          return -salaryComparison; // Descending sorting
        }
      }
    });

    setSortBySalary(!sortBySalary);
    setJsonData(sortedData);
  };
  const sortJobsByDate = () => {
    const sortedData = [...jsonData].sort((a, b) => {
      const dateA = new Date(a.datePosted);
      const dateB = new Date(b.datePosted);

      return sortByDate ? dateA - dateB : dateB - dateA;
    });

    setSortByDate(!sortByDate);
    setJsonData(sortedData);
  };

  const [searchName, setSearchName] = useState("");

  return jsonData === null ? (
    <div className="bg-secondary h-screen grid__bg"></div>
  ) : (
    <section className="bg-primary max-h-screen min-h-screen flex justify-center grid__bg -mt-[50px]">
      <div className="text-center text-white">
        <p className="text-[4em] font-bold leading-tight mt-48">
          Offseason Internships
        </p>
        <div className="m-6">
          <form action="/search" method="get">
            <input
              type="text"
              placeholder="Search For Roles, Companies, Locations"
              className="max-w-[800px] w-[100%] h-[48px] bg-primary m-8 px-4 shadow outline-none"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            ></input>
          </form>
          <div className="mb-4">
            <table className="w-[1300px] shadow">
              <thead>
                <tr className="text-left text-[16px] text-white bg-grey">
                  <th className="p-4">Company</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">
                    Salary{" "}
                    <button className="text-white" onClick={sortJobsBySalary}>
                      {sortBySalary ? "▲" : "▼"}
                    </button>
                  </th>
                  <th className="p-4">
                    Date Posted{" "}
                    <button className="text-white" onClick={sortJobsByDate}>
                      {sortByDate ? "▲" : "▼"}
                    </button>
                  </th>
                  <th className="p-4">Apply</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.map((job, index) =>
                  job.company
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) ||
                  job.role.toLowerCase().includes(searchName.toLowerCase()) ||
                  job.location
                    .toLowerCase()
                    .includes(searchName.toLowerCase()) ? (
                    <Job key={index} job={job} />
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offseason;
