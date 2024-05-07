import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from './Components/Pages/HomePage/HomePage';
import { Navbar } from './Components/Pages/Navbar/NavBar';
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
import { Login } from './Components/Pages/LogIN/login';

import { useState, useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
	const jwt = localStorage.getItem("jwt");
    useEffect(() => {
		console.log("localStorage.getItem", localStorage.getItem("jwt"))
        if (jwt) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []); 

    return (
        <BrowserRouter>
            <CollectionsProvider>
			{isLoggedIn ? <Navbar /> : null }
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/collection" element={isLoggedIn ? <Collection /> : <Navigate to="/login" />} />
                    <Route path="/newcollection" element={isLoggedIn ? <NewCollection /> : <Navigate to="/login" />} />
                    <Route path="/novelties" element={isLoggedIn ? <Novelties /> : <Navigate to="/login" />} />
                    <Route path="/timeless" element={isLoggedIn ? <Timeless /> : <Navigate to="/login" />} />
                    <Route path="/contact" element={isLoggedIn ? <Contactus /> : <Navigate to="/login" />} />
                    <Route path="/discover" element={isLoggedIn ? <Discover /> : <Navigate to="/login" />} />
                    <Route path="/catalog" element={isLoggedIn ? <Catalog /> : <Navigate to="/login" />} />
                    <Route path="/product" element={isLoggedIn ? <Product /> : <Navigate to="/login" />} />
                    <Route path="/event" element={isLoggedIn ? <Event /> : <Navigate to="/login" />} />
                    <Route path="/privacyPolicy" element={isLoggedIn ? <PrivacyPolicy /> : <Navigate to="/login" />} />
                    <Route path="/termsAndConditions" element={isLoggedIn ? <TermsAndConditions /> : <Navigate to="/login" />} />
                    <Route path="/notFound" element={isLoggedIn ? <NotFound /> : <Navigate to="/login" />} />
                    <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/login" />} />
                </Routes>
            </CollectionsProvider>
        </BrowserRouter>
    );
}

export default App;