import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAutorComponent } from './form-autor.component';

describe('FormAutorComponent', () => {
  let component: FormAutorComponent;
  let fixture: ComponentFixture<FormAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
