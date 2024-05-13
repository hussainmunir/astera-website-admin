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
import { Catalog } from './Components/Pages/Catalog/Catalog';
import { CollectionsProvider } from "./CollectionsContext";
import { Product } from './Components/Pages/Product/Product';
import { Event } from './Components/Pages/Event/Event';
import { PrivacyPolicy } from './Components/Pages/PrivacyPolicy/PrivacyPolicy';
import { TermsAndConditions } from './Components/Pages/TermsAndConditions/TermsAndConditions';
import { NotFound } from './Components/Pages/NotFound/NotFound';
import { Blog } from './Components/Pages/Blog/Blog';
import { Login } from './Components/Pages/LogIN/login';
import { BlogDetail } from './Components/Pages/Blog/BlogDetail';

import { useState, useEffect } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        console.log("localStorage.getItem", localStorage.getItem("jwt"))
        const jwt = localStorage.getItem("jwt");

        if (jwt?.length > 0 && jwt !== "null") {
            console.log("coming in jwt", jwt)
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
        console.log("isLoggedIn", isLoggedIn)
    }, []);

    return (
        <BrowserRouter>
            <CollectionsProvider>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                // Log the value of isLoggedIn to confirm its value
                                console.log("User is logged in:", isLoggedIn) || <HomePage />
                            ) : (
                                // Log the value of isLoggedIn to confirm its value
                                console.log("User is not logged in:", isLoggedIn) || <Login />
                            )
                        }
                    />
                    <Route path="/collection" element={isLoggedIn ? <Collection /> : <Login />} />
                    <Route path="/newcollection" element={isLoggedIn ? <NewCollection /> : <Login />} />
                    <Route path="/novelties" element={isLoggedIn ? <Novelties /> : <Login />} />
                    <Route path="/timeless" element={isLoggedIn ? <Timeless /> : <Login />} />
                    <Route path="/contact" element={isLoggedIn ? <Contactus /> : <Login />} />
                    <Route path="/discover" element={isLoggedIn ? <Discover /> : <Login />} />
                    <Route path="/catalog" element={isLoggedIn ? <Catalog /> : <Login />} />
                    <Route path="/product" element={isLoggedIn ? <Product /> : <Login />} />
                    <Route path="/event" element={isLoggedIn ? <Event /> : <Login />} />
                    <Route path="/privacyPolicy" element={isLoggedIn ? <PrivacyPolicy /> : <Login />} />
                    <Route path="/termsAndConditions" element={isLoggedIn ? <TermsAndConditions /> : <Login />} />
                    <Route path="/notFound" element={isLoggedIn ? <NotFound /> : <Login />} />
                    <Route path="/blog" element={isLoggedIn ? <Blog /> : <Login />} />
                    <Route path="/BlogDetail/:id" element={isLoggedIn ? <BlogDetail /> : <Login />} />
                </Routes>
            </CollectionsProvider>
        </BrowserRouter>
    );
}

export default App;