import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../constants/logo.png";
import DashNav from "./DashNav";
import JobCard from "./JobCard";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecent } from "../api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryFn: () => fetchRecent(),
    queryKey: ["recents"],
  });

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="mx-auto mt-12 sm:p-12 p-6 pt-24 sm:pt-12">
      {/* <div className="glow1 hidden sm:flex"></div> */}
      <div className="w-[100%] text-black font-semibold sm:text-[64px] text-[48px] mb-4 sub__text">
        Dashboard
      </div>
      <div className="flex sm:flex-wrap  p-4 justify-between text-black w-full bg-white border border-secondary rounded-md">
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">Summer Internships</div>
          <div className="text-[32px] font-semibold">
            {data?.data.SummerJob.count}
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">Offseason Internships</div>
          <div className="text-[32px] font-semibold">
            {data?.data.OffseasonJob.count}
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">New Grad Jobs</div>
          <div className="text-[32px] font-semibold">
            {data?.data.NewGradJob.count}
          </div>
        </div>
      </div>

      <div className="text-black font-semibold text-[24px] mt-8">
        Recent Summer Internship Positions
      </div>
      <div className="flex flex-wrap my-4 mb-8 gap-4 w-[100%]">
        {data?.data.SummerJob.documents.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
      <div className="text-black font-semibold text-[24px]">
        Recent Offseason Internship Positions
      </div>
      <div className="flex flex-wrap my-4 mb-8 gap-4">
        {data?.data.OffseasonJob.documents.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
      <div className="text-black font-semibold text-[24px] mt-12">
        Recent New Grad Positions
      </div>
      <div className="flex flex-wrap my-4 gap-4">
        {data?.data.NewGradJob.documents.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
