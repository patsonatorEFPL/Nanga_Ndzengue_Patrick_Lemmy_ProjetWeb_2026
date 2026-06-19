import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Security } from '../../../../security/security';

@Component({
  selector: 'app-sign-up-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up-page.html',
  styleUrl: './sign-up-page.css',
})
export class SignUpPage {
  private readonly security = inject(Security);
  private readonly router = inject(Router);

  username = '';
  mail = '';
  password = '';
  error = signal('');
  success = signal('');

  signUp(): void {
    this.error.set('');
    this.success.set('');
    this.security
      .signUp({ username: this.username, mail: this.mail, password: this.password })
      .subscribe({
        next: () => {
          this.success.set('Compte créé, vous pouvez vous connecter.');
          this.router.navigate(['auth']);
        },
        error: () => this.error.set('Inscription impossible'),
      });
  }
}
