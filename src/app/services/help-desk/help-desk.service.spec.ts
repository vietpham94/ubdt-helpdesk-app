/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HelpDeskService } from './help-desk.service';

describe('Service: HelpDesk', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpDeskService]
    });
  });

  it('should ...', inject([HelpDeskService], (service: HelpDeskService) => {
    expect(service).toBeTruthy();
  }));
});
