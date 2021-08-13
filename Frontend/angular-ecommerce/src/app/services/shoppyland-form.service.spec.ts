import { TestBed } from '@angular/core/testing';

import { ShoppylandFormService } from './shoppyland-form.service';

describe('ShoppylandFormService', () => {
  let service: ShoppylandFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppylandFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
