import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

import { NavListComponent } from './components/nav-list/nav-list.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    NavbarComponent,
    NavListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isSidenavOpened: boolean = false;
  constructor(
  ) {
  }
}
