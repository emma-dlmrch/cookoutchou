import React, { useEffect, useState } from "react";

import {
    Recipe,
    Ingredient,
    RecipeIngredient,
    NewRecipeIngredient,
    RecipeIngredientParameters,
    Unit,
} from "../../models";
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
    callback: (ingredient: RecipeIngredientParameters) => void;
}) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [ingredientSelected, setIngredientSelected] = useState<Ingredient>();
    const [unitsAvailable, setUnitsAvailable] = useState<Array<Unit>>([]);
    const [unitSelected, setUnitSelected] = useState<Unit>();
    const [quantity, setQuantity] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const changeIngredient = (e: any) => {
        const _ingredientId = parseInt(e.target.value, 10);
        setIngredientSelected(ingredients.find((ingredient) => ingredient.id === _ingredientId));
        setUnitSelected(undefined);
    };
    const changeQuantity = (e: any) => {
        setQuantity(parseFloat(e));
    };
    const changeUnit = (e: any) => {
        const _unitId = parseInt(e.target.value, 10);
        setUnitSelected(unitsAvailable.find((unit) => unit.id === _unitId));
    };

    const sendNewIngredient = () => {
        setErrorMessage("");
        if (!ingredientSelected) {
            setErrorMessage("Il faut sélectionner un ingrédient.");
            return;
        } else if (!quantity) {
            setErrorMessage("Il faut spécifier une quantité.");
            return;
        } else if (!unitSelected) {
            setErrorMessage("Il faut sélectionner une unité.");
            return;
        }
        const newRecipeIngredient: RecipeIngredientParameters = {
            ingredient: ingredientSelected.id,
            unit: unitSelected.id,
            quantity,
        };
        callback(newRecipeIngredient);
    };

    useEffect(() => {
        if (ingredientSelected?.units) {
            setUnitsAvailable(ingredientSelected.units);
            setUnitSelected(ingredientSelected.units[0]);
        }
    }, [ingredientSelected]);

    return isEditing ? (
        <>
            <p>
                <select onChange={changeIngredient}>
                    <option disabled selected>
                        Ingrédient
                    </option>
                    {ingredients.map((ingredient: Ingredient) => {
                        return (
                            <option value={ingredient.id} key={ingredient.id}>
                                {ingredient.name}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="number"
                    name="newIngredientQuantity"
                    id="newIngredientQuantity"
                    placeholder={"Quelle quantité ?"}
                    onChange={(e) => changeQuantity(e.target.value)}
                />
                <select value={unitSelected?.id ?? 0} onChange={changeUnit}>
                    <option disabled selected>
                        Unité
                    </option>
                    {unitsAvailable.map((unit: Unit) => {
                        return (
                            <option value={unit.id} key={unit.id}>
                                {unit.name}
                            </option>
                        );
                    })}
                </select>
                <button onClick={sendNewIngredient}>Valider</button>
                <button onClick={() => setIsEditing(false)}>Annuler</button>
            </p>
            {errorMessage && <p className="alert">{errorMessage}</p>}
        </>
    ) : (
        <span onClick={() => setIsEditing(true)}>
            <i className="bi bi-plus-circle-fill"></i> Ajouter un ingrédient
        </span>
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

    const addIngredient = (ingredient: RecipeIngredientParameters) => {
        const recipeIngredient: NewRecipeIngredient = {
            ...ingredient,
            recipe: recipe.id,
        };
        RecipeDataService.addIngredient(recipeIngredient).then((response: any) => {
            reloadRecipe();
        });
    };
    const removeIngredient = (ingredient: RecipeIngredient) => {
        RecipeDataService.removeIngredient(ingredient).then((response: any) => {
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
                    <AddIngredientForm ingredients={ingredients} callback={addIngredient} />
                    <ul>
                        {recipe.ingredients &&
                            recipe.ingredients.length > 0 &&
                            recipe.ingredients.map((ingredient) => {
                                return (
                                    <li key={ingredient.id}>
                                        {ingredient.ingredient.name} (
                                        {Intl.NumberFormat("fr-FR").format(ingredient.quantity)} {ingredient.unit.name}){" "}
                                        <i
                                            className="bi bi-x-circle-fill"
                                            onClick={() => removeIngredient(ingredient)}
                                        ></i>
                                    </li>
                                );
                            })}
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
                        <li>
                            <i className="bi bi-plus-circle-fill"></i> Ajouter une instruction
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default RecipeEditForm;
