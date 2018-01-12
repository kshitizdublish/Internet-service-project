import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeRoutes } from './home/home.routes';
import { CsupportRoutes } from './csupport/csupport.routes';
import { AuthenticateDashboardService } from '../../services/session/authenticatedashboard.service';
import { FeedbackRoutes } from './feedback/feedback.routes';
import { ContactRoutes } from './contacts/contacts.routes';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
			component: DashboardComponent,
			canActivate: [AuthenticateDashboardService],
    	children: [
				...HomeRoutes,
				...FeedbackRoutes,
				...ContactRoutes,
				...CsupportRoutes,
			]
  	}
];
