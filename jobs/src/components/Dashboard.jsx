import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../constants/logo.png";
import DashNav from "./DashNav";
import JobCard from "./JobCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const data = [
    {
      company: "ABC Tech",
      role: "Software Engineer",
      location: "San Francisco, CA",
      applicationLink: "https://www.abctech.com/careers/software-engineer",
      datePosted: "2023-08-20",
      season: "Offseason",
    },
    {
      company: "XYZ Solutions",
      role: "Product Manager",
      location: "New York, NY",
      applicationLink: "https://www.xyzsolutions.com/careers/product-manager",
      datePosted: "2023-08-15",
      season: "Summer",
    },
    {
      company: "123 Innovations",
      role: "Data Scientist",
      location: "Chicago, IL",
      applicationLink: "https://www.123innovations.net/careers/data-scientist",
      datePosted: "2023-08-10",
      season: "Offseason",
    },
  ];

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="flex flex-row">
      <DashNav selected={"Dashboard"}></DashNav>
      <div className="mx-auto mt-12">
        <div className="text-white font-semibold text-[3em] mb-4">
          Welcome Back
        </div>
        <div className="text-white font-medium text-[1.3em]">
          Recent Summer Internship Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
        <div className="text-white font-medium text-[1.3em]">
          Recent Offseason Internship Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
        <div className="text-white font-medium text-[1.3em] mt-12">
          Recent New Grad Positions
        </div>
        <div className="flex flex-wrap my-4 gap-4">
          {data.map((stats, index) => (
            <JobCard key={index} stats={stats} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
