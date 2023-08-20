import React from "react";
import { Link } from "react-router-dom";

const Job = ({ job }) => {
  const extractLocation = (text) => {
    const regexTags = /<[^>]+>|<\/[^>]+>/g;
    const regexLineBreaks = /<br\s*\/?>|<\/br>/gi;
    const removedTags = text.replace(regexLineBreaks, ", ");
    const result = removedTags.replace(regexTags, "");
    return result;
  };

  const location = extractLocation(job.location);

  return (
    <tr className="bg-primary w-[1000px] h-[100px] text-left my-4 border-b border-grey">
      <td className="p-4 max-w-[500px]">
        <div className="font-bold text-[18px]">{job.company}</div>
        <div className="text-[14px] text-gray-500">{location}</div>
      </td>
      <td className="p-4 font-bold text-[16px]">{job.role}</td>
      <td className="p-4 w-[200px]">
        {job.salary === "N/A" ? "-" : `${job.salary} / Hr`}
      </td>
      <td className="p-4">{job.datePosted}</td>
      <td className="p-4">
        <Link
          to={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md btn__gradient"
        >
          Apply
        </Link>
      </td>
    </tr>
  );
};

export default Job;
