import React from "react";

const ProgressBar = ({ checkpoints }) => {
  // Check if "Rejected" or "Offer" has a date
  const rejectedHasDate = checkpoints.some(
    (checkpoint) => checkpoint.name === "Rejected" && checkpoint.date
  );
  const offerHasDate = checkpoints.some(
    (checkpoint) => checkpoint.name === "Offer" && checkpoint.date
  );

  return (
    <div className="flex sm:space-x-12 space-x-4">
      {checkpoints.map((checkpoint, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`sm:w-8 sm:h-8 w-7 h-7 rounded-full mb-1 ${
              rejectedHasDate
                ? "bg-red"
                : offerHasDate
                ? index < 4
                  ? "bg-green-400"
                  : "bg-grey"
                : checkpoint.date
                ? "bg-blue"
                : "bg-grey"
            }`}
          />
          <div className="sm:w-[70px] sm:text-xs text-[11px] text-white text-center">
            {checkpoint.name}
          </div>
          <div className="sm:w-[70px] sm:text-xs text-[10px] text-gray-400 text-center">
            {checkpoint.date
              ? new Date(checkpoint.date).toLocaleDateString()
              : "-"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
