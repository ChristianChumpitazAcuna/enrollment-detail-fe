import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from '../../../interfaces/student/student';
import { StudentService } from '../../../services/student/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  @ViewChild(StudentFormComponent) studentFormComponent!: StudentFormComponent;
  students: Student[] = [];
  Active: boolean = true;
  Actions: boolean = true;
  searDocumentType: string = '';
  searchQuery: string = '';
  selectStudent: Student | null = null;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    public service: StudentService,
    private toastr: ToastrService
  ) { } 

  ngOnInit(): void {
    this.getStudents();
  }

  ngAfterViewInit(): void {
    // Código para el control de visibilidad del mini card de exportaciones
    const exportBtn = document.getElementById('exportBtn');
    const exportOptions = document.getElementById('exportOptions');

    if (exportBtn && exportOptions) {
      exportBtn.addEventListener('click', () => {
        exportOptions.classList.toggle('hidden');
      });

      document.addEventListener('click', (event) => {
        if (!exportBtn.contains(event.target as Node) && !exportOptions.contains(event.target as Node)) {
          exportOptions.classList.add('hidden');
        }
      });
    }
  }

  selectStudents(student: Student) {
    this.selectStudent = student;
  }
  
  closeDetails() {
    this.selectStudent = null;
  }

  getActive() {
    this.service.getStudentsA().subscribe((data) => {
      this.students = data;
    });
  }

  getInactive() {
    this.service.getStudentsI().subscribe((data) => {
      this.students = data;
    });
  }

  getStudents() {
    if (this.Active) {
      this.getActive();
    } else {
      this.getInactive();
    }
  }

  ActiveStatus() {
    this.getStudents();
    this.Actions = this.Active;
  }

  deleteStudent(id: string) {
    Swal.fire({
      title: '¿Estás seguro eliminar al estudiante?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deactivate(id).subscribe(
          () => {
            this.ActiveStatus();
            this.toastr.success('Estudiante eliminado', 'Éxito');
          },  
          error => {
            this.toastr.warning('Hubo un problema al eliminar el estudiante', 'Error');
          }
        );
      }
    });
  }

  activateStudent(id: string) {
    Swal.fire({
      title: '¿Estás seguro activar al estudiante?',
      text: '¡El estudiante será activado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, activarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.activate(id).subscribe(
          () => {
            this.ActiveStatus();
            this.toastr.success('Estudiante activado', 'Éxito');
          },
          error => {
            this.toastr.warning('Hubo un problema al activar el estudiante', 'Error');
          }
        );
      }
    });
  }

  onSearch() {
    if (this.Active) {
      this.service.getStudentsA().subscribe(data => {
        this.students = this.filterStudents(data);
      });
    } else {
      this.service.getStudentsI().subscribe(data => {
        this.students = this.filterStudents(data);
      });
    }
  }

  filterStudents(students: Student[]): Student[] {
    return students.filter(student =>
      student.documentType.toLowerCase().includes(this.searDocumentType.toLowerCase()) &&
      (student.documentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      `${student.lastNamePaternal} ${student.lastNameMaternal} ${student.names} ${student.documentNumber} ${student.sex} ${student.birthDate}`.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  openModal(student?: Student) {
    this.studentFormComponent.openModal(student);
  }

  editStudent(student: Student): void {
    this.openModal(student);
  }

  exportToExcel() {
    // Implementa la lógica de exportación a Excel aquí
  }

  exportToCSV() {
    // Implementa la lógica de exportación a CSV aquí
  }

  exportToPDF() {
    // Implementa la lógica de exportación a PDF aquí
  }
}
