import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NavListComponent } from './components/nav-list/nav-list.component';
import { ViewportService } from './services/viewport.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    NavbarComponent,
    NavListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isShowSidenav$: Observable<boolean>;
  isSidenavOpen$ = new BehaviorSubject<boolean>(true);

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
}
