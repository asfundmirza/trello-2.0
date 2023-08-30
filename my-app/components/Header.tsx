"use client";

import Image from "next/image";
import React from "react";
import trelloImg from "@/Images/trello_logo.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
function Header() {
  return (
    <header>
      <div className=" flex flex-col md:flex-row items-center p-5 bg-slate-100 rounded-b-2xl">
        <Image
          src={trelloImg}
          alt="trello-logo"
          height={100}
          width={300}
          className=" object-contain w-44 md:w-55   ml-2"
        />
        <div className="flex space-x-4 items-center w-full md:justify-end">
          <form className="flex items-center shadow-md flex-1 md:flex-initial space-x-4 rounded-md p-2 bg-white">
            <MagnifyingGlassIcon className=" h-8 w-8 text-slate-400" />
            <input
              type="text"
              className=" outline-none rounded-md   p-2 flex-1 "
              placeholder="search"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Asfund Mirza" round color="#0055D1" size="45" />
        </div>
      </div>
      <div className="flex items-center justify-center mt-2">
        <p className="flex items-center  bg-white p-5 shadow-lg rounded-lg text-lg w-fit font-light italic max-w-3xl text-[#0055D1] ">
          <UserCircleIcon className=" inline-block text-[#0055D1] w-10 h-10 mr-2" />
          GPT is summerizing your content
        </p>
      </div>
    </header>
  );
}

export default Header;
