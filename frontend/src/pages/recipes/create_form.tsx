import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RecipeCreationFirstStep } from "../../models";
import RecipeDataService from "../../services/recipe_service";

import "../../styles/recipes.css";

function RecipeCreateForm() {
    // to redirect after creation is successful
    let navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [nbGuests, setNbGuests] = useState<number>(3);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [cookingTime, setCookingTime] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const isValid = () => {
        if (name.trim() === "") {
            setErrorMessage("Un nom est obligatoire pour créer une recette !");
            return false;
        }
        if (nbGuests <= 0) {
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
            nbGuests,
        };
        if (preparationTime) {
            newRecipe.preparationTime = preparationTime;
        }
        if (preparationTime) {
            newRecipe.cookingTime = cookingTime;
        }
        RecipeDataService.create(newRecipe)
            .then((response: any) => {
                navigate("/recipes/edit/" + response.data.id);
            })
            .catch((e: Error) => {
                console.log(e);
            });
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
                        placeholder={nbGuests.toString()}
                        defaultValue={nbGuests}
                        onChange={(e) => setNbGuests(parseInt(e.target.value, 10))}
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

export default RecipeCreateForm;
