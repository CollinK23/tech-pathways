import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ stats }) => {
  return (
    <div className="block sm:w-[350px] w-[100%] h-[250px] bg-white rounded-md  border border-secondary">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="font-bold text-[100%] text-black">{stats.role}</div>
          <div className="font-medium text-[16px] text-black">
            {stats.company}
          </div>
          <div className="text-[14px] text-grey">
            {stats.location.length > 30 ? "Multiple Locations" : stats.location}
          </div>
          <div className="flex flex-row space-x-2 mt-2">
            <div className="text-grey inline-block text-[12px] bg-primary border border-secondary rounded-md py-1 px-2">
              {stats.season}
            </div>
            {stats.salary === "N/A" ? null : (
              <div className="text-grey inline-block text-[12px] bg-primary border border-secondary rounded-md py-1 px-2">
                ${stats.salary} / Hr
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            to={stats.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md btn__gradient text-[14px] bg__gradient3"
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
