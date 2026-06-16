import { Routes } from '@angular/router';
import { SignInPage } from './security/page/sign-in-page/sign-in-page';
import { SignUpPage } from './security/page/sign-up-page/sign-up-page';
import { DashboardPage } from './security/page/dashboard-page/dashboard-page';
import { ParkingListPage } from './parking/page/list-page/list-page';
import { ParkingDetailPage } from './parking/page/detail-page/detail-page';
import { ParkingCreatePage } from './parking/page/create-page/create-page';
import { ParkingEditPage } from './parking/page/edit-page/edit-page';
import { authGuard } from './security/auth-guard';

export const routes: Routes = [
  { path: '', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  { path: 'parking', component: ParkingListPage, canActivate: [authGuard] },
  { path: 'parking/new', component: ParkingCreatePage, canActivate: [authGuard] },
  { path: 'parking/:id/edit', component: ParkingEditPage, canActivate: [authGuard] },
  { path: 'parking/:id', component: ParkingDetailPage, canActivate: [authGuard] },
];
