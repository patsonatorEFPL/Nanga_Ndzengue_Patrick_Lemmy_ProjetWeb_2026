import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { Parking, ParkingPayload } from './model';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/parking';

  list() {
    return this.http
      .get<{ data: Parking[] }>(`${this.url}/list`)
      .pipe(map((r) => r.data));
  }

  detail(id: string) {
    return this.http
      .get<{ data: Parking }>(`${this.url}/detail/${id}`)
      .pipe(map((r) => r.data));
  }

  create(payload: ParkingPayload) {
    return this.http
      .post<{ data: Parking }>(`${this.url}/create`, payload)
      .pipe(map((r) => r.data));
  }

  update(id: string, payload: ParkingPayload) {
    return this.http
      .post<{ data: Parking }>(`${this.url}/update/${id}`, payload)
      .pipe(map((r) => r.data));
  }
}
