import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../../../interfaces/profile/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styles: [],
})
export class ProfileFormComponent {
  @Input() item: Profile | null = null;
  @Output() closeFormEvent = new EventEmitter<void>();
  @Output() dataSavedEvent = new EventEmitter<void>();

  private _profileService = inject(ProfileService);
  private fb = inject(FormBuilder);
  private toast = inject(ToastrService);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
        ],
      ],
      modularCode: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(7),
          Validators.pattern('^[0-9 ]+$'),
        ],
      ],
      dreGre: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Z]{3} [A-Za-zñÑáéíóúÁÉÍÓÚ]+$'),
        ],
      ],
      managementType: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  onSubmit() {
    const data = this.form.value;
    console.log(data);
    if (this.item) {
      this._profileService.updateData(this.item.id, data).subscribe(() => {
        this.form.reset();
        this.onCloseForm();
        this.toast.success('Actualización Exitosa', 'Éxito');
        this.dataSavedEvent.emit();
      });
    } else {
      this._profileService.postData(data).subscribe(() => {
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
}
