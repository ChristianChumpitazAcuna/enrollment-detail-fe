import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigmentDetailsComponent } from './assigment-details.component';

describe('AssigmentDetailsComponent', () => {
  let component: AssigmentDetailsComponent;
  let fixture: ComponentFixture<AssigmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssigmentDetailsComponent]
    });
    fixture = TestBed.createComponent(AssigmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
