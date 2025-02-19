import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavListComponent } from './components/nav-list/nav-list.component';
import { ViewportService } from '@service/viewport.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatDividerModule,
    MatSidenavModule,
    NavbarComponent,
    NavListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isShowSidenav$: Observable<boolean>;
  isSidenavOpen$ = new BehaviorSubject<boolean>(false);

  constructor(
    private viewPortService: ViewportService,
  ) {
    this.isShowSidenav$ = combineLatest([
      this.viewPortService.isSmall$,
      this.isSidenavOpen$,
    ]).pipe(
      map(([isSmall, isSidenavOpen]) => !isSmall || isSidenavOpen),
    );
  }

  onToggleSidenav(): void {
    this.isSidenavOpen$.next(!this.isSidenavOpen$.value);
  }
}
