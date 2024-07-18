import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../interfaces/student/student';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent {
  @Input() student!: Student;
  @Output() close = new EventEmitter<void>();

  closeDetails() {
    this.close.emit();
  }
}