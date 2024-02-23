import { TestBed } from '@angular/core/testing';

import { NgxSamColorPickersService } from './ngx-sam-color-pickers.service';

describe('NgxSamColorPickersService', () => {
  let service: NgxSamColorPickersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSamColorPickersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
