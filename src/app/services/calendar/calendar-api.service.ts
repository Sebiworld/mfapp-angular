import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiService } from "@services/api/api.service";
import { ApiCalendarEvent } from "./+store/api-calendar-event.model";

@Injectable({
  providedIn: 'root',
})
export class CalendarApiService extends ApiService {

  loadEvents(): Observable<{ events: ApiCalendarEvent[] }> {
    return this.get(this.baseUrl + 'calendar');
  }
}
