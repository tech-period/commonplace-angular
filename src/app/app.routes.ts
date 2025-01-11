import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SummaryComponent } from './pages/summary/summary.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: '' }
];
