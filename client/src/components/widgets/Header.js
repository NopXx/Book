import React, { useState } from "react";
import { MdOutlineSearch, MdClose } from "react-icons/md";

function Header({title, show, Search}) {
 
  const [btnsrh, setBtnsrh] = useState(false);
  return (
    <div className="flex justify-between shadow-lg py-2 my-2 p-2 m-2 md:m-0">
      <div className="container flex justify-between items-center mx-auto py-3 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        {show ? (
        <div className="form-control">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="ชื่อ / ประเภท"
              onChange={(e) => { 
                Search(e.target.value)
              }}
              className={`${
                !btnsrh ? "hidden" : ""
              } md:flex input input-bordered input-primary w-full max-w-xs`}
            />
            <button
              class="btn btn-outline btn-primary flex md:hidden"
              onClick={() => setBtnsrh(!btnsrh)}
            >
              {!btnsrh ? (
                <MdOutlineSearch className="text-lg" />
              ) : (
                <MdClose className="text-lg" />
              )}
            </button>
          </div>
        </div>
        ) : ''}
      </div>
    </div>
  );
}

export default Header;
