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

  console.log(data);

  return (
    <div className="flex flex-row">
      <div className="hidden sm:block">
        <DashNav selected={"Dashboard"}></DashNav>
      </div>
      <div className="mx-auto mt-12">
        <div className="text-white font-semibold text-[3em] mb-4">
          Welcome Back
        </div>
        <div className="text-white font-medium text-[1.3em]">
          Recent Summer Internship Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data?.data.SummerJob.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
        <div className="text-white font-medium text-[1.3em]">
          Recent Offseason Internship Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data?.data.OffseasonJob.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
        <div className="text-white font-medium text-[1.3em] mt-12">
          Recent New Grad Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data?.data.NewGradJob.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
