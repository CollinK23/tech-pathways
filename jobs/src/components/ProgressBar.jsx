import React from "react";

const ProgressBar = ({ checkpoints, stats }) => {
  return (
    <div>
      {stats.dateOffer != null ? (
        <div className="flex sm:space-x-12 space-x-8">
          {checkpoints
            .filter((checkpoint) => checkpoint.name !== "Rejected")
            .map((checkpoint, index) => (
              <div key={index} className="flex flex-col items-center w-[50px]">
                <div className="w-8 h-8 bg-green-400 rounded-full mb-1" />
                <div className="text-xs text-white">{checkpoint.name}</div>
                <div className="text-xs text-gray-400">
                  {checkpoint.date
                    ? new Date(checkpoint.date).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))}
        </div>
      ) : stats.dateRejected != null ? (
        <div className="flex sm:space-x-12 space-x-8">
          {checkpoints
            .filter((checkpoint) => checkpoint.name !== "Offer")
            .map((checkpoint, index) => (
              <div key={index} className="flex flex-col items-center w-[50px]">
                <div className="w-8 h-8 bg-red rounded-full mb-1" />
                <div className="text-xs text-white">{checkpoint.name}</div>
                <div className="text-xs text-gray-400">
                  {checkpoint.date
                    ? new Date(checkpoint.date).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex sm:space-x-12 space-x-8">
          {checkpoints
            .filter((checkpoint) => checkpoint.name !== "Rejected")
            .map((checkpoint, index) => (
              <div key={index} className="flex flex-col items-center w-[50px]">
                {checkpoint.date != null ? (
                  <div className="w-8 h-8 bg-blue rounded-full mb-1" />
                ) : (
                  <div className="w-8 h-8 bg-grey rounded-full mb-1" />
                )}
                <div className="text-xs text-white">{checkpoint.name}</div>
                <div className="text-xs text-gray-400">
                  {checkpoint.date
                    ? new Date(checkpoint.date).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
