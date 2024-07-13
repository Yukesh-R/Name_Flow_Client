import { TestBed } from '@angular/core/testing';

import { UserService } from './user-services.service';

describe('UserServicesService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
