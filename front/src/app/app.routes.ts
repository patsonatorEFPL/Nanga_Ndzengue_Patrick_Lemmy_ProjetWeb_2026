import { Routes } from '@angular/router';
import { DashboardPage } from './security/page/dashboard-page/dashboard-page';
import { ParkingListPage } from './parking/page/list-page/list-page';
import { ParkingDetailPage } from './parking/page/detail-page/detail-page';
import { ParkingCreatePage } from './parking/page/create-page/create-page';
import { ParkingEditPage } from './parking/page/edit-page/edit-page';
import { MainFallBackPage } from './shared/ui/page/main-fall-back-page/main-fall-back-page';
import { authGuard } from './security/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.routes').then((m) => m.authRoutes),
  },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  { path: 'parking', component: ParkingListPage, canActivate: [authGuard] },
  { path: 'parking/new', component: ParkingCreatePage, canActivate: [authGuard] },
  { path: 'parking/:id/edit', component: ParkingEditPage, canActivate: [authGuard] },
  { path: 'parking/:id', component: ParkingDetailPage, canActivate: [authGuard] },
  { path: '**', component: MainFallBackPage },
];
