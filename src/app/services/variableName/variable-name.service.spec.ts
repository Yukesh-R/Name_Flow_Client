import { TestBed } from '@angular/core/testing';

import { VariableNameService } from './variable-name.service';

describe('VariableNameService', () => {
  let service: VariableNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
