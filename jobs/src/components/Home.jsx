import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [initialData, setInitialData] = useState([]);

  // function mostRecent(inputDate) {
  //   const parsedInputDate = new Date(inputDate);
  //   const currentDate = new Date();

  //   const timeDifference = currentDate - parsedInputDate;

  //   return timeDifference < 48 * 60 * 60 * 1000;
  // }

  return (
    <div>
      <section className="bg-primary max-h-screen min-h-screen flex flex-col items-center justify-center grid__bg -mt-[50px]">
        <div className=" text-center max-w-[1100px] text-white">
          <p className="text-[5em] font-semibold leading-tight my-12 text__shadow">
            {/* Discover Tech <span className="text__gradient">Internships</span> and
          <span className="text__gradient"> New Grad</span> Roles */}
            Discover Tech Internships and New Grad Roles
          </p>
          <Link to="/summer" className="px-4 py-2 m-4 rounded-md btn__gradient">
            View Recently Opened Positions
          </Link>
        </div>
      </section>
      {/* <div className="flex flex-wrap mt-[50px] max-w-[1200px] mx-auto">
        <div className="text-[5em] font-semibold text-white leading-tight my-12 text__shadow">
          Recently Opened Positions
        </div>
        <div></div>
      </div> */}
    </div>
  );
};

export default Home;
