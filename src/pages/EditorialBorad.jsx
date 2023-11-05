import React from "react";
import Card from "../utils/Card";
import { useGetEditorsQuery } from "../store/api/articleApi";
import Loader from "../components/Loader";

const EditorialBorad = () => {
  const { data, error, isLoading } = useGetEditorsQuery();
  const { editors } = data || [];
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="min-h-screen m-5">
          <div className="flex flex-col my-4">
            <div className="h-1 w-1/2 self-start mx-8 my-4 bg-gradient-to-r from-primary via-blue-200 to-transparent"></div>
            <h1 className="text-center text-primary text-3xl">Board of Editors</h1>
            <div className="w-1/2 h-1 mx-8 my-4 self-end bg-gradient-to-r from-transparent via-blue-200 to-primary"></div>
            <div className="flex flex-wrap m-2">
              {editors ? (
                editors.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      name={item.name}
                      department={item.department}
                      email={item.email}
                    />
                  );
                })
              ) : (
                <div className="p-4 m-2 custom-shadow">
                  <h1 className="text-3xl">No Editors Found.</h1>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditorialBorad;
