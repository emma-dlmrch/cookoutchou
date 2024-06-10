import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Recipe } from "../../models";
import RecipeDetails from "./details";
import RecipeDataService from "../../services/recipe_service";

function RecipesList() {
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);

    useEffect(() => {
        getAllRecipes();
    }, []);

    const getAllRecipes = () => {
        RecipeDataService.getAll()
            .then((response: any) => {
                setRecipes(response.data.results);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            <h1>Recipes !</h1>
            <p>
                <Link to="/recipes/create">Créer une nouvelle recette</Link>
            </p>
            {recipes.map((recipe) => {
                return (
                    <p>
                        {recipe.name} pour {recipe.nbGuests} invité(e)s
                    </p>
                );
            })}
        </div>
    );
}
export default RecipesList;
