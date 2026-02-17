import { Theme } from './../../../../../node_modules/ngx-sonner/lib/types.d';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { validators } from 'tailwind-merge';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, HlmToasterImports],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  value!: string;
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
    console.log(this.register);
    toast.success('Registration successful!', {
      description: 'You have successfully registered.',
      duration: 3000,
      closeButton: true,
    });
  }
  confirmPassword(g: AbstractControl) {
    return g.get('password')?.value === g.get('rePassword')?.value ? null : { mismatch: true };
  }
}
