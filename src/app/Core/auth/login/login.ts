import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { Auth } from '../../Services/Auth/auth';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, HlmToasterImports],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  logIn: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  onSubmit() {
    if (this.logIn.valid) {
      this.isLoading = true;
      this.auth.signIn(this.logIn.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);
          if (res.message === 'success') {
            localStorage.setItem('token', res.token);
            toast.success('Login successful!', {
              description: 'You have successfully logged in.',
              duration: 3000,
              closeButton: true,
            });
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          toast.error('Login failed!', {
            description: err.error.message,
            duration: 3000,
            closeButton: true,
          });
        },
      });
    }
    console.log(this.logIn.value);
  }
}
