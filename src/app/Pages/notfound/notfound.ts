import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  imports: [TranslatePipe],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {
  private readonly location = inject(Location);
  goBack(): void {
    this.location.back();
  }
}
