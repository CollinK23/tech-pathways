import { React, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { updateApp, deleteApp } from "../api";

const AppProgress = ({ stats, id }) => {
  const [applied, setApplied] = useState(stats.dateApplied);
  const [screened, setScreened] = useState(stats.dateScreen);
  const [interview, setInterview] = useState(stats.dateInterview);
  const [offer, setOffer] = useState(stats.dateOffer);
  const [reject, setReject] = useState(stats.dateRejected);
  const [isDeleted, setIsDeleted] = useState(false);

  const checkpoints = [
    { name: "Applied", date: applied },
    { name: "Screened", date: screened },
    { name: "Interview", date: interview },
    { name: "Offer", date: offer },
    { name: "Rejected", date: reject },
  ];

  const appData = {
    _id: stats._id,
    user: id,
    company: stats.company,
    location: stats.location,
    jobTitle: stats.role,
    applicationLink: stats.applicationLink,
    season: stats.season,
    dateApplied: applied,
    dateScreen: screened,
    dateInterview: interview,
    dateOffer: offer,
    dateRejected: reject,
  };

  const [updateStatus, setUpdateStatus] = useState("applied");
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];

  const [date, setDate] = useState(currentDate);

  const [open, setOpen] = useState(false);

  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setUpdateStatus(selectedStatus);
  };

  const handleUpdateApp = async () => {
    try {
      const parsedDate = new Date(date);
      if (updateStatus === "applied") {
        setApplied(parsedDate);
        setScreened(null);
        setInterview(null);
        setOffer(null);
        setReject(null);
        appData.dateApplied = parsedDate.toISOString();
        appData.dateScreen = null;
        appData.dateInterview = null;
        appData.dateOffer = null;
        appData.dateRejected = null;
      } else if (updateStatus === "screened") {
        setScreened(parsedDate);
        setInterview(null);
        setOffer(null);
        setReject(null);
        appData.dateScreen = parsedDate.toISOString();
        appData.dateInterview = null;
        appData.dateOffer = null;
        appData.dateRejected = null;
      } else if (updateStatus === "interview") {
        setInterview(parsedDate);
        setOffer(null);
        setReject(null);
        appData.dateInterview = parsedDate.toISOString();
        appData.dateOffer = null;
        appData.dateRejected = null;
      } else if (updateStatus === "offer") {
        setOffer(parsedDate);
        setReject(null);
        appData.dateOffer = parsedDate.toISOString();
        appData.dateRejected = null;
      } else if (updateStatus === "reject") {
        setReject(parsedDate);
        setOffer(null);
        appData.dateRejected = parsedDate.toISOString();
        appData.dateOffer = null;
      }

      const { data } = await updateApp(stats._id, appData);
    } catch (error) {
      console.error("Error updating app:", error);
    }
  };

  const handleDeleteApp = async () => {
    setIsDeleted(true);
    await deleteApp(stats._id, appData);
  };

  return (
    <div>
      {!isDeleted ? (
        <div className="bg-white w-[100%] rounded-md border border-secondary rounded-md">
          <div className="relative flex md:flex-row flex-col items-center justify-between p-4 md:space-x-8 md:space-y-0 space-y-4">
            <div className="flex flex-col w-[100%] md:mb-0 mb-4">
              <div className="font-bold text-[16px] text-darkGrey">
                {stats.jobTitle}
              </div>
              <div className="font-medium text-[16px] text-darkGrey">
                {stats.company}
              </div>
              <div className="text-[14px] text-grey">
                {stats.location.length > 120
                  ? "Multiple Locations"
                  : stats.location}
              </div>
            </div>
            <ProgressBar checkpoints={checkpoints} stats={stats} />
            {open ? (
              <i
                className="absolute sm:relative top-0 right-0 px-4 fa-solid fa-xmark text-grey text-[16px] cursor-pointer"
                onClick={() => setOpen(!open)}
              ></i>
            ) : (
              <i
                className="absolute sm:relative top-0 right-0 px-4 fa-solid fa-bars text-grey text-[20px] cursor-pointer"
                onClick={() => setOpen(!open)}
              ></i>
            )}
          </div>
          {open ? (
            <div className="w-[100%] h-[100%] bg-primary p-4 ">
              <div className="space-y-8">
                <div className="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4">
                  <div className="flex flex-col flex-grow">
                    <label className="text-darkGrey pb-2 font-semibold">
                      Update Status:
                    </label>
                    <select
                      className="h-[60px] bg-white p-4 outline-none text-darkGrey w-full border border-secondary rounded-md"
                      value={updateStatus}
                      onChange={handleStatusChange}
                    >
                      <option value="applied" className="bg-white">
                        Applied
                      </option>
                      <option value="screened" className="bg-white">
                        Screened
                      </option>
                      <option value="interview" className="bg-white">
                        Interview
                      </option>
                      <option value="offer" className="bg-white">
                        Offer
                      </option>
                      <option value="reject" className="bg-white">
                        Reject
                      </option>
                    </select>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <label className="text-darkGrey pb-2 font-semibold">
                      Date:
                    </label>
                    <input
                      type="date"
                      className="h-[60px] bg-white p-4 outline-none text-darkGrey w-full  border border-secondary rounded-md"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap justify-end space-x-4">
                  <button
                    type="button"
                    className="md:px-16 rounded-md btn__gradient text-[14px]"
                    onClick={handleUpdateApp}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="md:px-16 rounded-md white__btn text-[14px]"
                    onClick={handleDeleteApp}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AppProgress;
