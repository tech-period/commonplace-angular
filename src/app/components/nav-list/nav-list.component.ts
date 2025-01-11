import { Component, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-nav-list',
  imports: [
    MatListModule,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  
  sampleList: Signal<string[]>;

  constructor(
    private router: Router,
  ) {
    const routePaths = routes
      .map(r => r.path)
      .filter((p): p is string => p != '**' && p !== '')
    this.sampleList = signal(routePaths);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
