import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center h-full">
          <Tabs.Root
            className="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-blackA2"
            defaultValue="tab1"
          >
            <Tabs.List
              className="shrink-0 flex border-b border-mauve6"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue11 data-[state=active]:text-blue11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] outline-none cursor-pointer"
                value="tab1"
              >
                Login
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue11 data-[state=active]:text-blue11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] outline-none cursor-pointer"
                value="tab2"
              >
                Register
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px]"
              value="tab1"
            >
              <Login />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px]"
              value="tab2"
            >
              <Register />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </section>
  );
};

export default Auth;