import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecent } from "../api";
import jobPic from "../constants/job.svg";
import jobPic2 from "../constants/job2.svg";
import jobPic3 from "../constants/job3.svg";
import app1 from "../constants/app1.svg";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchRecent(),
    queryKey: ["recents"],
  });

  // function mostRecent(inputDate) {
  //   const parsedInputDate = new Date(inputDate);
  //   const currentDate = new Date();

  //   const timeDifference = currentDate - parsedInputDate;

  //   return timeDifference < 48 * 60 * 60 * 1000;
  // }

  return (
    <div>
      <section className=" max-h-screen min-h-screen flex flex-col items-center justify-center grid__bg -mt-[50px]">
        <div className=" text-center max-w-[1100px] text-darkGrey">
          <p className=" home__text sm:text-[4.5em] text-[64px] leading-tight balance">
            Discover Tech{" "}
            <span className="home__text text__gradient">Internships</span> and
            <span className="home__text text__gradient"> New Grad</span> Roles
            {/* Discover Tech Internships and New Grad Roles */}
          </p>
          <p className=" text-[1.2em] text-grey mx-auto items-center text-black  mb-8 font-medium balance">
            Looking for your dream job? Our platform makes it easier than ever.
            We help you find, apply for, and manage job opportunities
            effortlessly.
          </p>

          <div className="space-x-4 mb-8">
            <Link to="/summer" className="px-4 py-2 rounded-md btn__gradient">
              Get Started
            </Link>
            <Link to="/summer" className="px-4 py-2 rounded-md white__btn">
              View Openings
            </Link>
          </div>
        </div>
      </section>
      <div className="my-48 flex sm:flex-row flex-col justify-between mx-auto max-w-[1100px] w-[100%]">
        <div className="max-w-[400px] w-[100%] sm:text-left text-center">
          <p className=" sub__text sm:text-[3.5em] text-[64px] leading-tight">
            Find Jobs{" "}
            <span className="home__text text__gradient">Anywhere</span>
          </p>
          <p className=" text-[1.2em] text-grey text-black  mb-8 font-medium balance">
            Explore hundreds of the most recent jobs, all in one place.
          </p>
        </div>
        <div className="relative w-[100%] max-w-[500px] h-[300px] hover-container">
          <img
            src={jobPic2}
            className="max-w-[400px] w-[100%] bottom-0 right-0 absolute shadow z-20 rounded-md"
          ></img>
          <img
            src={jobPic}
            className="max-w-[400px] w-[100%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  absolute shadow z-10 rounded-md"
          ></img>
          <img
            src={jobPic3}
            className="max-w-[400px] w-[100%] top-0 left-0 absolute shadow z-0 rounded-md"
          ></img>
        </div>
      </div>
      <div className="my-48 flex sm:flex-row flex-col justify-between mx-auto max-w-[1100px] w-[100%] items-center">
        <div className="relative max-w-[700px] w-[100%] h-[200px] hover-container">
          <img
            src={app1}
            className="max-w-[500px] top-20 left-20 absolute shadow z-20 rounded-md"
          ></img>
          <img
            src={app1}
            className="max-w-[500px] top-10 left-10 absolute shadow z-10 rounded-md"
          ></img>
          <img
            src={app1}
            className="max-w-[500px] top-0 left-0 absolute shadow z-0 rounded-md"
          ></img>
        </div>
        <div className="max-w-[400px] sm:text-right text-center mx-auto">
          <p className=" sub__text sm:text-[3.5em] text-[48px] leading-tight">
            Easily Manage{" "}
            <span className="home__text text__gradient">Applications</span>
          </p>
          <p className=" text-[1.2em] text-grey mx-auto  text-black  mb-8 font-medium balance">
            Say goodbye to cluttered spreadsheets. Seamlessly organize and track
            your job applications.
          </p>
        </div>
      </div>
      {/* <div className="flex sm:flex-wrap max-w-[1100px] mx-auto p-4 justify-between text-darkGrey text-center bg__gradient border border-secondary rounded-md">
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">Summer Internships</div>
          <div className="text-[32px] font-semibold">
            {isLoading ? "-" : data?.data.SummerJob.count}
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">Offseason Internships</div>
          <div className="text-[32px] font-semibold">
            {isLoading ? "-" : data?.data.OffseasonJob.count}
          </div>
        </div>
        <div className="flex flex-col flex-auto">
          <div className="text-grey font-medium">New Grad Jobs</div>
          <div className="text-[32px] font-semibold">
            {isLoading ? "-" : data?.data.NewGradJob.count}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
