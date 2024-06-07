import React from "react";

import { Recipe } from "../../models";

function RecipeDetails({ data }: { data: Recipe }) {
  return (
    <div className="App">
      Nom: {data.name}
      <br />
      Duration: {data.duration}
    </div>
  );
}

export default RecipeDetails;
