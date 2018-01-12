import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/index';
import { DashboardRoutes } from './components/dashboard/dashboard.routes';
import { AuthenticateService } from './services/session/authenticate.service';

export const routes: Routes = [
	...DashboardRoutes,
	{ path: '**', component: LoginComponent, canActivate: [AuthenticateService] }
];
