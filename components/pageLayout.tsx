"use client";
import Image from "next/image";
import logoicc0 from "../public/logoicc5.webp";
import allgis from "../public/logoicc5.webp";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { MdLogin } from "react-icons/md";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  usr?: any;
};
const PageLayout = ({ title, description, children, usr }: PageLayoutProps) => {
  const router = useRouter();

  const [openNav, setOpenNav] = useState(false);

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="md:container md:p-1 bg-sky-800">
      <div className=" rounded-lg overflow-hidden relative max-sm:p-1  flex flex-col max-sm:h-[70px] h-[150px] w-full ">
        <div className=" overflow-hidden justify-start flex items-center gap-4 text-3xl md:p-10 w-full ">
          <Image
            onClick={() => router.push("/")}
            alt="home"
            src={logoicc0}
            quality={100}
            className="hover:cursor-pointer rounded-full  text-center z-5 max-sm:w-1/6 md:w-1/12 "
          />
          {/*           <Image
            alt="home"
            src={allgis}
            quality={100}
            className="absolute top-0 left-0 rounded-lg -z-10 "
          /> */}
          <p className="font-semibold text-white max-sm:text-2xl text-6xl">
            {"Agenda "}
            <span className="font-normal">Annuel</span>
          </p>
        </div>
        <p className="text-xs text-center text-white">ICC Bruxelles</p>
      </div>

      <div className="overflow-hidden rounded-t-3xl grid md:grid-cols-5 gap-4 mt-4 h-full ">
        {/*         <div className="max-md:hidden col-span-1 rounded-lg ">
          <InfosNav />
        </div> */}
        <div className="col-span-5 rounded-lg bg-transparent md:p-2">
          {children}
        </div>
      </div>
      <div className="fixed w-full bottom-0 left-0"></div>
    </div>
  );
};

export default PageLayout;
