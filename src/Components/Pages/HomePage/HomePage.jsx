import Section1 from "./Section1"
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section6 from "./Section6";
import Section5 from "./Section5/Title1";
import Section7 from "./Section7";
import TitlePage from "./TitlePage";


export function HomePage() {
	return (
		<div>
            <TitlePage />
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
			<Section5 />
			<Section6 />
			<Section7 />
		</div>
	);	
}
