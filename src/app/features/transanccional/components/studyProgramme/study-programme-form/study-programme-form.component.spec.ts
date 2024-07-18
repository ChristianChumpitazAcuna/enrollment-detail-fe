import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyProgrammeFormComponent } from './study-programme-form.component';

describe('StudyProgrammeFormComponent', () => {
  let component: StudyProgrammeFormComponent;
  let fixture: ComponentFixture<StudyProgrammeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyProgrammeFormComponent]
    });
    fixture = TestBed.createComponent(StudyProgrammeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
