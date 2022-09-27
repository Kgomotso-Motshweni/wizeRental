import { TestBed } from '@angular/core/testing';

import { NortificationsService } from './nortifications.service';

describe('NortificationsService', () => {
  let service: NortificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NortificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
