import React from "react";
import Image from "next/image";
import SamoLogo from "@/public/logo2.png";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-footer-blue font-lexend px-4 py-8 sm:px-12 lg:px-28 flex flex-col space-y-8">
      <div className="flex flex-row justify-between items-center space-x-4 border-b border-b-[#2A2B34]">
        <div className="flex flex-col items-start space-y-4 w-1/2 pb-8">
          <Image
            src={SamoLogo}
            alt="thumbnail"
            width={0}
            height={0}
            sizes="100vw"
            className="object-cover w-[120px] object-center"
          />
          <p className="text-xs md:text-sm">#LangkahPertamamu</p>
          <p className="text-xs md:text-sm">#BersamaSahabatModal</p>
        </div>
        <div className="flex sm:px-9 md:text-sm lg:pl-48 flex-col sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-8 space-y-6 items-center flex-1 text-xs">
          <a href="/">Home</a>
          <a href="/forum">Forum</a>
          <a href="/">Artikel</a>
        </div>
      </div>
      <div className="pt-8 flex flex-row w-full justify-between">
        <p className="text-[8px] md:text-sm">
          &#x24B8; 2024 Sahabat Modal. All Rights Reserved
        </p>
        <div className="flex flex-row space-x-2 md:text-xl">
          <a>
            <FaFacebook />
          </a>
          <a>
            <FaInstagram />
          </a>
          <a>
            <FaXTwitter />
          </a>
          <a>
            <FaLinkedin />
          </a>
          <a>
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
