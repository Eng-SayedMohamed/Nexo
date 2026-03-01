import { RouterLink } from '@angular/router';
import { BrandsService } from './../../Core/Services/Brands/brands';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IBrand } from '../../Shared/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandsService = inject(BrandsService);
  BrandsData: WritableSignal<IBrand[]> = signal([]);
  ngOnInit(): void {
    this.getBrands();
  }
  getBrands() {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.BrandsData.set(res.data);
      },
    });
  }
}
