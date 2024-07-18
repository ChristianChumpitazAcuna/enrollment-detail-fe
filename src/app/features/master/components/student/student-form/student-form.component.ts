import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from '../../../interfaces/student/student';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ubigeo } from '../../../interfaces/student/ubigeo';
import { StudentService } from '../../../services/student/student.service';
import { UbigeoService } from '../../../services/student/ubigeo.service';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';
import { ApiReniecService } from '../../../services/api-reniec.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  @Output() studentAdd = new EventEmitter<void>();
  selectStudentForEdit: Student | null = null;
  currentStep = 1;
  dniValidated: boolean = false;
  showForm = false;
  minDate = new Date();
  studentForm: FormGroup;
  ubigeos: Ubigeo[] = [];
  countries: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceStudent: StudentService,
    private serviceUbigeo: UbigeoService,
    private serviceCountry: ApiService,
    private serviceReniec: ApiReniecService
  ) {
    this.studentForm = this.fb.group({
      id: [''],
      documentType: ['', Validators.required],
      documentNumber: ['', [Validators.required, this.documentNumberValidator.bind(this)]],
      lastNamePaternal: ['', [Validators.required, this.lettersValidator]],
      lastNameMaternal: ['', [Validators.required, this.lettersValidator]],
      names: ['', [Validators.required, this.lettersValidator]],
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthCountry: ['', Validators.required],
      ubigeoBirth: this.fb.group({
        id: [''],
        ubigeoCode: [''],
        department: [''],
        province: [''],
        district: ['']
      }),
      ubigeoResidence: this.fb.group({
        id: [''],
        ubigeoCode: [''],
        department: [''],
        province: [''],
        district: ['']
      }),
      email: ['', [Validators.required, this.emailDomainValidator]],
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator.bind(this)]],
      maritalStatus: ['', Validators.required],
      educationLevel: ['', [Validators.required, this.lettersValidator]],
      disability: ['', Validators.required],
      disabilityType: ['', [Validators.required]],
      internetAccess: ['', Validators.required],
      employed: ['', Validators.required],
      occupation: ['', [Validators.required, this.lettersValidator]],
      nativeLanguage: ['', [Validators.required, this.lettersValidator]],
      status: ['A'],
    });
  }

  ngOnInit(): void {
    this.loadUbigeos();
    this.loadCountries();
    this.minDate.setFullYear(this.minDate.getFullYear() - 14);
  }

  disabilityTypes: string[] = [
    'Discapacidad Física o Motora',
    'Discapacidad Sensorial',
    'Discapacidad Intelectual',
    'Discapacidad Mental o Psíquica'
  ];

  dataDNI() {
    const documentNumber = this.studentForm.get('documentNumber')?.value;

    this.serviceReniec.completeDniData(documentNumber).subscribe(
      (response) => {
        if (response.estado) {
          this.studentForm.patchValue({
            lastNamePaternal: response.resultado.apellido_paterno,
            lastNameMaternal: response.resultado.apellido_materno,
            names: response.resultado.nombres,
            sex: response.resultado.genero,
            birthDate: this.formatDate(response.resultado.fecha_nacimiento)
          });

          this.dniValidated = true; 
          this.activateValidations();
        } 
      },
      (error) => {
        console.error('Error al completar datos del DNI:', error);
      }
    );
  }
  activateValidations() {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const year = parts[2];
      const month = parts[1];
      const day = parts[0];
      return `${year}-${month}-${day}`;
    } else {
      return dateString;
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      const formControls = this.studentForm.controls;
      if (formControls['documentType']?.valid &&
          formControls['documentNumber']?.valid &&
          formControls['lastNamePaternal']?.valid &&
          formControls['lastNameMaternal']?.valid &&
          formControls['names']?.valid) {
        this.currentStep = 2;
      }
    }
  }

  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  loadCountries(): void {
    this.serviceCountry.getCountries().subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error al obtener países:', error);
      }
    );
  }

  loadUbigeos() {
    this.serviceUbigeo.getAll().subscribe((data) => {
      this.ubigeos = data;
    });
  }

  openModal(student?: Student): void {
    if (student) {
      this.selectStudentForEdit = { ...student };
      this.studentForm.patchValue({ ...student,
        ubigeoBirth: student.ubigeoBirth,
      ubigeoResidence: student.ubigeoResidence
       });
    } else {
      this.resetForm();
    }
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
    this.resetForm();
    this.selectStudentForEdit = null;
  }

  resetForm(): void {
    this.studentForm.reset({
      documentType: '',
      documentNumber: '',
      lastNamePaternal: '',
      lastNameMaternal: '',
      names: '',
      sex: '',
      birthDate: '',
      birthCountry: '',
      ubigeoBirth: { id: '', ubigeoCode: '', department: '', province: '', district: ''},
      ubigeoResidence: { id: '', ubigeoCode: '', department: '', province: '', district: ''},
      email: '',
      phoneNumber: '',
      maritalStatus: '',
      educationLevel: '',
      disability: '',
      disabilityType: '',
      internetAccess: '',
      employed: '',
      occupation: '',
      nativeLanguage: '',
      status: 'A'
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.selectStudentForEdit) {
        this.serviceStudent.update(this.studentForm.value.id, this.studentForm.value).subscribe(
          () => {
            this.closeModal();
            this.studentAdd.emit();
            Swal.fire('¡Éxito!', 'Estudiante actualizado exitosamente', 'success');
          },
          (error) => {
            console.error('Error al actualizar los datos del Estudiante:', error);
            Swal.fire('¡Error!', 'Hubo un problema al actualizar los datos del Estudiante', 'error');
          }
        );
      } else {
        this.serviceStudent.create(this.studentForm.value).subscribe(
          () => {
            this.closeModal();
            this.studentAdd.emit();
            Swal.fire('¡Éxito!', 'Estudiante creado exitosamente', 'success');
          },
          (error) => {
            console.error('Error al crear un nuevo Estudiante:', error);
            Swal.fire('¡Error!', 'Hubo un problema al crear al Estudiante', 'error');
          }
        );
      }
    }
  }

  validateNumber(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateLetters(event: KeyboardEvent) {
    const pattern = /[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatePhoneNumber(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    const currentValue = (event.target as HTMLInputElement).value;

    if (!pattern.test(inputChar) || (currentValue.length === 0 && inputChar !== '9') || currentValue.length >= 9) {
      event.preventDefault();
    }
  }

  documentNumberValidator(control: AbstractControl) {
    if (this.studentForm) {
      const documentType = this.studentForm.get('documentType')?.value;
      const documentNumber = control.value;

      if (documentType === 'DNI' && !/^\d{8}$/.test(documentNumber)) {
        return { invalidDNI: true };
      }
      if (documentType === 'CNE' && !/^\d{15}$/.test(documentNumber)) {
        return { invalidCNE: true };
      }
    }
    return null;
  }

  lettersValidator(control: AbstractControl) {
    const value = control.value;
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (value && !pattern.test(value)) {
      return { invalidLetters: true };
    }
    return null;
  }

  phoneNumberValidator(control: AbstractControl) {
    const value = control.value;
    const pattern = /^9\d{8}$/;
    if (value && !pattern.test(value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  emailDomainValidator(control: AbstractControl) {
    const value = control.value;
    const validDomains = ['gmail.com', 'name.edu.pe', 'hotmail.com', 'yahoo.com'];
    if (value) {
      const domain = value.split('@')[1];
      if (!validDomains.includes(domain)) {
        return { invalidEmailDomain: true };
      }
    }
    return null;
  }

  observeFieldChanges(): void {
    this.studentForm.get('disability')?.valueChanges.subscribe((value) => {
      const disabilityTypeControl = this.studentForm.get('disabilityType');
      if (value === 'no') {
        disabilityTypeControl?.disable();
        disabilityTypeControl?.reset();
      } else {
        disabilityTypeControl?.enable();
      }
    });

    this.studentForm.get('employed')?.valueChanges.subscribe((value) => {
      const occupationControl = this.studentForm.get('occupation');
      if (value === 'no') {
        occupationControl?.disable();
        occupationControl?.reset();
      } else {
        occupationControl?.enable();
      }
    });
  }


}