import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './Components/Pages/HomePage/HomePage'
import { Navbar } from './Components/Pages/Navbar/NavBar'
import { Collection } from './Components/Pages/Collection/Collection';
import { NewCollection } from './Components/Pages/NewCollection/NewCollection';
import { Novelties } from "./Components/Pages/Novelties/Novelties";
import { Timeless } from './Components/Pages/Timeless/Timeless';
import { Contactus } from './Components/Pages/Contactus/Contactus';
import { Discover } from './Components/Pages/Discover/Discover';
import { Catalog } from './Components/Pages/Catalog.jsx/Catalog';
import { CollectionsProvider } from "./CollectionsContext";
import { Product } from './Components/Pages/Product/Product';
import { Event } from './Components/Pages/Event/Event';
import { PrivacyPolicy } from './Components/Pages/PrivacyPolicy/PrivacyPolicy';
import { TermsAndConditions } from './Components/Pages/TermsAndConditions/TermsAndConditions';
import { NotFound } from './Components/Pages/NotFound/NotFound';
import { Blog } from './Components/Pages/Blog/Blog';

function App() {

	return (
		<BrowserRouter>
			<CollectionsProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/newcollection" element={<NewCollection />} />
					<Route path="/novelties" element={<Novelties />} />
					<Route path="/timeless" element={<Timeless />} />
					<Route path="/contact" element={<Contactus />} />
					<Route path="/discover" element={<Discover />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/product" element={<Product />} />
					<Route path="/event" element={<Event />} />
					<Route path="/privacyPolicy" element={<PrivacyPolicy />} />
					<Route path="/termsAndConditions" element={<TermsAndConditions />} />
					<Route path="/notFound" element={<NotFound />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</CollectionsProvider>
		</BrowserRouter>
	);
}

export default App

