import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Auth } from '../../Services/Auth/auth';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { toast } from 'ngx-sonner';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, HlmToasterImports],
  templateUrl: './forgot.html',
  styleUrl: './forgot.css',
})
export class Forgot {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(Auth);
  private readonly cookieService = inject(CookieService);
  private readonly Router = inject(Router);
  step: WritableSignal<number> = signal(1);
  email: WritableSignal<string> = signal('');
  flaq: WritableSignal<boolean> = signal(false);
  verifyEmail: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });
  verifyCode: FormGroup = this.fb.group({
    resetCode: [null, [Validators.required]],
  });
  resetPassword: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.minLength(8)]],
    newPassword: [null, [Validators.required]],
  });
  step1() {
    if (this.verifyEmail.valid) {
      this.auth.forgotPassword(this.verifyEmail.value).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            this.email.set(this.verifyEmail.value.email);
            this.step.set(2);
          }
          toast.success(res.message, {
            description: 'Please check your email for the reset code.',
          });
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          toast.error(err.error.message, {
            description: 'Please try again.',
          });
        },
      });
    }
  }
  step2() {
    if (this.verifyCode.valid) {
      this.auth.verifyResetCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);

          if (res.status === 'Success') {
            this.step.set(3);
          }
          toast.success(res.message, {
            description: 'Reset code verified. Please enter your new password.',
          });
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          toast.error(err.error.message, {
            description: 'Please try again.',
          });
        },
      });
    }
    console.log(this.email());
  }
  step3() {
    if (this.resetPassword.valid) {
      this.auth.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.cookieService.set('token', res.token);
            toast.success(res.message, {
              description: 'Password reset successful. Redirecting to Home Page.',
            });
            setTimeout(() => {
              this.Router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          console.log(err);
          toast.error(err.error.message, {
            description: 'Please try again.',
          });
        },
      });
    }
  }
}
