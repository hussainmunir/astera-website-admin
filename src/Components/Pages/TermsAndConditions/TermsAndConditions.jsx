import React from "react";
import Section1 from "./section1";
import Section2 from "./section2";

export function TermsAndConditions() {
  return (
    <div>
      <div className="ml-[2rem] mt-[2rem]">
        {" "}
        <p className="w-full text-lg font-bold leading-7 text-gray-900 max-md:max-w-full">
          Title for Collection Page
        </p>
        <p className="mt-1 text-ellipsis text-slate-600 max-md:max-w-full">
          Lorem ipsum dolor sit amet consectetur. Est lectus sit at bibendum
          elementum accumsan dignissim tempus in. Pretium nibh venenatis urna
          sed.
        </p>
      </div>
      <Section1 />
      <Section2 />
    </div>
  );
}

export default TermsAndConditions;
