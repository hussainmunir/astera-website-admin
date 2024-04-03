import Section1 from "./Section1"
import Section2 from "./Section2";
import TitlePage from "./TitlePage";


export function HomePage() {
	return (
		<div>
            <TitlePage />
			<Section1 />
			<Section2 />
		</div>
	);
}
