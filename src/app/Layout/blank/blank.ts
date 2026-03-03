import { Component } from '@angular/core';
import { Navbar } from '../../Shared/Components/navbar/navbar';
import { Footer } from '../../Shared/Components/footer/footer';
import { RouterOutlet } from '@angular/router';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-blank',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './blank.html',
  styleUrl: './blank.css',
})
export class Blank {}
