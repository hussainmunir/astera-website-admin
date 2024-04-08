// import { Button } from "@mui/material";
import * as React from "react";

function TitlePage() {
  return (
    <div className="mt-[2rem] ml-[2rem] flex flex-col justify-center self-stretch">
      {/* This div will be visible on screens larger than 'md' */}
      <div className="hidden md:block">
        <p className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
          Title for Collection Page
        </p>
        <p className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
          Lorem ipsum dolor sit amet consectetur. Est lectus sit at bibendum
          elementum accumsan dignissim tempus in. Pretium nibh venenatis urna
          sed.
        </p>
      </div>
      {/* <div className="hidden md:block mt-[4rem]">
				<div className="w-full text-lg font-semibold leading-7 text-gray-900 max-md:max-w-full">
					Section 1
				</div>
				<div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600 max-md:max-w-full">
					Update desired photo and details here.
				</div>
			</div> */}

      {/* This div will only be visible on 'md' screens and smaller */}
      <div className="md:hidden">
        <div className="w-full text-lg font-semibold leading-7 text-gray-900">
          Mobile View Title
        </div>
        <div className="mt-1 w-full text-sm leading-5 text-ellipsis text-slate-600">
          Shortened version for mobile, or perhaps a completely different
          message.
        </div>
      </div>
    </div>
  );
}
export default TitlePage;
