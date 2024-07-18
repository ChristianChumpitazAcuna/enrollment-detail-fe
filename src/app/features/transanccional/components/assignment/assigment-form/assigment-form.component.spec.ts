import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentFormComponent } from './assigment-form.component';

describe('AssigmentFormComponent', () => {
  let component: AssigmentFormComponent;
  let fixture: ComponentFixture<AssigmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssigmentFormComponent]
    });
    fixture = TestBed.createComponent(AssigmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
