import React, { useState } from "react";
import Card from "../utils/Card";
import SendArticle from "../components/modals/SendArticle";
import { useGetAssignedArticlesQuery } from "../store/api/articleApi";
import Loader from "../components/Loader";
import ResubmitArticle from "../components/modals/ResubmitArticle";

const EditorDashboard = () => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isResubmitModalOpen, setIsResubmitModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(false);

  const { data, error, isSuccess, isLoading, refetch } =
    useGetAssignedArticlesQuery();

  let articles = [],
    sortedArticles = [];
  if (isSuccess) {
    articles = data.assignedArticles || [];
    sortedArticles = [...(articles || [])];
    sortedArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const handleAssignClick = (article) => {
    setSelectedArticle(article);
    setIsAssignModalOpen(true);
  };
  const handleResubmitClick = (article) => {
    setSelectedArticle(article);
    setIsResubmitModalOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="min-h-screen bg-secondary bg-opacity-30 p-2">
          <div className="flex flex-col justify-evenly">
            <div className="h-2 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">
              Editor Dashboard
            </h1>
            <div className="w-1/2 h-2 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="flex flex-col justify-evenly items-center m-2">
              <div className="flex p-4 bg-primary w-[90%] h-[70px] justify-center items-center rounded-lg">
                <h1 className="text-center text-2xl">Assigned Articles</h1>
              </div>
              <div className="flex flex-wrap w-[90%] items-center m-10">
                {sortedArticles.length > 0 ? (
                  sortedArticles.map((item, index) => (
                    <div key={index} className="flex flex-col m-2">
                      <Card
                        heading={item.title}
                        description={item.description}
                        author={item.author.name}
                        date={item.createdAt}
                        url={item.pdfFile}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-primary m-2 rounded-full"
                        onClick={() => handleAssignClick(item)}
                      >
                        Ready to Publish
                      </button>
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-primary m-2 rounded-full"
                        onClick={() => handleResubmitClick(item)}
                      >
                        Resubmit
                      </button>
                      <SendArticle
                        isOpen={isAssignModalOpen}
                        onClose={() => setIsAssignModalOpen(false)}
                        id={selectedArticle._id}
                        refresh={refetch}
                      />
                      <ResubmitArticle
                        isOpen={isResubmitModalOpen}
                        onClose={() => setIsResubmitModalOpen(false)}
                        id={selectedArticle._id}
                        refresh={refetch}
                      />
                    </div>
                  ))
                ) : (
                  <div className="p-4 m-2 custom-shadow">
                    <h1 className="text-3xl">No Articles Assigned yet</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditorDashboard;
