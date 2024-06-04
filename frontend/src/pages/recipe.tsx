import React from 'react';
import logo from '../logo.svg';
import '../App.css';

import {Recipe} from '../models/event';

function RecipeDetails({data}: {data:Recipe}) {
  return (
    <div className="App">
      Nom: {data.name}
      <br />
      Duration: {data.duration}
    </div>
  );
}

export default RecipeDetails;
