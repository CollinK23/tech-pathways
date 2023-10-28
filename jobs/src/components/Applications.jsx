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
  const [lastPageLength, setLastPageLength] = useState(8);
  const debouncedSearch = useDebounce(searchName, 500);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      [debouncedSearch],
      async ({ pageParam = 1 }) => {
        const response = await fetchApps(user._id, pageParam - 1, searchName);
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

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilterBy(selectedFilter);
    filterJobs(selectedFilter);
  };

  return (
    <div className="mx-auto mt-12 sm:p-12 p-6 pt-24 sm:pt-12 w-[100%]">
      {/* <div className="glow2 hidden sm:flex"></div> */}
      <div className="text-darkGrey font-semibold sm:text-[64px] text-[48px] mb-4 sub__text">
        Your Applications
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
          <label className="text-darkGrey font-semibold">Filter by:</label>
          <select
            className="block mt-1 bg-white p-4 outline-none text-darkGrey  w-full border border-secondary rounded-md"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="all" className="bg-primary">
              All Positions
            </option>
            <option value="summer" className="bg-primary">
              Summer Internships
            </option>
            <option value="offseason" className="bg-primary">
              Offseason Internships
            </option>
            <option value="new grad" className="bg-primary">
              New Grad
            </option>
          </select>
        </div>
      </div>
      <div className="w-[100%] flex flex-col my-4 gap-4">
        {data.pages.map((page, pageIndex) =>
          page.data.map((job, index) => (
            <AppProgress key={index} stats={job} id={user._id} />
          ))
        )}
        {hasNextPage && (
          <div className="flex justify-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-md btn__gradient2 text-[14px]"
            >
              {isFetchingNextPage ? "Loading More..." : "Load More"}
            </button>
          </div>
        )}
        {/* {data.map((job, index) => (
            <AppProgress key={index} stats={job} id={user._id} />
          ))} */}
      </div>
    </div>
  );
};

export default Applications;
