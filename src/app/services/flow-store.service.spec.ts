import { TestBed } from '@angular/core/testing';

import { FlowStoreService } from './flow-store.service';

describe('FlowStoreService', () => {
  let service: FlowStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
