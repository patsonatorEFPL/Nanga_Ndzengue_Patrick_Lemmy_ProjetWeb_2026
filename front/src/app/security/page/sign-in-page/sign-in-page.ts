import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Security } from '../../security';
import { Token } from '../../token';

@Component({
  selector: 'app-sign-in-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in-page.html',
})
export class SignInPage {
  private readonly security = inject(Security);
  private readonly token = inject(Token);
  private readonly router = inject(Router);

  username = '';
  password = '';
  error = signal('');

  signIn(): void {
    this.security
      .signIn({ username: this.username, password: this.password })
      .subscribe({
        next: (session) => {
          this.token.set(session.token);
          this.router.navigate(['dashboard']);
        },
        error: () => this.error.set('Identifiants invalides'),
      });
  }
}
