import React from "react";
import Card from "../utils/Card";
import { useGetArticlesForIssueQuery } from "../store/api/articleApi";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const VolumeArticles = () => {
  const { volumeNumber, issueNumber } = useParams();

  const { data, isLoading, isError, error, isSuccess } =
    useGetArticlesForIssueQuery({
      volumeNumber,
      issueNumber,
    });

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  let articles=[], sortedArticles=[];
  if (isSuccess) {
    articles = data.articles || [];
    sortedArticles = [...(articles || [])];
    sortedArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="min-h-screen m-5">
          <div className="flex flex-col my-4">
            <h1 className="p-4 bg-primary h-[50px] text-center  rounded-lg">
              Volume : {volumeNumber} Issue : {issueNumber}
            </h1>
          </div>
          <div className="flex flex-wrap volumes m-6">
            {sortedArticles ? (
              sortedArticles.map((article, index) => (
                <Card
                  key={index}
                  name={article.title}
                  description={article.description}
                  author={article.author ? article.author.name : "Anonymous"}
                  url={article.pdfFile}
                />
              ))
            ) : (
              <div className="p-4 m-2 card-gradient">
                <h1 className="text-3xl">No Articles Published.</h1>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

// http://localhost:4000/api/v1/articles/volume/1/2
export default VolumeArticles;
