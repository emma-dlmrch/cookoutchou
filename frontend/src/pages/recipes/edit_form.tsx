import React, { useEffect, useState } from "react";

import { Recipe, Ingredient, RecipeIngredient, NewRecipeIngredient } from "../../models";
import RecipeDataService from "../../services/recipe_service";
import IngredientDataService from "../../services/ingredient_service";

import "../../styles/recipes.css";
import { useParams } from "react-router-dom";

function ShowRecipeIngredient({ recipeIngredient }: { recipeIngredient: RecipeIngredient }) {
    return (
        <>
            {recipeIngredient.ingredient.name} : {recipeIngredient.quantity} {recipeIngredient.unit}
        </>
    );
}

function AddIngredientForm({
    ingredients,
    callback,
}: {
    ingredients: Array<Ingredient>;
    callback: (ingredient: Ingredient) => void;
}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ingredientSelected, setIngredientSelected] = useState<Ingredient>(ingredients[0]);

    const changeIngredient = (e: any) => {
        const _ingredientNumber = Math.max(Math.min(parseInt(e.target.value, 10), ingredients.length - 1), 0);
        setIngredientSelected(ingredients[_ingredientNumber]);
    };

    useEffect(() => {
        setIngredientSelected(ingredients[0]);
    }, [ingredients]);

    return isEditing ? (
        <p>
            <select onChange={changeIngredient}>
                {ingredients.map((ingredient: Ingredient, i: number) => {
                    return (
                        <option value={i} key={ingredient.id}>
                            {ingredient.name}
                        </option>
                    );
                })}
            </select>
            <button onClick={() => callback(ingredientSelected)}>Valider</button>
            <button onClick={() => setIsEditing(false)}>Annuler</button>
        </p>
    ) : (
        <span onClick={() => setIsEditing(true)}>+ Ajouter un ingrédient</span>
    );
}

function RecipeEditForm() {
    const params = useParams();
    const recipeId = parseInt(params.recipeId ?? "0", 10);

    const [recipe, setRecipe] = useState<Recipe>({ id: 0, name: "", nbGuests: 3, ingredients: [] });
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

    const reloadRecipe = () => {
        RecipeDataService.get(recipeId).then((response) => {
            setRecipe(response.data);
        });
    };
    useEffect(() => {
        reloadRecipe();
        IngredientDataService.getAll().then((response: any) => {
            setIngredients(response.data.results);
        });
    }, [recipeId]);

    const addIngredient = (ingredient: Ingredient) => {
        const recipeIngredient: NewRecipeIngredient = {
            recipe: recipe.id,
            ingredient: ingredient.id,
            quantity: 1,
            unit: 1,
        };
        RecipeDataService.addIngredient(recipeIngredient).then((response: any) => {
            reloadRecipe();
        });
    };

    const title = "Modifier une recette";
    return (
        <div>
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
                                    <li key={ingredient.id}>
                                        {ingredient.ingredient.name} ({ingredient.quantity} {ingredient.unit.name})
                                    </li>
                                );
                            })}
                    </ul>
                    <AddIngredientForm ingredients={ingredients} callback={addIngredient} />
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
        </div>
    );
}

export default RecipeEditForm;
