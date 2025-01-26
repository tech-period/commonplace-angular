import { Component, Signal, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { routes } from '../../app.routes';
import { RoutingService } from '../../services/routing.service';

@Component({
  selector: 'app-nav-list',
  imports: [
    MatDividerModule,
    MatListModule,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss'
})
export class NavListComponent {
  
  sampleList: Signal<string[]>;

  constructor(
    private router: RoutingService,
  ) {
    const routePaths = routes
      .map(r => r.path)
      .filter((p): p is string => p != '**' && p !== '')
    this.sampleList = signal(routePaths);
  }

  navigateTo(path: string): void {
    this.router.navigateTo(path);
  }
}
