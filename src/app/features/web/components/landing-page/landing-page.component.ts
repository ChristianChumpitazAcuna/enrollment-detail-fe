import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/features/web/components/services/user.service';
import { ContactFormService } from 'src/app/features/web/components/services/formulario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class LandingPageComponent {
  title = 'CETPRO';

  contactForm: any = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    numeroCelular: '',
    correo: '',
    programaEstudio: '',
    descripcion: '',
    tipoDocumento: '',
    numeroDocumento: ''
  };

  forbiddenWords = ['carajo', 'maldición', 'huevada', 'xd', 'mrd'];
  

  constructor(private userService: UserService, private contactFormService: ContactFormService) {}

  onSubmit() {
    if (this.isDescriptionValid()) {
      const user = {
        id: '',  // Inicializado en vacío, será manejado por el backend
        name: this.contactForm.nombre,
        lastname_paternal: this.contactForm.apellidoPaterno,
        lastname_maternal: this.contactForm.apellidoMaterno,
        birthdate: '',  // Inicializado en vacío, si no es requerido
        document_type: this.contactForm.tipoDocumento,
        documentNumber: this.contactForm.numeroDocumento,
        phone: this.contactForm.numeroCelular,
        phone_optional: '',  // Inicializado en vacío, si no es requerido
        email: this.contactForm.correo,
        status: 'A'
      };

      this.userService.crearUsuario(user).subscribe(
        responseUser => {
          const formulario = {
            id: '',  // Inicializado en vacío, será manejado por el backend
            userId: responseUser.id,
            studyProgramId: this.contactForm.programaEstudio,
            description: this.contactForm.descripcion,
            status: 'A'
          };

          this.contactFormService.crearFormulario(formulario).subscribe(
            responseFormulario => {
              Swal.fire('Formulario enviado', 'Gracias por contactarnos', 'success');
              this.resetForm();
            },
            error => {
              console.error('Error al enviar el formulario', error);
              Swal.fire('Error', 'Hubo un error al enviar el formulario', 'error');
            }
          );
        },
        error => {
          console.error('Error al crear el usuario', error);
          Swal.fire('Error', 'Hubo un error al crear el usuario', 'error');
        }
      );
    } else {
      this.showWarningModal();
    }
  }

  onCelularChange(celular: string) {
    this.userService.obtenerUserPorCelular(celular).subscribe(
      (userData) => {
        this.contactForm.nombre = userData.name;
        this.contactForm.apellidoPaterno = userData.lastname_paternal;
        this.contactForm.apellidoMaterno = userData.lastname_maternal;
        this.contactForm.correo = userData.email;
        this.contactForm.tipoDocumento = userData.document_type;
        this.contactForm.numeroDocumento = userData.documentNumber;
      
        // Puedes rellenar otros campos según los datos obtenidos
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  onDocumentoChange(documento: string) {
    this.userService.obtenerUserPorDocumento(documento).subscribe(
      (userData) => {
        this.contactForm.nombre = userData.name;
        this.contactForm.apellidoPaterno = userData.lastname_paternal;
        this.contactForm.apellidoMaterno = userData.lastname_maternal;
        this.contactForm.numeroCelular = userData.phone;
        this.contactForm.correo = userData.email;
        this.contactForm.tipoDocumento = userData.document_type;
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }

  resetForm() {
    this.contactForm = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      numeroCelular: '',
      correo: '',
      programaEstudio: '',
      descripcion: '',
      tipoDocumento: '',
      numeroDocumento: ''
    };

  }

  isDescriptionValid(): boolean {
    const value = this.contactForm.descripcion.toLowerCase();
    for (const word of this.forbiddenWords) {
      if (value.includes(word)) {
        return false;
      }
    }
    return true;
  }

  isDocumentNumberValid(): boolean {
    const { tipoDocumento, numeroDocumento } = this.contactForm;
    if (tipoDocumento === 'DNI' && numeroDocumento.length !== 8) {
      return false;
    }
    if (tipoDocumento === 'CNE' && numeroDocumento.length !== 15) {
      return false;
    }
    return true;
  }

  showWarningModal() {
    Swal.fire({
      title: '¡Advertencia!',
      text: 'La palabra inapropiada no está permitida en la descripción o el número de documento no es válido.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }

  getDocumentNumberClasses() {
    const { tipoDocumento, numeroDocumento } = this.contactForm;
    if (
      (tipoDocumento === 'DNI' && numeroDocumento.length !== 8) ||
      (tipoDocumento === 'CNE' && numeroDocumento.length !== 15)
    ) {
      return 'is-invalid';
    }
    return '';
  }

}
