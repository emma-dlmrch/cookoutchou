import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import Header from "./layout/header";
import Footer from "./layout/footer";

import "./styles/app.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Router></Router>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
