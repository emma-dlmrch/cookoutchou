export interface Recipe {
    name : string,
    duration : number
}

export interface Event {
    name : string,
    date : string,
    recipes: Array<Recipe>
}

