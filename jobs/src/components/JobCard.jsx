import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ stats }) => {
  return (
    <div className="w-[350px] bg-primary rounded-md shadow">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-[20px] text-white">{stats.role}</div>
          <div className="text-right text-white text-[12px] bg-grey rounded-md py-1 px-2">
            {stats.season}
          </div>
        </div>
        <div className="font-medium text-[16px] text-white">
          {stats.company}
        </div>
        <div className="text-[14px] text-gray-400">{stats.location}</div>
        <div className="mt-10 space-x-2 flex justify-end">
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
