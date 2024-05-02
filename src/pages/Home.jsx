import React from "react";
import { IoBookOutline, IoInformationCircleOutline } from "react-icons/io5";
import { MdOutlineAnnouncement, MdOutlineArticle } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Loader from "../components/Loader";
import Table from "../components/Table";
import { archivesColumns } from "../utils/columns";
import {
  useGetAllVolumesQuery,
  useGetAnnouncementQuery,
  useGetPublishedArticlesQuery,
} from "../store/api/articleApi";
import TableSkeleton from "../components/TableSkeleton";

const Home = () => {
  // Volumes
  const {
    data: volumesData,
    isLoading: isVolumeLoading,
    isSuccess: volumeSuccess,
  } = useGetAllVolumesQuery();

  // Articles
  const {
    data: articlesData,
    isLoading: isArticleLoading,
    isSuccess: articlesSuccess,
  } = useGetPublishedArticlesQuery();

  const sortedVolumes = volumeSuccess
    ? [...(volumesData.volumes || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .reverse()
    : [];

  const sortedArticles = articlesSuccess
    ? [...(articlesData.articles || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 10)
    : [];

  return (
    <section className="min-h-screen m-5">
      <div className="flex flex-col md:flex-row">
        <div>
          <VolumeSection
            sortedVolumes={sortedVolumes}
            isVolumeLoading={isVolumeLoading}
          />
          <AboutSection />
        </div>
        <Anouncements />
      </div>
      <LatestArticlesSection
        sortedArticles={sortedArticles}
        isArticleLoading={isArticleLoading}
      />
    </section>
  );
};

const VolumeSection = ({ sortedVolumes, isVolumeLoading }) => (
  <div className="flex flex-col my-8">
    <div className="h-1 w-1/2 self-start md:mx-8 my-2 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
    <h1 className="text-center text-tertiary font-semibold text-3xl flex items-center justify-center gap-3">
      <IoBookOutline /> Volumes
    </h1>
    <div className="w-1/2 h-1 md:mx-8 my-2 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
    <div className="md:m-4 lg:m-8">
      {isVolumeLoading ? (
        <TableSkeleton />
      ) : (
        <table className="w-full text-xs md:text-base">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-2">Volume</th>
              <th className="p-2">Issue</th>
              <th className="p-2">Publication Year</th>
              <th className="p-2">View All</th>
            </tr>
          </thead>
          <tbody>
            {sortedVolumes.length > 0 ? (
              sortedVolumes.flatMap((volume, volumeIndex) =>
                volume.issues.map((issue, issueIndex) => (
                  <tr
                    key={`${volume.volumeNumber}-${issue.issueNumber}`}
                    className={`${
                      (volumeIndex * volume.issues.length + issueIndex) % 2 ===
                      0
                        ? "bg-blue-50"
                        : "bg-white"
                    } border-b text-black`}
                  >
                    <td className="p-2">Volume {volume.volumeNumber}</td>
                    <td className="p-2">Issue {issue.issueNumber}</td>
                    <td className="p-2">{volume.publicationYear}</td>
                    <td className="p-2">
                      <Link
                        to={`/articles/volume/${volume.volumeNumber}/${issue.issueNumber}`}
                        className="flex items-center gap-3 text-sm"
                      >
                        View Articles
                        <FaArrowRight />
                      </Link>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center font-medium text-lg text-gray-500"
                >
                  No volumes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>
);

const Anouncements = () => {
  //Announcements
  const {
    data: announcementData,
    isLoading: announcementLoading,
    isSuccess: announcementSuccess,
  } = useGetAnnouncementQuery();

  const getDate = (d) => {
    const date = new Date(d);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const announcement = announcementSuccess
    ? announcementData.announcements
    : [];

  return (
    <section className="w-full lg:w-3/4 h-[50vh] sticky top-56 md:mx-4 overflow-y-scroll no-scrollbar">
      <div className="flex custom-shadow w-full rounded-lg">
        {announcementLoading ? (
          <TableSkeleton />
        ) : (
          <table className="w-full table-auto rounded-lg overflow-y-scroll no-scrollbar">
            <thead>
              <tr className="bg-primary text-white z-30 sticky top-0">
                <th className="p-3 font-bold flex items-center justify-center gap-2">
                  <MdOutlineAnnouncement />
                  Announcements
                </th>
              </tr>
            </thead>
            <tbody>
              {announcement.length > 0 ? (
                announcement.map((announcement, index) => (
                  <tr
                    key={announcement._id}
                    className={`${
                      index % 2 == 0 ? "bg-blue-50" : "bg-white"
                    } border-b text-black`}
                  >
                    <td className="p-2">
                      <div className="flex justify-between gap-2 items-center">
                        <div>
                          {" "}
                          <p className="text-normal">
                            {announcement.title}
                          </p>{" "}
                          <p className="text-sm font-light">
                            {announcement.description}
                          </p>
                          <p className="text-xs font-light">
                            {getDate(announcement.createdAt)}
                          </p>
                        </div>
                        {announcement.url && (
                          <a
                            href={announcement.url}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="cursor-pointer"
                          >
                            <FaArrowRight />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={1}
                    className="p-4 text-center font-medium text-lg text-gray-500"
                  >
                    No announcements.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

const AboutSection = () => (
  <div className="flex flex-col my-8">
    <div className="h-1 w-1/2 self-start md:mx-8 my-2 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
    <h1 className="text-center text-tertiary font-semibold text-3xl flex items-center justify-center gap-3">
      <IoInformationCircleOutline /> About Us
    </h1>
    <div className="w-1/2 h-1 md:mx-8 my-2 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
    <div className="custom-shadow md:m-6 rounded-lg p-10">
      <h1 className="text-2xl my-2 text-primary">HPU E-Journal</h1>
      <p className="text-lg text-mauve10">
        The Shimla Journal of Multidisciplinary Research is an open access and
        peer reviewed bi-annual online journal that provides an academic
        platform to comment on concerns in the field of humanities and social
        sciences.
        <br />
        <br />
        The journal seeks to promote contemporary multi-disciplinary research in
        the fields of Language and Literature, Social Sciences, Commerce,
        Economics, Education, English, Geography, History, Law, Library &
        Information Science, Linguistics, Literary studies, Management Studies,
        Music & Fine Arts, Philosophy, Political Science, Psychology, Sociology,
        Women Studies and a variety of other areas covering a wide range of
        issues, and contemporary perspectives promoting multidisciplinary
        research and readership.
        <br />
        <br />
        It aims to publish theoretical and empirical research, and book reviews
        with occasional special issues. For submission of research articles and
        for any other queries regarding the journal please mail to
        shimlajournal2020@gmail.com
        <br />
      </p>
    </div>
  </div>
);

const LatestArticlesSection = ({ sortedArticles, isArticleLoading }) => (
  <div className="flex flex-col my-8">
    <div className="h-1 w-1/2 self-start md:mx-8 my-2 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
    <h1 className="text-center text-tertiary font-semibold text-3xl flex items-center justify-center gap-3">
      <MdOutlineArticle /> Latest Articles
    </h1>
    <div className="w-1/2 h-1 md:mx-8 my-2 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
    {isArticleLoading ? (
      <TableSkeleton />
    ) : (
      <Table
        tableData={sortedArticles}
        columns={archivesColumns}
        bottomView={false}
        emptyMessage="No articles published."
      />
    )}
  </div>
);

export default Home;
