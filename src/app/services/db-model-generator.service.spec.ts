import { TestBed } from '@angular/core/testing';

import { DbModelGeneratorService } from './db-model-generator.service';

describe('DbModelGeneratorService', () => {
  let service: DbModelGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbModelGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
