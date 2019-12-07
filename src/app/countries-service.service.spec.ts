import { TestBed } from '@angular/core/testing';

import { CountriesServiceService } from './countries-service.service';

describe('CountriesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountriesServiceService = TestBed.get(CountriesServiceService);
    expect(service).toBeTruthy();
  });
});
