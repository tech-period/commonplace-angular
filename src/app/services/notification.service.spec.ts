import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // MatSnackBarのスパイを作成
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('success', () => {
    it('正しいパラメータでsnackBarを呼び出すこと', () => {
      const message = 'テストメッセージ';
      service.success(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(
        message,
        '閉じる',
        {
          duration: 9000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        }
      );
    });
  });

  describe('error', () => {
    it('正しいパラメータでsnackBarを呼び出すこと', () => {
      const message = 'エラーメッセージ';
      service.error(message);

      expect(snackBarSpy.open).toHaveBeenCalledWith(
        message,
        '閉じる',
        {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        }
      );
    });
  });
});
