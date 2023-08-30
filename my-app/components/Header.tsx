"use client";

import Image from "next/image";
import React from "react";
import trelloImg from "@/Images/trello_logo.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
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
    </header>
  );
}

export default Header;
