import React from "react";
import ProgressBar from "./ProgressBar";

const AppProgress = ({ stats }) => {
  const checkpoints = [
    { name: "Applied", date: stats.dateApplied },
    { name: "Screened", date: stats.dateScreen },
    { name: "Interview", date: stats.dateInterview },
    { name: "Offer", date: stats.dateOffer },
    { name: "Rejected", date: stats.dateRejected },
  ];

  return (
    <div className="bg-primary w-full rounded-md p-4">
      <div className="flex sm:flex-row flex-col items-center justify-between">
        <div className="flex flex-col w-[100%] sm:mb-0 mb-4">
          <div className="font-bold text-[100%] text-white">
            {stats.jobTitle}
          </div>
          <div className="font-medium text-[16px] text-white">
            {stats.company}
          </div>
          <div className="text-[14px] text-gray-400">
            {stats.location.length > 120
              ? "Multiple Locations"
              : stats.location}
          </div>
        </div>
        <ProgressBar checkpoints={checkpoints} stats={stats} />
      </div>
    </div>
  );
};

export default AppProgress;
