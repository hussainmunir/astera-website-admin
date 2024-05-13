import MenuBar from "./Menu";
import Top_Header from "./Top_Header";
import React, { useEffect, useState } from "react";



export function Navbar() {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        console.log("localStorage.getItem", localStorage.getItem("jwt"))
        const jwt = localStorage.getItem("jwt");

        if (jwt?.length > 0 && jwt !== "null") {
            console.log("coming in jwt", jwt)
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
        console.log("isLoggedIn", isLoggedIn)
    }, []);
	return (
		
		<div>
			{isLoggedIn && <Top_Header />}
			{isLoggedIn && <MenuBar />}
            
            
		</div>
		


	);
}
