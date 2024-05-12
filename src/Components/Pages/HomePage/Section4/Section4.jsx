
import Section1 from "./Title1";
import Section2 from "./Title2";
import Section3 from "./Title3";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";




    const HomePage = () => {

	const [section4Data, setSection4Data] = useState([]); 


		useEffect(() => {
			const fetchData = async () => {
				try {
					const response = await axios.get(
						"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
					);
					if (
						response.data &&
						response.data.data &&
						response.data.data.homePage &&
						response.data.data.homePage.section4 &&
						response.data.data.homePage.section4.length > 0
					) {
						const section4Data = response.data.data.homePage.section4;
						console.log("section4DataItem1", section4Data)
						setSection4Data(section4Data);
						
					}
				} catch (error) {
					console.error("Error fetching data:", error);
				}
			};
	
			fetchData();
		}, []);

		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://backend.asteraporcelain.com/api/v1/homescreen/getAllCollections"
				);
				if (
					response.data &&
					response.data.data &&
					response.data.data.homePage &&
					response.data.data.homePage.section4 &&
					response.data.data.homePage.section4.length > 0
				) {
					const section4Data = response.data.data.homePage.section4;
					console.log("section4Data", section4Data)
					setSection4Data(section4Data);
					
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

	return (
		<div>
			{section4Data.map((item, index) => (
			<Section1 index = {index} item={item} fetchData={fetchData}/>
			))}
            <Section2 fetchData={fetchData}/>
            {/* <Section3 /> */}
		</div>
	);	
}
export default HomePage;