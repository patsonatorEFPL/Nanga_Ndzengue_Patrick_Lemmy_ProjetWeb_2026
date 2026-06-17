import { Component, inject, signal } from '@angular/core';
import { Security } from '../../security';
import { Credential } from '../../model';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  private security = inject(Security);

  user = signal<Credential | null>(null);

  constructor() {
    this.security.me().subscribe((credential) => this.user.set(credential));
  }
}
