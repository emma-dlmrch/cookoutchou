export interface Recipe {
    name : string,
    duration : number
}

export interface Event {
    name : string,
    date : string,
    recipes: Array<Recipe>
}


export interface Unit {
    name : string
}


export interface SeasonalMonth {
    name : string
}



export interface Ingredient {
    id : number,
    name : string,
    slug? : string,
    units? : Array<Unit>,
    months? : Array<SeasonalMonth>
}

