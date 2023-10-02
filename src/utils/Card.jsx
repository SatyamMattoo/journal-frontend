import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  heading,
  name,
  volumeNo,
  issues,
  edition,
  email,
  department,
  description,
  author,
  date,
  year,
  url,
}) => {
  const dateString = new Date(date);

  const years = dateString.getFullYear();
  const month = dateString.getMonth() + 1;
  const day = dateString.getDate();
  // const hours = dateString.getHours();
  // const minutes = dateString.getMinutes();
  // const seconds = dateString.getSeconds();

  const formattedDate = `${day}-${month}-${years}`;
  return (
    <div className="m-1 card-gradient p-2 rounded-[20px] flex flex-col items-center justify-center">
      <div className="rounded-[20px] p-2 md:py-5 md:px-12 h-[10%] flex justify-evenly flex-col ">
        <div className="text-start flex flex-col">
          {/* volumes */}
          {volumeNo ? <h1 className="text-xl md:text-2xl">Volume - {volumeNo}</h1> : <></>}
          {issues ? (
            issues.map((issue, issueIndex) => (
              <div key={issueIndex}>
                <h3 className="text-lg md:text-2xl">Issue {issue.issueNumber}</h3>
              </div>
            ))
          ) : (
            <></>
          )}

          {heading ? <h1 className="text-xl md:text-2xl">{heading}</h1> : <></>}

          {name ? <h1 className="text-xl md:text-2xl">Name: {name}</h1> : <></>}
          {description ? <p className="text-lg md:text-xl"> {description}</p> : <></>}
          <br />
          {author ? <p className="text-lg md:text-xl">Author: {author}</p> : <></>}
          {year ? <p className="text-lg md:text-xl">Published in: {year}</p> : <></>}
          {date ? <p className="text-base md:text-xl">Published on: {formattedDate}</p> : <></>}
          {edition ? <h2 className="text-lg md:text-xl">{edition}</h2> : <></>}
          {email ? <h2 className="text-lg md:text-xl">Email: {email}</h2> : <></>}
          {department ? <h2 className="text-lg md:text-xl">Department: {department}</h2> : <></>}
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-center w-full"
            >
              <button className="bg-primary self-center py-2 px-4 rounded-lg mt-2 hover:bg-secondary w-full">
                View
              </button>
            </a>
          ) : (
            <></>
          )}
          {issues ? (
            issues.map((issue, index) => (
              <Link
                key={index}
                to={`/articles/volume/${volumeNo}/${issue.issueNumber}`}
                className="p-2 bg-primary rounded-lg mt-6 text-center"
              >
                View Articles
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
