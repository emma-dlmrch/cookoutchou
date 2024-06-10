import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Recipe } from "../../models";
import RecipeDataService from "../../services/recipe_service";

import "../../styles/recipes.css";

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
            <div className="recipes-list">
                {recipes.map((recipe) => {
                    return (
                        <div>
                            <p>
                                <Link to={"/recipes/edit/" + recipe.id}>
                                    <strong>{recipe.name}</strong> <br />
                                    pour {recipe.nbGuests} invité(e)s
                                </Link>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default RecipesList;
