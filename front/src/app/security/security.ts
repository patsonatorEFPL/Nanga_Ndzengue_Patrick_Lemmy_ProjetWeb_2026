import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Credential, Session, SignInPayload, SignUpPayload } from './model';

interface ApiResponse<T> {
  data: T;
  result: unknown;
  validationErrors: unknown;
}

@Injectable({ providedIn: 'root' })
export class Security {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/security';

  signIn(payload: SignInPayload): Observable<Session> {
    return this.http
      .post<ApiResponse<Session>>(`${this.url}/sign-in`, payload)
      .pipe(map((res) => res.data));
  }

  signUp(payload: SignUpPayload): Observable<Credential> {
    return this.http
      .post<ApiResponse<Credential>>(`${this.url}/sign-up`, payload)
      .pipe(map((res) => res.data));
  }

  me(): Observable<Credential> {
    return this.http
      .get<ApiResponse<Credential>>(`${this.url}/me`)
      .pipe(map((res) => res.data));
  }
}
