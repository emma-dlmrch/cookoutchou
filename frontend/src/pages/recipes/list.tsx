import React from "react";
import { Link } from "react-router-dom";

import { Recipe } from "../../models";
import RecipeDetails from "./details";

function RecipesList() {
    const patate: Recipe = {
        name: "Patate",
        preparationTime: 20,
        cookingTime: 40,
        nbPeople: 3,
    };
    return (
        <div>
            <h1>Recipes !</h1>
            <p>
                <Link to="/recipes/create">Créer une nouvelle recette</Link>
            </p>
            <RecipeDetails data={patate} />
        </div>
    );
}
export default RecipesList;
