import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createApp } from "../actions/posts";

const UpdatedJob = ({ stats, id }) => {
  const appData = {
    user: id,
    company: stats.company,
    location: stats.location,
    jobTitle: stats.role,
    applicationLink: stats.applicationLink,
    season: stats.season,

    dateApplied: new Date(),
    datePosted: null,
    dateScreen: null,
    dateInterview: null,
    dateOffer: null,
    dateRejected: null,
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createApp(appData));
  };

  const date = new Date(stats.datePosted);

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="w-full rounded-md p-4 flex items-center justify-between bg__gradient border border-secondary rounded-md">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="font-bold text-[100%] text-white">{stats.role}</div>
          <div className="font-medium text-[16px] text-white">
            {stats.company}
          </div>
          <div className="text-[14px] text-gray-400">
            {stats.location.length > 120
              ? "Multiple Locations"
              : stats.location}
          </div>
          <div className="flex flex-row space-x-2 mt-2">
            <div className="text-white inline-block text-[12px] bg-grey rounded-md py-1 px-2">
              {formattedDate}
            </div>
            <div className="text-white inline-block text-[12px] bg-grey rounded-md py-1 px-2">
              {stats.season}
            </div>
            {stats.salary === "N/A" ? null : (
              <div className="text-white inline-block text-[12px] bg-grey rounded-md py-1 px-2">
                ${stats.salary} / Hr
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-2  items-end">
        <Link
          to={stats.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md btn__gradient2 text-[14px]"
        >
          Apply
        </Link>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md white__btn2 text-[14px]"
        >
          Add To Applications
        </button>
      </div>
    </div>
  );
};

export default UpdatedJob;
