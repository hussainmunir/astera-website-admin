import * as React from "react";
import logo from "../../../Images/Logos.png"

function Top_Header() {
	return (
		<div className="ml-[30px] mt-[4rem] flex flex-wrap gap-4 content-start self-stretch text-3xl font-semibold leading-10 text-gray-900 whitespace-nowrap">
			<img
				loading="lazy"
				src= {logo}
				className="shrink-0 aspect-[0.78] w-[34px]"
			/>
			<div className="max-md:max-w-full">Settings</div>
		</div>
	);
}
export default Top_Header;
