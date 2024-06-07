import React from "react";

import IngredientDetails from "./details";

function IngredientsList() {
  return (
    <div>
      <h1>Ingredients !</h1>
      <IngredientDetails ingredientId={1} />
    </div>
  );
}
export default IngredientsList;
