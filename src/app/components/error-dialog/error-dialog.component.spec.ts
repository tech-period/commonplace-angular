import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ErrorDialogComponent', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;

  const mockDialogData = {
    title: 'テストエラー',
    message: 'テストエラーメッセージ'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorDialogComponent, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error title and message', () => {
    const titleElement = fixture.debugElement.query(By.css('h2'));
    const messageElement = fixture.debugElement.query(By.css('p'));

    expect(titleElement.nativeElement.textContent.trim()).toBe(mockDialogData.title);
    expect(messageElement.nativeElement.textContent.trim()).toBe(mockDialogData.message);
  });

  it('should have close button', () => {
    const closeButton = fixture.debugElement.query(By.css('button'));
    expect(closeButton).toBeTruthy();
    expect(closeButton.nativeElement.textContent).toContain('閉じる');
  });
});
