import { Routes } from '@angular/router';
import { SignInPage } from './page/sign-in-page/sign-in-page';
import { SignUpPage } from './page/sign-up-page/sign-up-page';

export const authRoutes: Routes = [
  { path: '', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
];
