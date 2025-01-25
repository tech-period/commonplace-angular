import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: '' }
];
