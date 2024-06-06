import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import RecipesList from "./pages/recipes/list";
import EventsList from "./pages/events/list";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<RecipesList />} />
      <Route path="/events" element={<EventsList />} />
    </Routes>
  );
}

export default Router;
