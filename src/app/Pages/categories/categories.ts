import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Category } from '../../Core/Services/Categories/categories';
import { ICategory } from '../../Shared/interfaces/icategory';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly category = inject(Category);
  private readonly activatedRoute = inject(ActivatedRoute);
  categoriesData: WritableSignal<ICategory[]> = signal([]);
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.category.getCategories().subscribe({
      next: (res) => {
        this.categoriesData.set(res.data);
      },
    });
  }
}
