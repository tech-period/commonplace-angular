import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { DriveComponent } from './pages/drive/drive.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'summary', component: SummaryComponent, canActivate: [authGuard] },
  { path: 'drive', component: DriveComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
