import React from "react";
import "../App.css";

import { Recipe } from "../../models";
import RecipeDetails from "./details";

function RecipesList() {
  const patate: Recipe = {
    name: "Patate",
    duration: 20,
  };
  return (
    <div>
      <h1>Recipes !</h1>
      <RecipeDetails data={patate} />
    </div>
  );
}
export default RecipesList;
