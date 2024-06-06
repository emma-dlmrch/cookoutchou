import React from "react";
import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import Header from "./layout/header";
import Footer from "./layout/footer";

import "./App.css";

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
