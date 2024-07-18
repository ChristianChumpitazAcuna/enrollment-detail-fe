import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyProgrammeListComponent } from './study-programme-list.component';

describe('StudyProgrammeListComponent', () => {
  let component: StudyProgrammeListComponent;
  let fixture: ComponentFixture<StudyProgrammeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyProgrammeListComponent]
    });
    fixture = TestBed.createComponent(StudyProgrammeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
