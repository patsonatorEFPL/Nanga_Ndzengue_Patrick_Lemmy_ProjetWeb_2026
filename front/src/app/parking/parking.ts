import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Parking } from './model';

interface ApiResponse<T> {
  data: T;
  result: unknown;
  validationErrors: unknown;
}

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/parking';

  list(): Observable<Parking[]> {
    return this.http
      .get<ApiResponse<Parking[]>>(`${this.url}/list`)
      .pipe(map((res) => res.data));
  }

  detail(id: string): Observable<Parking> {
    return this.http
      .get<ApiResponse<Parking>>(`${this.url}/detail/${id}`)
      .pipe(map((res) => res.data));
  }
}
