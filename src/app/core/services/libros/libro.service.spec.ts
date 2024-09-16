/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LibroService } from './libro.service';

describe('Service: Libro', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibroService]
    });
  });

  it('should ...', inject([LibroService], (service: LibroService) => {
    expect(service).toBeTruthy();
  }));
});
