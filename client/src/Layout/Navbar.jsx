import { useEffect, useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Dropdown from "./Dropdown";

function Navbar({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let location = useLocation();

  useEffect(() => {}, [location]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className=" sticky w-full shadow-lg  z-40 top-0 left-0  ">
      <nav className="bg-white  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              className="h-12 mr-3"
              alt="Flowbite Logo"
            />
          </a>
          <div className="flex items-center ">
            <a
              href="tel:5541251234"
              className="mr-6 text-sm  text-gray-500  hover:underline"
            >
              (506) 068 7100
            </a>

            {user ? (
              <Dropdown />
            ) : (
              <NavLink
                to="/login"
                className="text-white bg-[#008037] hover:bg-white hover:text-[#008037] hover:border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
              >
                Giriş yap
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <nav className="bg-gray-100 ">
        <div className=" lg:sticky  xl:sticky md:sticky fixed  lg:top-0  xl:top-0 md:top-0  bottom-0 z-40 w-full h-16  flex bg-white border-t border-gray-200 ">
          <div className=" container mx-auto flex flex-row items-center max-w-screen-xl ">
            <ul className="flex lg:justify-start md:justify-start justify-between  xl:justify-start h-full w-full  font-medium mx-2 p-2 lg:space-x-10">
              <li className="inline-flex flex-col items-center justify-center text-center  p-3  rounded-lg  hover:bg-gray-50  group">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-red-400 text-center"
                      : isActive
                      ? " text-green-500 text-center "
                      : "text-black text-center"
                  }
                >
                  <HomeIcon className="text-center w-full text-2xl" />
                  <span className="text-sm mb-2"> Anasayafa</span>

                  <hr
                    className={`${
                      location.pathname == "/"
                        ? "w-full h-0.5  bg-green-500 border-0 rounded "
                        : "w-full h-1 hidden "
                    }  `}
                  />
                </NavLink>
              </li>

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
              <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg ">
                <NavLink
                  to="/about"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-red-400 text-center"
                      : isActive
                      ? " text-green-500 text-center"
                      : "text-gray-800 text-center"
                  }
                >
                  <InfoIcon   className="text-center w-full text-2xl" />
                  <span className="text-sm mb-2"> Hakkımızda</span>

                  <hr
                    className={`${
                      location.pathname == "/about"
                        ? "w-full h-0.5  bg-green-500 border-0 rounded "
                        : "w-full h-1 hidden "
                    }  `}
                  />
                </NavLink>
              </li>
              <li className="inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 group  rounded-lg  ">
                <NavLink
                  to="/contact"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "text-red-400 text-center"
                      : isActive
                      ? " text-green-500 text-center "
                      : "text-gray-800 text-center"
                  }
                >
                  <ContactMailIcon   className="text-center w-full text-2xl" />
                  <span className="text-sm mb-2"> İletişim</span>

                  <hr
                    className={`${
                      location.pathname == "/contact"
                        ? "w-full h-0.5  bg-green-500 border-0 rounded "
                        : "w-full h-1 hidden "
                    }  `}
                  />
                </NavLink>
              </li>
            </ul>
            <div className=" lg:flex w-full justify-end hidden  ">
              <ul className="lg:flex hidden   flex-row font-medium mt-0 mr-6 space-x-8 justify-start items-center text-sm">
                <li>

                </li>
              </ul>
            </div>
          </div>
        </div>


      </nav>
    </div>
  );
}

export default Navbar;
