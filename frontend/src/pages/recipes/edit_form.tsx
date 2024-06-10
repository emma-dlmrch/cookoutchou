import React, { useEffect, useState } from "react";

import { Recipe, RecipeCreationFirstStep, Moment, IngredientInRecipe } from "../../models";
import RecipeDataService from "../../services/recipe_service";

import "../../styles/recipes.css";
import { useParams } from "react-router-dom";

function ShowIngredientInRecipe({ ingredient }: { ingredient: IngredientInRecipe }) {
    return (
        <>
            {ingredient.name} : {ingredient.quantity} {ingredient.unit}
        </>
    );
}

function RecipeEditionForm({ recipe }: { recipe: Recipe }) {
    return (
        <div className="recipe-edition">
            <div className="recipe-title">
                <h1>Votre recette</h1>
                <h2>{recipe.name}</h2>
            </div>
            <div>
                <h2>Ingrédients</h2>
                <ul>
                    {recipe.ingredients &&
                        recipe.ingredients.length > 0 &&
                        recipe.ingredients.map((ingredient) => {
                            return (
                                <li>
                                    <ShowIngredientInRecipe ingredient={ingredient} />
                                </li>
                            );
                        })}
                    <li>+ Ajouter un ingrédient</li>
                </ul>
            </div>
            <div>
                <h2>Informations</h2>
                <p>Nombre de personnes : {recipe.nbGuests}</p>
                <p>Durée de préparation : {recipe.preparationTime ? recipe.preparationTime : "non précisée"}</p>
                <p>Durée de cuisson : {recipe.cookingTime ? recipe.cookingTime : "non précisée"}</p>
            </div>
            <div className="recipe-instructions">
                <h2>Instructions</h2>
                <ol>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>+ Ajouter une instruction</li>
                </ol>
            </div>
        </div>
    );
}

function RecipeEditForm() {
    const params = useParams();
    const recipeId = parseInt(params.recipeId ?? "0", 10);

    const [recipe, setRecipe] = useState<Recipe>({ id: 0, name: "", nbGuests: 3, ingredients: [] });
    useEffect(() => {
        RecipeDataService.get(recipeId).then((response) => {
            setRecipe(response.data);
        });
    }, [recipeId]);

    const title = "Modifier une recette";
    return (
        <div>
            <h1>{title}</h1>
            <RecipeEditionForm recipe={recipe} />
        </div>
    );
}

export default RecipeEditForm;
