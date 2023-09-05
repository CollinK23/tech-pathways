import { React, useState, useEffect } from "react";
import DashNav from "./DashNav";
import AppProgress from "./AppProgress";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchApps } from "../api";
import { useDebounce } from "@uidotdev/usehooks";

const Applications = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [filterBy, setFilterBy] = useState("all");
  const [searchName, setSearchName] = useState("");
  const debouncedSearch = useDebounce(searchName, 500);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [debouncedSearch],
    async ({ pageParam = 1 }) => {
      const response = await fetchApps(user._id, pageParam - 1, searchName);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
    }
  );

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterBy(selectedFilter);
    filterJobs(selectedFilter);
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

  return (
    <div className="flex flex-row">
      <DashNav selected={"Applications"}></DashNav>
      <div className="mx-auto mt-12 p-12 w-[1300px]">
        <div className="text-white font-semibold text-[3em] mb-4">
          Your Applications
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
            <label className="text-white">Filter by:</label>
            <select
              className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full"
              value={filterBy}
              onChange={handleFilterChange}
            >
              <option value="all">All Positions</option>
              <option value="summer">Summer Internships</option>
              <option value="offseason">Offseason Internships</option>
              <option value="new grad">New Grad</option>
            </select>
          </div>
        </div>
        <div className="w-[100%] flex flex-col my-4 gap-4">
          {data.pages.map((page, pageIndex) =>
            page.data.map((job, index) => (
              <AppProgress key={index} stats={job} />
            ))
          )}
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage
              ? "Loading More..."
              : (data.pages.length ?? 0) < 3
              ? "Load More"
              : "noting more to load"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applications;
