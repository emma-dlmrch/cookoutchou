import React, { useState } from "react";

import { Recipe, RecipeCreationFirstStep, Moment, IngredientInRecipe } from "../../models";
import "../../styles/recipes.css";

function RecipeGeneralInfoForm({ callback }: { callback: (recipe: RecipeCreationFirstStep) => void }) {
    const [name, setName] = useState<string>("");
    const [nbPeople, setNbPeople] = useState<number>(3);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [cookingTime, setCookingTime] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const isValid = () => {
        if (name.trim() === "") {
            setErrorMessage("Un nom est obligatoire pour créer une recette !");
            return false;
        }
        if (nbPeople <= 0) {
            setErrorMessage("Le nombre de personnes doit être supérieur à 0.");
            return false;
        }
        return true;
    };

    const submit = (event: any) => {
        setErrorMessage("");
        event.preventDefault();
        if (!isValid()) {
            return;
        }
        const newRecipe: RecipeCreationFirstStep = {
            name,
            nbPeople,
        };
        if (preparationTime) {
            newRecipe.preparationTime = preparationTime;
        }
        if (preparationTime) {
            newRecipe.cookingTime = cookingTime;
        }
        callback(newRecipe);
    };

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <p>
                    <label htmlFor="name">Nom de la recette :</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </p>
                <p>
                    <label htmlFor="nb_people">Nombre de personnes :</label>
                    <input
                        type="number"
                        step="1"
                        min="1"
                        name="nb_people"
                        id="nb_people"
                        required
                        placeholder={nbPeople.toString()}
                        defaultValue={nbPeople}
                        onChange={(e) => setNbPeople(parseInt(e.target.value, 10))}
                    />
                </p>
                <p>
                    <label htmlFor="preparationTime">Durée de préparation (en min) :</label>
                    <input
                        type="number"
                        step="1"
                        name="preparationTime"
                        id="preparationTime"
                        placeholder={"20 minutes"}
                        onChange={(e) => setPreparationTime(parseInt(e.target.value, 10))}
                    />
                </p>
                <p>
                    <label htmlFor="cookingTime">Durée de cuisson (en min) :</label>
                    <input
                        type="number"
                        step="1"
                        name="cookingTime"
                        id="cookingTime"
                        placeholder={"20 minutes"}
                        onChange={(e) => setCookingTime(parseInt(e.target.value, 10))}
                    />
                </p>
                <p>
                    <input type="submit" value="Continuer" />
                </p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

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
                </ul>
            </div>
            <div>
                <h2>Informations</h2>
                <p>Nombre de personnes : {recipe.nbPeople}</p>
                <p>Durée de préparation : {recipe.preparationTime ? recipe.preparationTime : "non précisée"}</p>
                <p>Durée de cuisson : {recipe.cookingTime ? recipe.cookingTime : "non précisée"}</p>
            </div>
            <div className="recipe-instructions">
                <h2>Instructions</h2>
                <ol>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                    <li>Instruction 1</li>
                </ol>
            </div>
        </div>
    );
}

function RecipeForm({ create = true, recipeId = 0 }: { create?: boolean; recipeId?: number }) {
    const moments: Array<Moment> = [
        {
            name: "Petit-déjeuner",
        },
        {
            name: "Déjeuner",
        },
        {
            name: "Goûter",
        },
        {
            name: "Dîner",
        },
    ];
    const ingredients = [
        { slug: "patate", name: "Patate", quantity: 1, unit: "kg" },
        { slug: "huile-dolive", name: "Huile d'olive", quantity: 5, unit: "cuillère(s) à soupe" },
        { slug: "gros-sel", name: "Gros sel", quantity: 4, unit: "poignées" },
    ];

    const [recipe, setRecipe] = useState<Recipe>({ name: "", nbPeople: 3, ingredients });
    const [step, setStep] = useState<number>(create ? 1 : 2);

    const firstStep = (newRecipe: RecipeCreationFirstStep) => {
        setRecipe({
            ...recipe,
            ...newRecipe,
        });
        setStep(2);
    };

    const title = create ? "Créer une recette" : "Modifier une recette";
    return (
        <div>
            <h1>{title}</h1>
            {step === 1 && <RecipeGeneralInfoForm callback={firstStep} />}
            {step === 2 && <RecipeEditionForm recipe={recipe} />}
        </div>
    );
}

export default RecipeForm;
