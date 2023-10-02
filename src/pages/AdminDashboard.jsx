import React, { useState } from "react";
import Card from "../utils/Card";
import AsignArticle from "../components/modals/AsignArticle";
import CreateEditor from "../components/modals/CreateEditor";
import PublishArticle from "../components/modals/PublishArticle";
import DeleteEditor from "../components/modals/DeleteEditor";
import {
  useGetAnnouncementQuery,
  useGetEditorsQuery,
  useGetReadyToPublishArticlesQuery,
  useGetSubmittedArticlesQuery,
} from "../store/api/articleApi";
import Loader from "../components/Loader";
import CreateAnnouncement from "../components/modals/CreateAnnouncement";
import DeleteAnnouncement from "../components/modals/DeleteAnnouncement";

const AdminDashboard = () => {
  const {
    data: editorData,
    error: editorError,
    isSuccess: editorSuccess,
    isLoading: editorLoading,
    refetch: refetchEditors,
  } = useGetEditorsQuery();

  const {
    data: articleData,
    error: articleError,
    isSuccess: articleSuccess,
    isLoading: articleLoading,
    refetch: refetchArticles,
  } = useGetSubmittedArticlesQuery();

  const {
    data: readyArticleData,
    error: readyArticleError,
    isLoading: readyArticleLoading,
    isSuccess: readyArticleSuccess,
    refetch: refetchReadyArticles,
  } = useGetReadyToPublishArticlesQuery();

  const {
    data: announcementData,
    error: announcementError,
    isLoading: announcementLoading,
    isSuccess: announcementSuccess,
    refetch: refetchAnnouncement,
  } = useGetAnnouncementQuery();

  let editor,
    articles,
    readyArticles,
    sortedReadyArticles,
    sortedArticles,
    announcement;

  if (editorSuccess) {
    editor = editorData.editors || [];
  }
  if (announcementSuccess) {
    announcement = announcementData.announcements || [];
  }
  if (articleSuccess) {
    articles = articleData.articles || [];
    sortedArticles = [...(articleData.articles || [])];
    sortedArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (readyArticleSuccess) {
    readyArticles = readyArticleData.articles || [];
    sortedReadyArticles = [...(readyArticleData.articles || [])];
    sortedReadyArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // For Assign Article modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false); // For Publish Article modal
  const [isDeleteEditorModalOpen, setIsDeleteEditorModalOpen] = useState(false); // For Publish Article modal
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isDeleteAnnouncementModalOpen, setIsDeleteAnnouncementModalOpen] =
    useState(false);
  const [selectedArticle, setSelectedArticle] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState("");

  //Assign editor the article modal
  const handleAssignClick = (article) => {
    setSelectedArticle(article);
    setIsAssignModalOpen(true);
  };
  const handlePublishClick = (article) => {
    setSelectedArticle(article);
    setIsPublishModalOpen(true);
  };
  const handleDeleteClick = (article) => {
    setSelectedArticle(article);
    setIsDeleteEditorModalOpen(true);
  };
  const handleDeleteAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteAnnouncementModalOpen(true);
  };

  return (
    <>
      {editorLoading || articleLoading || readyArticleLoading ? (
        <Loader />
      ) : (
        <section className="min-h-screen bg-secondary bg-opacity-30 p-2">
          <div
            key={selectedArticle ? selectedArticle._id : "default"}
            className="flex flex-col justify-evenly"
          >
            <div className="flex p-4 bg-primary h-[50px] justify-center items-center rounded-lg">
              <h1 className="text-center text-2xl">Admin Dashboard</h1>
            </div>
            <div className="flex flex-col justify-evenly items-center m-2">
              <div className="flex p-4 bg-primary w-[90%] h-[70px] justify-center items-center rounded-lg">
                <h1 className="text-center text-2xl">Unassigned Articles</h1>
              </div>
              <div className="flex flex-wrap w-[90%] items-center  m-10">
                {sortedArticles.length > 0 ? (
                  sortedArticles.map((item, index) => (
                    <div key={index} className="flex flex-col  m-2">
                      <Card
                        heading={item.title}
                        description={item.description}
                        author={item.author ? item.author.name : "Anonymous"}
                        date={item.createdAt}
                        url={item.pdfFile}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-primary m-2 rounded-full"
                        onClick={() => handleAssignClick(item)}
                      >
                        Assign article
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 m-2 card-gradient">
                    <h1 className="text-3xl">No Articles to Send for review</h1>
                  </div>
                )}
                <AsignArticle
                  isOpen={isAssignModalOpen}
                  onClose={() => setIsAssignModalOpen(false)}
                  editors={editor}
                  articleId={selectedArticle ? selectedArticle._id : null}
                  refresh={refetchArticles}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex p-4 bg-primary w-[90%] h-[70px] justify-center items-center rounded-lg">
                <h1 className="text-center text-2xl">Ready to Publish</h1>
              </div>
              <div className="flex flex-wrap w-[90%] items-center m-10">
                {readyArticles.length > 0 ? (
                  readyArticles.map((item, index) => (
                    <div key={index} className="flex flex-col m-2">
                      <Card
                        heading={item.title}
                        description={item.description}
                        author={
                          item.author.name ? item.author.name : "Anonymous"
                        }
                        date={item.createdAt}
                        url={item.pdfFile}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-primary m-2 rounded-full"
                        onClick={() => handlePublishClick(item)}
                      >
                        Publish Article
                      </button>
                      <PublishArticle
                        isOpen={isPublishModalOpen}
                        onClose={() => setIsPublishModalOpen(false)}
                        id={selectedArticle._id}
                        refresh={refetchReadyArticles}
                      />
                    </div>
                  ))
                ) : (
                  <div className="p-4 m-2 card-gradient">
                    <h1 className="text-3xl">No Articles to Publish.</h1>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex p-4 bg-primary w-[90%] h-[70px] justify-center items-center rounded-lg ">
                <h1 className="text-center text-2xl">List of editors</h1>
              </div>
              <div className="flex flex-wrap w-[90%] items-center m-10">
                {editor ? (
                  editor.map((item, index) => (
                    <div key={index} className="flex flex-col m-2">
                      <Card
                        name={item.name}
                        department={item.department}
                        email={item.email}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-red-900 m-2 rounded-full"
                        onClick={() => handleDeleteClick(item)}
                      >
                        Delete
                      </button>
                      {isDeleteEditorModalOpen && (
                        <DeleteEditor
                          isOpen={isDeleteEditorModalOpen}
                          onClose={() => setIsDeleteEditorModalOpen(false)}
                          id={selectedArticle._id}
                          refresh={refetchEditors}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>Loading editors...</p>
                )}
                <button
                  className="p-4 bg-secondary hover:bg-primary m-2 rounded-full"
                  onClick={() => setIsEditorModalOpen(true)}
                >
                  Add more +
                </button>
              </div>
              <CreateEditor
                isOpen={isEditorModalOpen}
                onClose={() => setIsEditorModalOpen(false)}
                refresh={refetchEditors}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex p-4 bg-primary w-[90%] h-[70px] justify-center items-center rounded-lg ">
                <h1 className="text-center text-2xl">Announcements</h1>
              </div>
              <div className="flex flex-wrap w-[90%] items-center m-10">
                {announcement ? (
                  announcement.map((item, index) => (
                    <div key={index} className="flex flex-col m-2">
                      <Card
                        heading={item.title}
                        description={item.description}
                        date={item.createdAt}
                      />
                      <button
                        type="submit"
                        className="p-2 bg-secondary hover:bg-red-900 m-2 rounded-full"
                        onClick={() => handleDeleteAnnouncementClick(item)}
                      >
                        Delete
                      </button>
                      {isDeleteAnnouncementModalOpen && (
                        <DeleteAnnouncement
                          isOpen={isDeleteAnnouncementModalOpen}
                          onClose={() =>
                            setIsDeleteAnnouncementModalOpen(false)
                          }
                          id={selectedAnnouncement._id}
                          refresh={refetchAnnouncement}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <p>Loading announcements...</p>
                )}
                <button
                  className="p-4 bg-secondary hover:bg-primary m-2 rounded-full"
                  onClick={() => setIsAnnouncementModalOpen(true)}
                >
                  Add Announcement
                </button>
              </div>
              <CreateAnnouncement
                isOpen={isAnnouncementModalOpen}
                onClose={() => setIsAnnouncementModalOpen(false)}
                refresh={refetchAnnouncement}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminDashboard;
