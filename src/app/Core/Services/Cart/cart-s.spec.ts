import { TestBed } from '@angular/core/testing';

import { CartS } from './cart-s';

describe('CartS', () => {
  let service: CartS;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartS);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
