import http from "../http_common";
import { Recipe, RecipeCreationFirstStep, NewRecipeIngredient } from "../models";

class RecipeDataService {
    getAll() {
        return http.get<Array<Recipe>>("/recipe/");
    }

    get(id: number) {
        return http.get<Recipe>(`/recipe/${id}`);
    }

    create(data: RecipeCreationFirstStep) {
        return http.post<RecipeCreationFirstStep>("/recipe/", data);
    }

    update(data: Recipe, id: number) {
        return http.patch<any>(`/recipe/${id}`, data);
    }

    delete(id: number) {
        return http.delete<any>(`/recipe/${id}`);
    }

    addIngredient(recipeIngredient: NewRecipeIngredient) {
        return http.post<any>("/recipe-ingredient/", recipeIngredient);
    }
}

export default new RecipeDataService();
