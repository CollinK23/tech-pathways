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
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-12 sm:p-12 p-6 pt-24 sm:pt-12">
      <div className="w-[100%] text-white font-semibold text-[64px] mb-4">
        Dashboard
      </div>
      <div className="text-white font-medium text-[24px]">
        Recent Summer Internship Positions
      </div>
      <div className="flex flex-wrap my-4 mb-8 gap-4 w-[100%]">
        {data?.data.SummerJob.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
      <div className="text-white font-medium text-[24px]">
        Recent Offseason Internship Positions
      </div>
      <div className="flex flex-wrap my-4 mb-8 gap-4">
        {data?.data.OffseasonJob.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
      <div className="text-white font-medium text-[24px] mt-12">
        Recent New Grad Positions
      </div>
      <div className="flex flex-wrap my-4 gap-4">
        {data?.data.NewGradJob.map((stats, index) => (
          <JobCard key={index} stats={stats} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
