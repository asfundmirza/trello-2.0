"use client";

import Image from "next/image";
import React from "react";
import trelloImg from "@/Images/trello_logo.png";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";
function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <header>
      <div className=" flex flex-col md:flex-row items-center p-5  rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#D9AFD9] to-[#97D9E1] rounded-md blur-3xl opacity-70 filter -z-50" />
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
              onChange={(e) => setSearchString(e.target.value)}
            />

            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name="Asfund Mirza" round color="#0055D1" size="45" />
        </div>
      </div>
      <div className="flex items-center justify-center py-2 md:py-5">
        <p className="flex items-center  bg-white p-5 shadow-lg rounded-lg text-lg w-fit font-light italic max-w-3xl text-[#0055D1] ">
          {/* <UserCircleIcon className=" inline-block text-[#0055D1] w-10 h-10 mr-2" /> */}
          <span>
            Note: Add your todos and you can drag and drop todos from one column
            to another.
          </span>
        </p>
      </div>
    </header>
  );
}

export default Header;
