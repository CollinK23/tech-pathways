import React, { useEffect, useRef, useState } from "react";
import DashNav from "./DashNav";
import UpdatedJob from "./UpdatedJob";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api";
import { useDebounce } from "@uidotdev/usehooks";

const Jobs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [initialData, setInitialData] = useState(null);
  const [searchName, setSearchName] = useState("");
  const debouncedSearch = useDebounce(searchName, 500);
  const [season, setSeason] = useState("summer");

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [debouncedSearch, season],
      async ({ pageParam = 1 }) => {
        const response = await fetchJobs(season, pageParam - 1, searchName);
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

  const [sortBy, setSortBy] = useState("recent");

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
    sortJobs(selectedSort);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSeason(selectedFilter);
  };

  return (
    <div className="flex sm:flex-row">
      <div className="hidden sm:block">
        <DashNav selected={"Internships"}></DashNav>
      </div>
      <div className="mx-auto mt-12 sm:p-12 p-8 w-[1300px]">
        <div className="text-white font-semibold text-[3em] mb-4">
          Search For Jobs
        </div>
        <form action="/search" method="get">
          <input
            type="text"
            placeholder="Search For Roles, Companies, Locations"
            className="w-[100%] h-[48px] bg-primary px-4 shadow outline-none text-white bg__gradient border border-secondary rounded-md"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          ></input>
        </form>
        <div className="flex flex-row gap-4 my-4 w-[100%]">
          <div className="relative w-1/2">
            <label className="text-white">Sort by:</label>
            <select
              className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full bg__gradient border border-secondary rounded-md"
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
              className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full bg__gradient border border-secondary rounded-md"
              value={season}
              onChange={handleFilterChange}
            >
              <option value="summer">Summer Internships</option>
              <option value="offseason">Offseason Internships</option>
            </select>
          </div>
        </div>
        <div className="w-[100%] flex flex-col my-4 gap-4">
          {data.pages.map((page, pageIndex) =>
            page.data.map((job, index) => (
              <UpdatedJob key={index} stats={job} id={user._id} />
            ))
          )}
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="rounded-md btn__gradient2 text-[14px]"
            >
              {isFetchingNextPage
                ? "Loading More..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
