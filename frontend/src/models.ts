export interface RecipeCreationFirstStep {
    name: string;
    preparationTime?: number;
    cookingTime?: number;
    nbGuests: number;
}

export interface Recipe extends RecipeCreationFirstStep {
    id: number;
    ingredients?: Array<IngredientInRecipe>;
}

export interface Event {
    id:number;
    name: string;
    startDate: Date;
    endDate: Date;
    meals?: Array<Meal>;
}

export interface Meal {
    id:number;
    name: string;
    date: Date;
    event?: Event;
    recipes?: Array<Recipe>;
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
