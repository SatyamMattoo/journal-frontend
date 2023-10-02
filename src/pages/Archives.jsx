import React from "react";
import Card from "../utils/Card";
import { useGetPublishedArticlesQuery } from "../store/api/articleApi";
import Loader from "../components/Loader";

const Archives = () => {
  // Articles
  const { data, error, isLoading, isSuccess } = useGetPublishedArticlesQuery();

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
              Articles
            </h1>
            <div className="flex flex-wrap m-2">
              {sortedArticles.length > 0 ? (
                sortedArticles.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      heading={item.title}
                      description={item.description}
                      author={item.author ? item.author.name : "Anonymous"}
                      date={item.createdAt}
                      url={item.pdfFile}
                    />
                  );
                })
              ) : (
                <div className="p-4 m-2 card-gradient">
                  <h1 className="text-3xl">No Articles Published.</h1>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Archives;
