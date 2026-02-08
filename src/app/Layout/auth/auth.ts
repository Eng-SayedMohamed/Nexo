import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../Shared/Components/navbar/navbar';
import { Footer } from '../../Shared/Components/footer/footer';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
