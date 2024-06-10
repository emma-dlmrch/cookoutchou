export interface RecipeCreationFirstStep {
    name: string;
    preparationTime?: number;
    cookingTime?: number;
    nbGuests: number;
}

export interface Recipe extends RecipeCreationFirstStep {
    ingredients?: Array<IngredientInRecipe>;
}

export interface Event {
    name: string;
    date: string;
    recipes: Array<Recipe>;
}

export interface Unit {
    name: string;
}

export interface Moment {
    name: string;
}

export interface SeasonalMonth {
    name: string;
}

export interface Ingredient {
    id: number;
    name: string;
    slug?: string;
    units?: Array<Unit>;
    months?: Array<SeasonalMonth>;
}

export interface IngredientInRecipe extends Ingredient {
    quantity: number;
    unit: string;
}
