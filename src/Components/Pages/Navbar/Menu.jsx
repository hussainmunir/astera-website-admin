import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Menu.css";

function NavBar() {
  const location = useLocation();

  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [location]);

  return (
    <div className="flex flex-col justify-center items-start border-b border-gray-200 border-solid max-md:pr-5 mt-[4rem] ml-[2rem]">
      <div className="flex gap-3 justify-between items-start max-w-full w-[426px] max-md:flex-wrap">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/discover" className="nav-link">
          Discover
        </Link>
        <Link to="/collection" className="nav-link">
          Collection
        </Link>
        <Link to="/catalogs" className="nav-link">
          Catalogs
        </Link>
        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
