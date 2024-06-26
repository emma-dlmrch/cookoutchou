import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import RecipesList from "./pages/recipes/list";
import EventsList from "./pages/events/list";
import IngredientsList from "./pages/ingredients/list";
import IngredientDetails from "./pages/ingredients/details";

import ErrorPage from "./components/error";
import RecipeCreateForm from "./pages/recipes/create_form";
import RecipeEditForm from "./pages/recipes/edit_form";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<RecipesList />} />
            <Route path="/recipes/create" element={<RecipeCreateForm />} />
            <Route path="/recipes/edit/:recipeId" element={<RecipeEditForm />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/ingredients" element={<IngredientsList />} />
            <Route path="/ingredient/:ingredientId" element={<IngredientDetails />} />
            <Route path="" element={<ErrorPage />} />
        </Routes>
    );
}

export default Router;
