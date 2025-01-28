import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting,  } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', [], {
      token: 'test-token'
    });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([authInterceptor])
        ),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('トークンがある場合、Authorizationヘッダーを追加する', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpTestingController.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeTrue();
  });

  it('トークンがない場合、Authorizationヘッダーを追加しない', () => {
    Object.defineProperty(mockAuthService, 'token', {
      get: () => ''
    });

    httpClient.get('/api/test').subscribe();

    const req = httpTestingController.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });

  it('HTTPリクエストが正常に完了する', () => {
    const testData = { message: 'success' };

    httpClient.get('/api/test').subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush(testData);
  });

  it('エラーレスポンスを正しく処理する', () => {
    httpClient.get('/api/test').subscribe({
      error: error => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpTestingController.expectOne('/api/test');
    req.flush('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized'
    });
  });
});
