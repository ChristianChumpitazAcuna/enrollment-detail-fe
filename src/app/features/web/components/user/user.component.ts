import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { ContacUser } from './../interfaces/user';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { AgregarUserComponent } from './agregar-user/agregar-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild(AgregarUserComponent) userFormComponent!: AgregarUserComponent;
  users: ContacUser[] = [];
  filteredUsers: ContacUser[] = [];
  filtro: string = '';
  searDocumentType: string = '';
  searchQuery: string = '';
  Active: boolean = true;
  Actions: boolean = true;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.filtro = '';
    this.obtenerUserContacto();
  }

  obteneActivos() {
    this.userService.getActiveUsers().pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        Swal.fire('Error', 'No se pudieron obtener los datos de los usuarios', 'error');
        return of([]);
      })
    ).subscribe((data: ContacUser[]) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  obteneInactivos() {
    this.userService.getInactivos().pipe(
      catchError(error => {
        console.error('Error al obtener datos:', error);
        Swal.fire('Error', 'No se pudieron obtener los datos de los usuarios', 'error');
        return of([]);
      })
    ).subscribe((data: ContacUser[]) => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  obtenerUserContacto() {
    if (this.Active) {
      this.obteneActivos();
    } else {
      this.obteneInactivos();
    }
  }

  ActividadEstado() {
    this.obtenerUserContacto();
    this.Active = !this.Active;
  }

  onSearch() {
    if (this.Active) {
      this.userService.getActiveUsers().subscribe(data => {
        this.users = this.filterUser(data);
      });
    } else {
      this.userService.getInactivos().subscribe(data => {
        this.users = this.filterUser(data);
      });
    }
  }

  filterUser(userss: ContacUser[]): ContacUser[] {
    return userss.filter(uss =>
      uss.documentNumber.toLowerCase().includes(this.searDocumentType.toLowerCase()) &&
      (uss.documentNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        `${uss.lastname_paternal} ${uss.lastname_maternal} ${uss.name} ${uss.documentNumber} ${uss.email} ${uss.birthdate}`.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }



  deleteUser(user: ContacUser): void {
    Swal.fire({
      title: 'Confirmar eliminación',
      text: `¿Estás seguro de que deseas eliminar a ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUser(user.id).subscribe(() => {
          this.obteneActivos(); // Refresca la lista de usuarios
          Swal.fire('Usuario eliminado', 'El usuario ha sido eliminado con éxito', 'success');
        });
      }
    });
  }

  activeUser(user: ContacUser): void {
    Swal.fire({
      title: 'Confirmar Activado',
      text: `¿Estás seguro de que deseas activar a ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Activar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.activarUser(user.id).subscribe(() => {
          this.obteneActivos(); // Refresca la lista de usuarios
          Swal.fire('Usuario Activado', 'El usuario ha sido activado con éxito', 'success');
        });
      }
    });
  }

  openModal(userss?: ContacUser) {
    this.userFormComponent.openModal(userss);
  }

  editStudent(user: ContacUser): void {
    this.userFormComponent.openModal(user);
  }

  exportToCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'Users.csv');
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredUsers);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'Users.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    const col = ['Nombre', 'Apellido Paterno', 'Apellido Materno', 'Tipo de Documento', 'Número de Documento', 'Correo Electrónico', 'Celular', 'Celular Opcional', 'Estado'];
    const rows = this.filteredUsers.map(user => [
      user.name,
      user.lastname_paternal,
      user.lastname_maternal,
      user.document_type,
      user.documentNumber,
      user.email,
      user.phone,
      user.phone_optional,
      user.status
    ]);

    (doc as any).autoTable({
      head: [col],
      body: rows
    });

    doc.save('Users.pdf');
  }
}
