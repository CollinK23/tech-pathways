import React, { useEffect, useState } from "react";
import DashNav from "./DashNav";
import UpdatedJob from "./UpdatedJob";
import {
  findSalaryByCompanyName,
  fixDate,
  extractTextBetweenBrackets,
  convertDateFormat,
  extractLocation,
} from "../constants/cleandata";

const Jobs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [initialData, setInitialData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SUMMER);
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
        const season = "Summer";

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

  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    sortJobs(selectedSort);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterBy(selectedFilter);
    filterJobs(selectedFilter);
  };

  const sortJobs = (selectedSort) => {
    let sortedData = [...jsonData];

    if (selectedSort === "recent") {
      sortedData = sortedData.sort((a, b) => {
        const dateA = new Date(a.datePosted);
        const dateB = new Date(b.datePosted);
        return dateB - dateA;
      });
    } else if (selectedSort === "oldest") {
      sortedData = sortedData.sort((a, b) => {
        const dateA = new Date(a.datePosted);
        const dateB = new Date(b.datePosted);
        return dateA - dateB;
      });
    }

    setJsonData(sortedData);
  };

  const filterJobs = (selectedFilter) => {
    let filteredData = [...initialData];
    if (selectedFilter === "summer") {
      filteredData = filteredData.filter((job) => job.season === "Summer");
    } else if (selectedFilter === "offseason") {
      filteredData = filteredData.filter((job) => job.season !== "Summer");
    }
    setJsonData(filteredData);
  };

  const [searchName, setSearchName] = useState("");
  return jsonData === null ? (
    <DashNav selected={"Internships"}></DashNav>
  ) : (
    <div className="flex flex-row">
      <DashNav selected={"Internships"}></DashNav>
      <div className="mx-auto mt-12 p-12 w-[1300px]">
        <div className="text-white font-semibold text-[3em] mb-4">
          Search For Internships
        </div>
        <form action="/search" method="get">
          <input
            type="text"
            placeholder="Search For Roles, Companies, Locations"
            className="w-[100%] h-[48px] bg-primary px-4 shadow outline-none text-white"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          ></input>
        </form>
        <div className="flex flex-row gap-4 my-4 w-[100%]">
          <div className="relative w-1/2">
            <label className="text-white">Sort by:</label>
            <select
              className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="relative w-1/2">
            <label className="text-white">Filter by:</label>
            <select
              className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="all">All Internships</option>
              <option value="summer">Summer Internships</option>
              <option value="offseason">Offseason Internships</option>
            </select>
          </div>
        </div>
        <div className="w-[100%] flex flex-col my-4 gap-4">
          {jsonData.map((job, index) =>
            job.company.toLowerCase().includes(searchName.toLowerCase()) ||
            job.role.toLowerCase().includes(searchName.toLowerCase()) ||
            (job.location.toLowerCase().includes(searchName.toLowerCase()) &&
              job.season.toLowerCase().includes(filterBy.toLowerCase())) ? (
              <UpdatedJob key={index} stats={job} id={user._id} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
