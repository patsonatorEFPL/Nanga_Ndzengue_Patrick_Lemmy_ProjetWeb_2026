import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential, Session, SignInPayload, SignupPayload } from './model';

@Service()
export class Security {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/security';

  signIn(payload: SignInPayload): Observable<Session> {
    return this.http.post<Session>(`${this.url}/sign-in`, payload);
  }

  signUp(payload: SignupPayload): Observable<Credential> {
    return this.http.post<Credential>(`${this.url}/sign-up`, payload);
  }

  me(): Observable<Credential> {
    return this.http.get<Credential>(`${this.url}/me`);
  }
}
