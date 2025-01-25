import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        LoginComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.loginForm.get('employeeCode')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have invalid form when only employeeCode is filled', () => {
    const employeeCode = component.loginForm.get('employeeCode');
    employeeCode?.setValue('test');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have invalid form when password is less than 8 characters', () => {
    const form = component.loginForm;
    form.get('employeeCode')?.setValue('test');
    form.get('password')?.setValue('1234567');
    expect(form.valid).toBeFalsy();
  });

  it('should have valid form when both fields are properly filled', () => {
    const form = component.loginForm;
    form.get('employeeCode')?.setValue('test');
    form.get('password')?.setValue('12345678');
    expect(form.valid).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(console, 'log');
    const form = component.loginForm;
    form.get('employeeCode')?.setValue('test');
    form.get('password')?.setValue('12345678');
    
    component.onSubmit();
    
    expect(console.log).toHaveBeenCalledWith({
      employeeCode: 'test',
      password: '12345678'
    });
  });
});
