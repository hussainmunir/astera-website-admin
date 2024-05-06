import { SectionTop } from "./SectionTop";
import {Section1} from "./Section1";
import {Section2} from "./Section2";
import Section3 from "./Section3";
import Section5 from "./Section5";
import Section4 from "./Section4/Section4";
import Section6 from "./Section6";
import TitlePage from "./TitlePage";


export function HomePage() {
	return (
		<div>
			<TitlePage />
			<SectionTop />
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
			<Section5 />
			<Section6 />
		</div>
	);	
}
