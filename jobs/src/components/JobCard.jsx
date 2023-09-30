import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ stats }) => {
  return (
    <div className="block sm:w-[350px] w-[100%] h-[250px] bg-primary rounded-md shadow relative bg__gradient border border-secondary z-0">
      <div className="p-4">
        <div className="font-bold text-[100%] text-white">{stats.role}</div>
        <div className="font-medium text-[16px] text-white">
          {stats.company}
        </div>
        <div className="text-[14px] text-gray-400">
          {stats.location.length > 30 ? "Multiple Locations" : stats.location}
        </div>
        <div className="flex flex-row space-x-2 mt-2">
          <div className="text-white inline-block text-[12px] bg-grey rounded-md py-1 px-2">
            {stats.season}
          </div>
          {stats.salary === "N/A" ? null : (
            <div className="text-white inline-block text-[12px] bg-grey rounded-md py-1 px-2">
              ${stats.salary} / Hr
            </div>
          )}
        </div>
        <div className="w-[100%] absolute bottom-0 pb-6 space-x-2">
          <Link
            to={stats.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md btn__gradient text-[14px]"
          >
            Apply
          </Link>
          <Link
            to={stats.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md white__btn text-[14px]"
          >
            Add To Applications
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
