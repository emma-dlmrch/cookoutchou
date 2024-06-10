import React from "react";

import { Recipe } from "../../models";

function RecipeDetails({ data }: { data: Recipe }) {
    return (
        <div className="App">
            Nom: {data.name}
            <br />
            preparationTime: {data.preparationTime}
            <br />
            cookingTime: {data.cookingTime}
            <br />
            nbGuests: {data.nbGuests}
        </div>
    );
}

export default RecipeDetails;
