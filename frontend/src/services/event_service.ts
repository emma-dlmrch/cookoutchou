import http from "../http_common";
import { Event } from "../models"

class EventDataService {
    getAll() {
        return http.get<Array<Event>>("/event/");
    }

    get(id: string) {
        return http.get<Event>(`/event/${id}`);
    }

    create(data: Event) {
        return http.post<Event>("/event/", data);
    }

    update(data: Event, id: any) {
        return http.patch<any>(`/event/${id}`, data);
    }

    delete(id: any) {
        return http.delete<any>(`/event/${id}`);
    }
}

export default new EventDataService();