import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from '../models/auth/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<AuthUser | null>(null);
  user$ = this.userSubject.asObservable();
  isAuthenticated$: Observable<boolean>;

  constructor(
    private router: Router,
  ) {
    this.isAuthenticated$ = this.user$.pipe(
      map(user => !!user)
    );
  }

  get token(): string {
    return '';
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.router.navigate(['/']);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }
}
