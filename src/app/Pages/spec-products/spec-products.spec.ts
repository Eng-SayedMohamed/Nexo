import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecProducts } from './spec-products';

describe('SpecProducts', () => {
  let component: SpecProducts;
  let fixture: ComponentFixture<SpecProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
