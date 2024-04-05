import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './Components/Pages/HomePage/HomePage'
import { Navbar } from './Components/Pages/Navbar/NavBar'
import { Collection } from './Components/Pages/Collection/Collection';
import { NewCollection } from './Components/Pages/NewCollection/NewCollection';

function App() {

  return (
    <BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/" element={<HomePage/>} />
				<Route path="/collection" element={<Collection />} />
				<Route path="/newcollection" element={<NewCollection/>} />
			</Routes>
		</BrowserRouter>
  )
}

export default App

