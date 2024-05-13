
import * as React from "react";
import logo from "../../../Images/Logos.png"
import { useNavigate } from "react-router-dom";




function Top_Header() {

	const navigate = useNavigate();



     const handleLogout = () => {
		 localStorage.setItem("jwt", null);
		 localStorage.removeItem("jwt");
        
		 setTimeout(() => {
			 navigate("/login");
			 window.location.reload();

        }, 300); // Delayed navigation
        console.log("Logged out successfully, navigating to /login");
    };

	return (
		
			<div className="ml-[30px] mt-[4rem] flex flex-wrap gap-4 content-start self-stretch text-3xl font-semibold leading-10 text-gray-900 whitespace-nowrap">
			  <img
				loading="lazy"
				src={logo}
				className="shrink-0 aspect-[0.78] w-[34px]"
				alt="Logo"
			  />
			  <div className="max-md:max-w-full">Settings</div>
			  <button className="text-lg ml-[80%]" onClick={handleLogout}>
				Logout
			  </button>
			</div>
		  
	);
}
export default Top_Header;