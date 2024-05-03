import React from "react";
import { Section1 } from "./Section1.jsx";
import { Section2 } from "./Section2";

export function Blog() {
  return (
    <div>
      {" "}
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
        </div>
      </div>
      <Section1 />
      <Section2 />
    </div>
  );
}
