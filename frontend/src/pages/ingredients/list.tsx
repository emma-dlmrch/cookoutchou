import React, { useEffect, useState } from "react";

import { Ingredient } from "../../models";
import IngredientDetails from "./details";

import IngredientDataService from "../../services/ingredient_service";

function IngredientsList() {
    const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);

    useEffect(() => {
        getAllIngredients();
    }, []);

    const getAllIngredients = () => {
        IngredientDataService.getAll()
            .then((response: any) => {
                setIngredients(response.data.results);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            <h1>Ingredients !</h1>
            {ingredients.map((ingredient) => {
                return (
                    <p>
                        {ingredient.name} ({ingredient.id})
                    </p>
                );
            })}
        </div>
    );
}
export default IngredientsList;
