import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EnrollmentDetailService } from '../../../services/enrollmentDetail/enrollment-detail.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnrollmentDetail } from '../../../interfaces/enrollmentDetail';
import { Student } from 'src/app/features/master/interfaces/student/student';
import { DidacticUnitService } from '../../../services/didacticUnit/didactic-unit.service';
import { StudentService } from 'src/app/features/master/services/student/student.service';

@Component({
  selector: 'app-enrollment-detail-form',
  templateUrl: './enrollment-detail-form.component.html',
  styles: [``],
})
export class EnrollmentDetailFormComponent {
  @Input() item: EnrollmentDetail | null = null;
  @Output() closeFormEvent = new EventEmitter<void>();
  @Output() dataSavedEvent = new EventEmitter<void>();

  private _service = inject(EnrollmentDetailService);
  private _studentService = inject(StudentService);
  private _didacticUnitService = inject(DidacticUnitService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);

  form: FormGroup;
  didacticUnits: any[] = [];
  students: Student[] = [];

  constructor() {
    this.form = this.fb.group({
      didacticUnitId: [[], [Validators.required]],
      studentId: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.item) {
      this.form.patchValue(this.item);
    }
    this.comboDidacticUnits();
    this.comboStudents();
  }

  onSubmit() {
    const formData = this.form.value;

    console.log('Datos a enviar:', formData);
    if (this.item) {
      this._service.updateData(this.item.id, formData).subscribe(() => {
        this.form.reset();
        this.onCloseForm();
        this.toast.success('Actualización Exitosa', 'Éxito');
        this.dataSavedEvent.emit();
      });
    } else {
      this._service.postData(formData).subscribe(() => {
        this.form.reset();
        this.onCloseForm();
        this.toast.success('Registro Exitoso', 'Éxito');
        this.dataSavedEvent.emit();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }

  onCloseForm() {
    this.form.reset();
    this.closeFormEvent.emit();
  }

  comboStudents() {
    this._studentService.getStudentsA().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  comboDidacticUnits() {
    this._didacticUnitService.getData('active').subscribe((data: Student[]) => {
      this.didacticUnits = data;
    });
  }
}
