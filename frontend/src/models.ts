export interface RecipeCreationFirstStep {
    name: string;
    preparationTime?: number;
    cookingTime?: number;
    nbGuests: number;
}

export interface Recipe extends RecipeCreationFirstStep {
    id: number;
    ingredients?: Array<RecipeIngredient>;
}

export interface Event {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    meals?: Array<Meal>;
}

export interface Meal {
    id: number;
    name: string;
    date: Date;
    event?: Event;
    recipes?: Array<Recipe>;
}

export interface Unit {
    id: number;
    name: string;
}

export interface Moment {
    name: string;
}

export interface SeasonalMonth {
    id: number;
    name: string;
}

export interface Ingredient {
    id: number;
    name: string;
    slug?: string;
    units?: Array<Unit>;
    months?: Array<SeasonalMonth>;
}

export interface RecipeIngredient {
    id?: number;
    recipe: Recipe;
    ingredient: Ingredient;
    quantity: number;
    unit: Unit;
}
export interface RecipeIngredientParameters {
    ingredient: number;
    quantity: number;
    unit: number;
}
export interface NewRecipeIngredient extends RecipeIngredientParameters {
    recipe: number;
}
