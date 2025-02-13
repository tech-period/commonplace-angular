import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { ViewportService } from '../../services/viewport.service';
import { RoutingService } from '../../services/routing.service';
import { AngularIconComponent } from "../angular-icon/angular-icon.component";

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AngularIconComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  isSmall$: Observable<boolean>;

  constructor(
    private router: RoutingService,
    private viewPortService: ViewportService,
  ) {
    this.isSmall$ = this.viewPortService.isSmall$;
  }

  onClickShowSidenavIcon(): void {
    this.toggleSidenav.emit();
  }

  navigateTo(route: string): void {
    this.router.navigateTo(route);
  }
}
