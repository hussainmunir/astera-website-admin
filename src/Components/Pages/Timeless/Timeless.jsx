import React from "react";
import { FirstTitle } from "./FirstTitle";
import { Section1 } from "./Section1";
import Section2 from "./Section2";

export function Timeless() {
	return (
		<div className="h-[100vh]">
			<FirstTitle />
			<Section1 />
			<Section2/>
		</div>
	);
}
