import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyProgrammeDetailsComponent } from './study-programme-details.component';

describe('StudyProgrammeDetailsComponent', () => {
  let component: StudyProgrammeDetailsComponent;
  let fixture: ComponentFixture<StudyProgrammeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyProgrammeDetailsComponent]
    });
    fixture = TestBed.createComponent(StudyProgrammeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
