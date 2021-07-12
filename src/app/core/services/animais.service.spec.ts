/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimaisService } from './animais.service';

describe('Service: Animais', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimaisService]
    });
  });

  it('should ...', inject([AnimaisService], (service: AnimaisService) => {
    expect(service).toBeTruthy();
  }));
});
