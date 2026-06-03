import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Security } from '../../security';
import { Token } from '../../token';
import { Credential } from '../../model';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  private readonly security = inject(Security);
  private readonly token = inject(Token);
  private readonly router = inject(Router);

  user = signal<Credential | null>(null);

  constructor() {
    this.security.me().subscribe({
      next: (credential) => this.user.set(credential),
    });
  }

  logout(): void {
    this.token.clear();
    this.router.navigate(['']);
  }
}
