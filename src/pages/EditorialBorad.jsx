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
            <div className="flex p-4 bg-primary h-[50px] justify-center items-center rounded-lg ">
              <h1 className="text-center text-2xl">Board of Editors</h1>
            </div>
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
                <div className="p-4 m-2 card-gradient">
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
