import http from "../http_common";
import { Ingredient } from "../models"

class IngredientDataService {
    getAll() {
        return http.get<Array<Ingredient>>("/ingredient/");
    }

    get(id: string) {
        return http.get<Ingredient>(`/ingredient/${id}`);
    }

    create(data: Ingredient) {
        return http.post<Ingredient>("/ingredient/", data);
    }

    update(data: Ingredient, id: any) {
        return http.patch<any>(`/ingredient/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/ingredient/${id}`);
    }
}

export default new IngredientDataService();