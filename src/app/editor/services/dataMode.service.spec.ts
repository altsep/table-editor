import { TestBed } from '@angular/core/testing';

import { DataModeService } from './dataMode.service';

describe('DataModeService', () => {
  let service: DataModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
