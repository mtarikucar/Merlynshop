import { useEffect, useState } from "react";

import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "./Dropdown";

function Navbar({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [scrollUp, setScrollUp] = useState(true);

  let location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0 && scrollUp) {
        setScrollUp(false);
      } else if (scrollTop === 0 && !scrollUp) {
        setScrollUp(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollUp]);



  return (
    <div
      id="navbar"
      className={`sticky w-full shadow-lg z-10 top-0 left-0 transition-transform ${
        scrollUp ? "translate-y-0" : "-translate-y-full"
      } duration-300`}
    >
      <nav className="bg-white  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center">
            <img src="/logo.png" className="h-12 mr-3" alt="Flowbite Logo" />
          </a>
          <div className="flex items-center ">
            {user ? (
              <Dropdown />
            ) : (
              <NavLink
                to="/login"
                className="text-white bg-[#008037] hover:bg-white hover:text-[#008037] hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 "
              >
                Giriş yap
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-100 ">
        <div className=" lg:sticky  xl:sticky md:sticky  lg:top-0  xl:top-0 md:top-0  bottom-0 z-40 w-full h-16  flex bg-white border-t border-gray-200 ">
          <div className=" container mx-auto flex flex-row items-center max-w-screen-xl ">
            <ul className="flex lg:justify-start md:justify-start justify-between  xl:justify-start h-full w-full  font-medium mx-2 p-2 lg:space-x-10">
              {user?.role == "admin" ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Dashboard
                      </span>
                    </NavLink>
                  </li>

                  
                  <li>
                    <NavLink
                      to="/admin/product"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Product
                      </span>
                      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-indigo-50 rounded-full">
                        New
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/coupon"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                      <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Kupon
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/user"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Users
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/order"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Orders
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/message"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Message
                      </span>
                      <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                        1.2k
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/settings"
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4   border-green-500  pr-6"
                          : "relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 rounded-md  text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-green-500  pr-6"
                      }
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        Settings
                      </span>
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                  <NavLink
                    to="/product"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "text-red-400 text-center"
                        : isActive
                        ? " text-green-500 text-center "
                        : "text-gray-800 text-center"
                    }
                  >
                    <ProductionQuantityLimitsIcon className="text-center w-full text-2xl" />
                    <span className="text-sm mb-2"> Ürünler</span>

                    <hr
                      className={`${
                        location.pathname == "/product"
                          ? "w-full h-0.5  bg-green-500 border-0 rounded "
                          : "w-full h-1 hidden "
                      }  `}
                    />
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
