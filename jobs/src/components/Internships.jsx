import React, { useEffect, useRef, useState } from "react";
import DashNav from "./DashNav";
import UpdatedJob from "./UpdatedJob";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api";
import { useDebounce } from "@uidotdev/usehooks";

const Jobs = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [searchName, setSearchName] = useState("");
  const debouncedSearch = useDebounce(searchName, 500);
  const [season, setSeason] = useState("summer");
  const [sortBy, setSortBy] = useState("recent");

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [debouncedSearch, season, sortBy],
      async ({ pageParam = 1 }) => {
        const response = await fetchJobs(
          season,
          pageParam - 1,
          searchName,
          sortBy
        );
        return response;
      },
      {
        getNextPageParam: (_, pages) => {
          if (pages.length) {
            if (pages[pages.length - 1].data.length != 8) {
              return undefined;
            }
          }

          return pages.length + 1;
        },
        initialData: {
          pages: [],
          pageParams: [1],
        },
      }
    );

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortBy(selectedSort);
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setSeason(selectedFilter);
  };

  return (
    <div className="mx-auto mt-12 sm:p-12 p-6 pt-24 sm:pt-12 w-[100%]">
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
            <option value="recent" className="bg-primary">
              Recent
            </option>
            <option value="oldest" className="bg-primary">
              Oldest
            </option>
          </select>
        </div>
        <div className="relative w-1/2">
          <label className="text-white">Job Type:</label>
          <select
            className="block mt-1 bg-primary p-4 outline-none text-white shadow w-full bg__gradient border border-secondary rounded-md"
            value={season}
            onChange={handleFilterChange}
          >
            <option value="summer" className="bg-primary">
              Summer Internships
            </option>
            <option value="offseason" className="bg-primary">
              Offseason Internships
            </option>
            <option value="newgrad" className="bg-primary">
              New Grad Roles
            </option>
          </select>
        </div>
      </div>
      <div className="w-[100%] flex flex-col my-4 gap-4">
        {data.pages.map((page, pageIndex) =>
          page.data.map((job, index) => (
            <UpdatedJob key={index} stats={job} id={user._id} />
          ))
        )}
        {hasNextPage && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="rounded-md btn__gradient2 text-[14px]"
            >
              {isFetchingNextPage ? "Loading More..." : "Nothing more to load"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
