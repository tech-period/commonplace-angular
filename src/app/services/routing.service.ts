import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
  ) { }

  navigateTo(path: string): void {
    console.log('Navigating to:', path);
    this.router.navigate([path]);
  }
}
