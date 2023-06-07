import { TestBed } from '@angular/core/testing';

import { DataFormatService } from './dataFormat.service';

describe('DataFormatService', () => {
  let service: DataFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
