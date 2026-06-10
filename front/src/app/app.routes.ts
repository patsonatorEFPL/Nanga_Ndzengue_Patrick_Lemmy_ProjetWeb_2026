import { Routes } from '@angular/router';
import { SignInPage } from './security/page/sign-in-page/sign-in-page';
import { SignUpPage } from './security/page/sign-up-page/sign-up-page';
import { DashboardPage } from './security/page/dashboard-page/dashboard-page';
import { authGuard } from './security/auth-guard';

export const routes: Routes = [
  { path: '', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
];
