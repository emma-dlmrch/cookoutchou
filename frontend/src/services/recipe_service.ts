import http from "../http_common";
import { Recipe, RecipeCreationFirstStep } from "../models";

class RecipeDataService {
    getAll() {
        return http.get<Array<Recipe>>("/recipe/");
    }

    get(id: string) {
        return http.get<Recipe>(`/recipe/${id}`);
    }

    create(data: RecipeCreationFirstStep) {
        return http.post<RecipeCreationFirstStep>("/recipe/", data);
    }

    update(data: Recipe, id: any) {
        return http.patch<any>(`/recipe/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/recipe/${id}`);
    }
}

export default new RecipeDataService();
