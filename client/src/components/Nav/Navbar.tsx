import React from "react";

export default function Navbar() {
  return (
    <nav className="flex h-[60px] w-full text-white  bg-[#FFA6A6]">
      <div className="flex flex-1 text-4xl items-center justify-start ml-10">
        {" "}
        AI - PDF{" "}
      </div>
      <div className="flex flex-1  text-2xl justify-start items-center">
        {" "}
        <a className="pr-10">HOME</a>{" "}
        <a>HISTORY</a>{" "}

      </div>
      <div className="flex flex-1 text-2xl justify-center items-center">
            <a>USER1</a>
         </div>
    </nav>
  );
}
