import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineColorLens,
  MdKeyboardArrowDown,
  MdPersonOutline,
} from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import themelist from "../data/themelist";

function Navber({ themedata, Menu, setMode, isLogin, uData, setLogin }) {
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [userPro, setUserPro] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const Logout = () => {
    axios.get("http://localhost:3001/logout");
    setLogin(false);
    navigate("/login");
    window.location.reload(true);
  };
  useEffect(() => {
    if (isLogin) {
      uData.map((val) => {
        return setUserData(val);
      });
      setUserPro(userData.u_fname);
    }
  });
  return (
    <nav className=" lg:px-16 px-6 flex flex-wrap items-center lg:py-0 py-2 shadow-lg compact side bg-base-100">
      <div className="flex-1 flex justify-between items-center container mx-auto">
        <Link className="flex items-center py-4 px-2" to="/">
          <img src="../img/book_logo.png" alt="logo" className="h-8 w-8 mr-2" />
          <span className="md:flex hidden text-3xl font-title text-primary lowercase">
            Book
          </span>
        </Link>
        <div className="dropdown dropdown-end">
          <div tabindex="0" className="m-1 normal-case btn-ghost btn">
            <MdOutlineColorLens className="w-6 h-6 mr-1" />
            <span className="hidden md:inline"> Theme</span>
            <MdKeyboardArrowDown className="w-4 h-4 ml-1" />
          </div>

          <ul
            tabindex="0"
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-48"
          >
            {themelist.map((val, index) => {
              return (
                <li key={index} onClick={() => setMode(val.name)}>
                  <a className={val.name === themedata ? "active" : ""}>
                    {val.icon} {val.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-cursor lg:hidden block mr-4"
      >
        {!isOpen ? (
          <IoIosMenu className="fill-current h-8 w-8" />
        ) : (
          <IoClose className="fill-current h-8 w-8" />
        )}
      </button>
      {isLogin === true ? (
        <div
          class={`lg:hidden block dropdown ${
            !isOpen ? "dropdown-end" : "dropdown-right"
          }`}
        >
          <div class="avatar online placeholder cursor-pointer" tabindex="0">
            <div class="bg-primary text-primary-content rounded-full w-10">
              <span class="text-xl uppercase">{userPro}</span>
            </div>
          </div>
          <ul
            tabindex="0"
            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">
                <MdPersonOutline /> Profile
              </Link>
            </li>
            <li>
              <Link to="#" onClick={Logout}>
                <FiLogOut />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}

      <div
        className={`${
          !isOpen ? "hidden" : ""
        } lg:flex lg:items-center lg:w-auto w-full sm:items-start`}
      >
        {Menu === false ? (
          <nav>
            <ul className="  lg:flex items-center justify-between text-base pt-4 lg:pt-0 p-1">
              <li>
                <Link
                  className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-primary"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {isLogin === true ? (
                <>
                  <li>
                    <Link
                      className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-primary"
                      to="/history"
                    >
                      History
                    </Link>
                  </li>
                  <div
                    class={`lg:block hidden dropdown ${
                      !isOpen ? "dropdown-end" : "dropdown-right"
                    }`}
                  >
                    <div
                      class="avatar online placeholder cursor-pointer"
                      tabindex="0"
                    >
                      <div class="bg-primary text-primary-content rounded-full w-10">
                        <span class="text-xl uppercase">{userPro}</span>
                      </div>
                    </div>
                    <ul
                      tabindex="0"
                      class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link to="/profile">
                          <MdPersonOutline /> Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="#" onClick={Logout}>
                          <FiLogOut />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <li>
                  <Link
                    className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-primary lg:mb-0 mb-2"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="  lg:flex items-center justify-between text-base pt-4 lg:pt-0 p-1">
              <li>
                <Link
                  className="lg:p-4 py-3 px-5 block border-b-2 border-transparent hover:border-primary"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </nav>
  );
}

export default Navber;
