import React from 'react';
import logo from './logo.svg';
import './App.css';

import RecipeDetails from './pages/recipe';
import {Recipe} from './models/event';

function App() {
  const patate: Recipe = {
    name: "Patate",
    duration: 20
  };

  return (
    <div className="App">
      <RecipeDetails data={patate} />
    </div>
  );
}

export default App;
