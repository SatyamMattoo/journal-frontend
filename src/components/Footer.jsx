import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary p-2">
      <div className="container mx-auto flex ">
        <div className="flex items-center justify-between text-xs w-full">
          <div className="logo md:hidden mx-4">
            <img src={Logo} alt="logo" width={60} height={60} />
          </div>
          <div className="address hidden md:flex items-center">
            <div className="logo mx-4">
              <img src={Logo} alt="logo" width={70} />
            </div>
            <p>
              <a href="https://goo.gl/maps/m5rC3cKV5xbANStU7" target="_blank">
                Himachal Pradesh University,
              </a>
              Summer Hill, Shimla
              <br />
              171005
            </p>
          </div>
          <div className="contact flex flex-col items-start">
            <h2 className="font-semibold text-[14px] mb-1 ">Contacts</h2>
            <div className="flex">
              <div className="w-[1px] self-center mr-2 h-12 bg-white"></div>
              <div className="flex flex-col">
                <p>🕿 0177 283 3555</p>
                <p>
                  <a href="mailto:vc@hpuniv.ac.in" target="_blank">
                    ✉ vc@hpuniv.ac.in
                  </a>
                </p>
                <a href="mailto:vc_hpu@hotmail.com" target="_blank">
                  ✉ vc_hpu@hotmail.com
                </a>
              </div>
            </div>
          </div>
          <div className="socials flex flex-col items-start">
            <h2 className="font-semibold text-[14px] mb-1 ">Socails</h2>
            <div className="flex">
              <div className="w-[1px] self-center mr-2 h-12 bg-white"></div>
              <div className="flex flex-col">
                <div className="facebook flex items-center ">
                  <FaFacebookSquare />
                  <a
                    href="https://www.facebook.com/HpuNewShimla"
                    className="mx-1"
                  >
                    Facebook
                  </a>
                </div>
                <div className="twitter flex items-center ">
                  <FaTwitterSquare />
                  <a
                    href="https://twitter.com/hpu_shimla?t=lRks6KUPBVeBjXTZgzNs_Q&s=08"
                    className="mx-1"
                  >
                    Twitter
                  </a>
                </div>
                <div className="youtube flex items-center">
                  <FaYoutubeSquare />
                  <a
                    href="https://www.youtube.com/channel/UCMvQSn0FkUKJIqKggNsbopw"
                    className="mx-1"
                  >
                    Youtube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
