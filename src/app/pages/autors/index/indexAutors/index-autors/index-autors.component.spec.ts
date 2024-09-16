import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAutorsComponent } from './index-autors.component';

describe('IndexAutorsComponent', () => {
  let component: IndexAutorsComponent;
  let fixture: ComponentFixture<IndexAutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAutorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
