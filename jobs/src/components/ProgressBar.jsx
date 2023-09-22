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
    <div className="flex sm:space-x-12 space-x-8">
      {checkpoints.map((checkpoint, index) => (
        <div key={index} className="flex flex-col items-center w-[50px]">
          <div
            className={`w-8 h-8 rounded-full mb-1 ${
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
          <div className="text-xs text-white">{checkpoint.name}</div>
          <div className="text-xs text-gray-400">
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
