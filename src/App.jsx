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

function App() {

  return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/collection" element={<Collection />} />
				<Route path="/newcollection" element={<NewCollection />} />
				<Route path="/novelties" element={<Novelties />} />
				<Route path="/timeless" element={<Timeless />} />
				<Route path="/contact" element={<Contactus />} />
				<Route path="/discover" element={<Discover/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App

