import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";


function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center items-start border-b border-gray-200 border-solid max-md:pr-5 mt-[4rem] ml-[2rem]">
      <div className="flex gap-10 justify-between items-start max-w-full w-[500px] max-md:flex-wrap">
        <Link to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
        <Link to="/discover" className={location.pathname === "/discover" ? "nav-link active" : "nav-link"}>
          Discover
        </Link>
        <Link to="/collection" className={location.pathname === "/collection" ? "nav-link active" : "nav-link"}>
          Collection
        </Link>
        <div className="dropdown transition:transform duration-500 hover:translate-x-2" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
          <Link to="/newcollection" className={location.pathname === "/newcollection" ? "nav-link active whitespace-nowrap" : "nav-link whitespace-nowrap "}>
            New Collection
          </Link>
          <img className="w-3 h-3 -mt-[1rem] ml-[7rem]" src={'src/assets/dropdown.png'} alt="" />
          {showDropdown && (
            <div className="dropdown-content m-3 ">
              <ul>
                <li className="hover:bg-slate-700 hover:duration-500 hover:transition-all">WHAT'S NEW</li>
                <li className="hover:bg-slate-700 hover:duration-500 hover:transition-all">NOVELTIES</li>
                <li className="hover:bg-slate-700 hover:duration-500 hover:transition-all">TIMELESS</li>
              </ul>
            </div>
          )}
        </div>
        <Link to="/catalogs" className={location.pathname === "/catalogs" ? "nav-link active " : "nav-link" }>
          Catalogs
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "nav-link active whitespace-nowrap" : "nav-link whitespace-nowrap"}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
export default NavBar;
