import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Token } from './security/token';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private token = inject(Token);
  private router = inject(Router);

  authenticated() {
    return this.token.isAuthenticated();
  }

  logout() {
    this.token.clear();
    this.router.navigate(['']);
  }
}
