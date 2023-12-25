import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchRecent } from "../api";
import jobPic from "../constants/job.svg";
import jobPic2 from "../constants/job2.svg";
import jobPic3 from "../constants/job3.svg";
import apps from "../constants/apps.svg";
import blackLogo from "../constants/logo.svg";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchRecent(),
    queryKey: ["recents"],
  });

  return (
    <div>
      <section className=" max-h-screen min-h-screen flex flex-col items-center justify-center -mt-[50px]">
        <div className="py-48 text-center max-w-[1100px] w-[100%] text-darkGrey grid__bg4">
          <p className="w-[100%] px-8 home__text sm:text-[4.5em] text-[54px] leading-tight balance">
            Discover Tech{" "}
            <span className="home__text text__gradient">Internships</span> and
            <span className="home__text text__gradient"> New Grad</span> Roles
          </p>
          <p className="px-8 text-[1.2em] text-grey mx-auto items-center text-black  mb-8 font-medium balance">
            Looking for your dream job? Our platform makes it easier than ever.
            We help you find, apply for, and manage job opportunities
            effortlessly.
          </p>

          <div className="space-x-4 mb-8">
            <Link to="/summer" className="px-4 py-2 rounded-md btn__gradient">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <div className="max-w-[1100px] mx-auto">
        <div className="brick-wall  w-[100%] p-4">
          <div className="brick1 bg-white py-16 sm:px-16 flex sm:flex-row justify-between  rounded-lg border border-secondary border-1.5 grid__bg3">
            <div className="max-w-[400px] w-[100%] sm:text-left text-center">
              <p className=" sub__text sm:text-[3.5em] text-[48px] leading-tight">
                Find Jobs{" "}
                <span className="home__text text__gradient">Anywhere</span>
              </p>
              <p className=" sm:text-[1.2em] text-grey text-black  mb-8 font-medium balance">
                Explore hundreds of the most recent jobs, all in one place.
              </p>
            </div>
            <div className="hidden sm:block mx-auto relative w-[100%] max-w-[500px] h-[300px] hover-container">
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
          <div className="brick2 max-h-[150px] max-w-[1100px] bg-white p-6 flex flex-col flex-auto rounded-lg items-center border border-secondary border-1.5">
            <div className="font-semibold text-[100%]">
              Offseason Internships
            </div>
            <div className="text-[40px] font-semibold">
              {isLoading ? "-" : data?.data.OffseasonJob.count}
            </div>
          </div>
          <div className="brick3 max-h-[150px] max-w-[1100px] bg__gradient3 p-6 flex flex-col flex-auto rounded-lg items-center border border-secondary border-1.5 text-white">
            <div className="font-semibold text-[100%]">Summer Internships</div>
            <div className="text-[40px] font-semibold">
              {isLoading ? "-" : data?.data.SummerJob.count}
            </div>
          </div>

          <div className="brick4 max-h-[150px] max-w-[1100px] bg-white p-6 flex flex-col flex-auto rounded-lg items-center border border-secondary border-1.5">
            <div className="font-medium text-[100%]">New Grad Jobs</div>
            <div className="text-[40px] font-semibold">
              {isLoading ? "-" : data?.data.NewGradJob.count}
            </div>
          </div>
          <div className=" brick5 bg-white border border-secondary py-16 sm:px-16 rounded-lg border-1.5 flex md:flex-row items-center flex-col grid__bg2 mx-auto">
            <div className=" w-[100%]">
              <img src={apps} className=""></img>
            </div>
            <div className="max-w-[400px] md:text-right text-center mx-auto">
              <p className=" sub__text sm:text-[3.5em] text-[40px] leading-tight">
                Easily Manage{" "}
                <span className="home__text text__gradient">Applications</span>
              </p>
              <p className=" sm:text-[1.2em] text-grey mx-auto  text-black  mb-8 font-medium balance">
                Say goodbye to cluttered spreadsheets. Seamlessly organize and
                track your job applications.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-24 flex flex-col mx-auto justify-center max-w-[800px] w-[100%] grid__bg">
        <div className="bg__gradient3 p-8 max-w-[120px] w-[100%] mx-auto rounded-lg shadow">
          <img src={blackLogo}></img>
        </div>
        <div className="my-8 text-center text-[32px] home__text text-darkGrey mx-auto">
          Try TechPathways Today
        </div>
        <div className="mx-auto space-x-4">
          <Link to="/summer" className="px-4 py-2 rounded-md btn__gradient">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
