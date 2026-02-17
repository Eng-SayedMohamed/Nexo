import { Theme } from './../../../../../node_modules/ngx-sonner/lib/types.d';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { validators } from 'tailwind-merge';
import { Auth } from '../../Services/Auth/auth';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, HlmToasterImports],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  register: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-Z][\w!@#$%^&*]{6,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(\+20|0)1[0125]\d{8,10}$/),
      ]),
    },
    { validators: this.confirmPassword },
  );
  onSubmit() {
    if (this.register.valid) {
      this.isLoading = true;
      this.auth.signUp(this.register.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
          this.isLoading = false;
          console.log(res);
          if (res.message === 'success') {
            toast.success('Registration successful!', {
              description: 'You have successfully registered.',
              duration: 3000,
              closeButton: true,
            });
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          toast.error('Registration failed!', {
            description: err.error.message,
            duration: 3000,
            closeButton: true,
          });
        },
      });
    }
  }
  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value ? null : { mismatch: true };
  }
}
