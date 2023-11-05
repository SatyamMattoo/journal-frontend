import React from "react";
import Card from "../utils/Card";
import Loader from "../components/Loader";
import {
  useGetAllVolumesQuery,
  useGetAnnouncementQuery,
  useGetPublishedArticlesQuery,
} from "../store/api/articleApi";

const Home = () => {
  //Volumes
  const {
    data: volumesData,
    error: volumeError,
    isLoading: isVolumeLoading,
    isSuccess: volumeSuccess,
  } = useGetAllVolumesQuery();

  // Articles
  const {
    data: articlesData,
    error: articleError,
    isLoading: isArticleLoading,
    isSuccess: articlesSuccess,
  } = useGetPublishedArticlesQuery();

  //Announcements
  const {
    data: announcementData,
    error: announcementError,
    isLoading: announcementLoading,
    isSuccess: announcementSuccess,
    refetch: refetchAnnouncement,
  } = useGetAnnouncementQuery();

  let sortedVolumes = [];
  if (volumeSuccess) {
    sortedVolumes = [...(volumesData.volumes || [])];
    sortedVolumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  let sortedArticles = [];
  if (articlesSuccess) {
    sortedArticles = [...(articlesData.articles || [])];
    sortedArticles.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  let announcement = [];
  if (announcementSuccess) {
    announcement = announcementData.announcements || [];
  }
  return (
    <>
      {isVolumeLoading || isArticleLoading ? (
        <Loader />
      ) : (
        <section className="min-h-screen m-5">
          <div className="flex flex-col my-4">
            <div className="h-1 w-1/2 mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">Volumes</h1>
            <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="flex">
              <div className=" flex flex-wrap flex-row-reverse volumes m-6">
                {sortedVolumes.length > 0 ? (
                  sortedVolumes.map((volume, volumeIndex) => (
                    <Card
                      key={volumeIndex}
                      volumeNo={volume.volumeNumber}
                      year={volume.publicationYear}
                      issues={volume.issues}
                    />
                  ))
                ) : (
                  <div className="p-4 m-2 custom-shadow">
                    <h1 className="text-2xl text-gray-600">No volumes published yet.</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col my-4">
            <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">About Us</h1>
            <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="custom-shadow m-6 rounded-lg p-10 ">
              <h1 className="text-2xl my-4 text-primary">About Us</h1>
              <p className="text-lg text-mauve10">
                Our eJournal website simplifies academic publishing. Users can
                easily upload articles, track submissions, and access research
                papers on our user-friendly platform. Automated issue and volume
                updates keep content fresh, fostering a dynamic academic
                environment.
                <br />
                Users benefit from a seamless experience, with easy login,
                submission tracking, and access to a wealth of academic content.
                Our platform ensures efficient knowledge sharing and scholarly
                collaboration.
              </p>
            </div>
          </div>
          <div className="flex flex-col my-4">
            <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">Articles</h1>
            <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="flex">
              <div className="flex flex-wrap volumes m-6">
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
                  <div className="p-4 m-2 custom-shadow">
                    <h1 className="text-2xl text-gray-600">No Articles Published.</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col my-4">
            <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">Announcements</h1>
            <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="flex">
              <div className=" flex flex-wrap m-2 md:m-6 w-full">
                {announcement.length > 0 ? (
                  announcement.map((item, index) => {
                    return (
                      <Card
                        key={index}
                        heading={item.title}
                        description={item.description}
                        date={item.createdAt}
                        url={item.url ? item.url : null}
                      />
                    );
                  })
                ) : (
                  <div className="p-4 m-2 custom-shadow">
                    <h1 className="text-2xl text-gray-600">No Announcements.</h1>
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

export default Home;
