import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/features/web/components/services/user.service';
import { ContacUser } from 'src/app/features/web/components/interfaces/user';

@Component({
  selector: 'app-agregar-user',
  templateUrl: './agregar-user.component.html',
  styleUrls: ['./agregar-user.component.css']
})
export class AgregarUserComponent {
  @Output() usertAdd = new EventEmitter<void>();
  @Input() selectUserForEdit: ContacUser | null = null;
  userForm: FormGroup;
  showForm = false;
  currentStep = 1;
  nameMessage = '';
  nameColor = '';
  lastnamePaternalMessage = '';
  lastnamePaternalColor = '';
  lastnameMaternalMessage = '';
  lastnameMaternalColor = '';
  documentTypeMessage = '';
  documentTypeColor = '';
  documentNumberMessage = '';
  documentNumberColor = '';
  emailMessage = '';
  emailColor = '';
  phoneMessage = '';
  phoneColor = '';
  phoneOptionalMessage: string = '';
  phoneOptionalColor: string = '';
  birthdateMessage: string = '';
  birthdateColor: string = '';
  isBirthdateValid = false; // Variable para verificar si la fecha de nacimiento es válida

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      lastname_paternal: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      lastname_maternal: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)]],
      birthdate: ['', [Validators.required]],
      document_type: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      phone_optional: ['', Validators.pattern(/^9\d{8}$/)],
      status: ['A']
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.selectUserForEdit) {
        const id = this.selectUserForEdit.id;
        this.userService.actualizarUser(id, this.userForm.value).subscribe(
          () => {
            Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado con éxito', 'success');
            this.usertAdd.emit();
            this.resetForm();
            this.closeModal();
          },
          error => {
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.userService.crearUsuario(this.userForm.value).subscribe(
          () => {
            Swal.fire('Usuario creado', 'El usuario ha sido creado con éxito', 'success');
            this.usertAdd.emit();
            this.resetForm();
            this.closeModal();
          },
          error => {
            Swal.fire('Error', 'No se pudo crear el usuario', 'error');
            console.error('Error creating user:', error);
          }
        );
      }
    }
  }

  areFieldsValid(): boolean {
    return (
      this.nameColor === 'green' &&
      this.lastnamePaternalColor === 'green' &&
      this.lastnameMaternalColor === 'green' &&
      this.birthdateColor === 'green' &&
      this.documentTypeColor === 'green' &&
      this.documentNumberColor === 'green' &&
      this.emailColor === 'green' &&
      this.phoneColor === 'green'
    );
  }

  openModal(user?: ContacUser): void {
    if (user) {
      this.selectUserForEdit = { ...user };
      this.userForm.patchValue({
        id: user.id,
        name: user.name,
        lastname_paternal: user.lastname_paternal,
        lastname_maternal: user.lastname_maternal,
        birthdate: user.birthdate,
        document_type: user.document_type,
        documentNumber: user.documentNumber,
        email: user.email,
        phone: user.phone,
        phone_optional: user.phone_optional,
        status: user.status
      });
    } else {
      this.resetForm();
    }
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
    this.resetForm();
    this.selectUserForEdit = null;
  }

  resetForm(): void {
    this.userForm.reset({
      name: '',
      lastname_paternal: '',
      lastname_maternal: '',
      birthdate: '',
      document_type: '',
      documentNumber: '',
      email: '',
      phone: '',
      phone_optional: '',
      status: 'A'
    });
  }

  validateName(name: string): boolean {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(name);
  }

  onNameInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const nameValue = inputElement.value.toUpperCase();

    if (this.validateName(nameValue)) {
      this.nameMessage = 'Nombre válido';
      this.nameColor = 'green';
    } else {
      this.nameMessage = 'El nombre es inválido';
      this.nameColor = 'red';
    }
  }

  onLastnamePaternalInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const lastnamePaternalValue = inputElement.value.toUpperCase();

    if (this.validateName(lastnamePaternalValue)) {
      this.lastnamePaternalMessage = 'Apellido paterno válido';
      this.lastnamePaternalColor = 'green';
    } else {
      this.lastnamePaternalMessage = 'El apellido paterno es inválido';
      this.lastnamePaternalColor = 'red';
    }
  }

  onLastnameMaternalInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const lastnameMaternalValue = inputElement.value.toUpperCase();

    if (this.validateName(lastnameMaternalValue)) {
      this.lastnameMaternalMessage = 'Apellido materno válido';
      this.lastnameMaternalColor = 'green';
    } else {
      this.lastnameMaternalMessage = 'El apellido materno es inválido';
      this.lastnameMaternalColor = 'red';
    }
  }

  onDocumentTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const documentType = selectElement.value;

    if (documentType === 'DNI' || documentType === 'CNE') {
      this.documentTypeMessage = `Tipo de documento elegido: ${documentType}`;
      this.documentTypeColor = 'green';
    } else {
      this.documentTypeMessage = 'Seleccione un tipo de documento válido';
      this.documentTypeColor = 'red';
    }
  }

  onDocumentNumberChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const documentNumber = inputElement.value;

    if (this.userForm.get('document_type')?.value === 'DNI') {
      if (/^\d{8}$/.test(documentNumber)) {
        this.documentNumberMessage = 'Número de DNI válido';
        this.documentNumberColor = 'green';
      } else {
        this.documentNumberMessage = 'Ingrese 8 números para DNI';
        this.documentNumberColor = 'red';
      }
    } else if (this.userForm.get('document_type')?.value === 'CNE') {
      if (/^\d{15}$/.test(documentNumber)) {
        this.documentNumberMessage = 'Número de CNE válido';
        this.documentNumberColor = 'green';
      } else {
        this.documentNumberMessage = 'Ingrese 15 números para CNE';
        this.documentNumberColor = 'red';
      }
    } else {
      this.documentNumberMessage = 'Seleccione un tipo de documento válido';
      this.documentNumberColor = 'red';
    }
  }

  onEmailChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const email = inputElement.value;

    const validEmails = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@vallegrande.edu.pe']; // Terminaciones válidas
    const validEmail = validEmails.some(ending => email.includes(ending));

    if (validEmail) {
      this.emailMessage = 'Email aceptado';
      this.emailColor = 'green';
    } else {
      this.emailMessage = 'Coloque un email válido';
      this.emailColor = 'red';
    }
  }

  onPhoneChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const phone = inputElement.value;

    if (/^9\d{8}$/.test(phone)) {
      this.phoneMessage = 'Número de teléfono válido';
      this.phoneColor = 'green';
    } else {
      this.phoneMessage = 'Ingrese un número de teléfono válido (debe comenzar con 9 y tener 9 dígitos)';
      this.phoneColor = 'red';
    }
  }

  onPhoneOptionalChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const phoneOptional = inputElement.value;

    if (/^9\d{8}$/.test(phoneOptional)) {
      this.phoneOptionalMessage = 'Número de teléfono válido';
      this.phoneOptionalColor = 'green';
    } else {
      this.phoneOptionalMessage = 'Ingrese un número de teléfono válido (debe comenzar con 9 y tener 9 dígitos)';
      this.phoneOptionalColor = 'red';
    }
  }

  onBirthdateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const birthdate = inputElement.value;
    const currentDate = new Date();
    const birthdateDate = new Date(birthdate);
    let age = currentDate.getFullYear() - birthdateDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthdateDate.getMonth();
    const dayDiff = currentDate.getDate() - birthdateDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 14) {
      this.birthdateMessage = 'Fecha de nacimiento válida';
      this.birthdateColor = 'green';
    } else {
      this.birthdateMessage = 'LO SENTIMOS USTED AÚN NO TIENE LA MÍNIMA QUE ES 14, [NO SE PREOCUPE APENAS LA CUMPLA NOSOTROS NOS CONTACTAMOS]';
      this.birthdateColor = 'red';
    }
  }

  areFieldsEmpty(): boolean {
    return (
      !this.userForm.get('name')?.value ||
      !this.userForm.get('lastname_paternal')?.value ||
      !this.userForm.get('lastname_maternal')?.value ||
      !this.userForm.get('birthdate')?.value ||
      !this.userForm.get('document_type')?.value ||
      !this.userForm.get('documentNumber')?.value ||
      !this.userForm.get('email')?.value ||
      !this.userForm.get('phone')?.value
    );
  }
}
