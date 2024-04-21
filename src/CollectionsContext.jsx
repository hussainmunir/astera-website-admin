import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./api/base_urls";

const CollectionsContext = createContext();

export const useCollections = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }) => {
	const [collections, setCollections] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("CollectionsProvider useEffect"); // Log when useEffect is executed

		const fetchCollections = async () => {
			try {
				const response = await axios.get(
					`${baseUrl}homescreen/getAllCollections`
				);
				setCollections(response.data);
				setLoading(false); 
                // Set loading to false after data is fetched
			} catch (error) {
				console.error("Error fetching collections:", error);
				setLoading(false); // Set loading to false in case of error
			}
		};

		fetchCollections();
	}, []);

	// Log collections state
	console.log("CollectionsProvider collections:", collections.data);

	// Render children only after collections are loaded
	return (
		<CollectionsContext.Provider value={collections}>
			{!loading && children}
		</CollectionsContext.Provider>
	);
};

