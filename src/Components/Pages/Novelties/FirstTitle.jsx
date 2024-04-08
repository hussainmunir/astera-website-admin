import React, { useState } from "react";

export function FirstTitle() {
	return (
		<div className="mt-[2rem] ml-[2rem] flex flex-col justify-center self-stretch">
			{/* This div will be visible on screens larger than 'md' */}
			<div className="hidden md:block">
				<p className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
					Title for Collection Page
				</p>
				<p className="mt-1 text-ellipsis text-slate-600 max-md:max-w-full">
					Lorem ipsum dolor sit amet consectetur. Est lectus sit at bibendum
					elementum accumsan dignissim tempus in. Pretium nibh venenatis urna
					sed.
				</p>
				<div className="flex ml-[80rem] space-x-5 -mt-[1.5rem]">
					<button className="border-solid border-2 p-2 w-[5rem] border-black text-blue bg-white rounded-xl">
						Close
					</button>
					<button className="border-1 border-solid border-blue w-[5rem] text-white bg-blue-700 p-2 rounded-xl">
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
