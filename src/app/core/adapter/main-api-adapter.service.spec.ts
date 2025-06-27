import { TestBed } from '@angular/core/testing';

import { MainApiAdapterService } from './main-api-adapter.service';

describe('MainApiAdapterService', () => {
  let service: MainApiAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainApiAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
