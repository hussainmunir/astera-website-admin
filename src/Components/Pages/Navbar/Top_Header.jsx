
import * as React from "react";
import logo from "../../../Images/Logos.png"
import { useNavigate } from "react-router-dom";



function Top_Header() {

	const navigate = useNavigate();

     const handleLogout = () => {
        
        setTimeout(() => {
            navigate("/login");
			localStorage.setItem("jwt", null);
        }, 0); // Delayed navigation
        console.log("Logged out successfully, navigating to /login");
    };

	return (
		<div className="ml-[30px] mt-[4rem] flex flex-wrap gap-4 content-start self-stretch text-3xl font-semibold leading-10 text-gray-900 whitespace-nowrap">
			<img
				loading="lazy"
				src= {logo}
				className="shrink-0 aspect-[0.78] w-[34px]"
			/>
			<div className="max-md:max-w-full">Settings</div>
			<button className=" text-lg ml-[80%]" onClick={handleLogout}>Logout</button>
		</div>
	);
}
export default Top_Header;