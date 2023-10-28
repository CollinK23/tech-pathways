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
      {/* <div className="glow2 hidden sm:flex"></div> */}
      <div className=" text-darkGrey font-semibold sm:text-[64px] text-[48px] mb-4 sub__text">
        Search For Jobs
      </div>
      <form action="/search" method="get">
        <input
          type="text"
          placeholder="Search For Roles, Companies, Locations"
          className="w-[100%] h-[48px] bg-white px-4 outline-none text-darkGrey border border-secondary rounded-md"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        ></input>
      </form>
      <div className="flex flex-row gap-4 my-4 w-[100%]">
        <div className="w-[50%]">
          <label className="text-darkGrey font-semibold">Sort by:</label>
          <select
            className="block mt-1 bg-white p-4 outline-none text-darkGrey w-full border border-secondary rounded-md"
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
        <div className="w-[50%]">
          <label className="text-darkGrey font-semibold">Job Type:</label>
          <select
            className="block mt-1 bg-white p-4 outline-none text-darkGrey w-full border border-secondary rounded-md"
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
              {isFetchingNextPage ? "Loading More..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
