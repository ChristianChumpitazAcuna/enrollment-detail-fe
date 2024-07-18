import { Component, inject } from '@angular/core';
import { EnrollmentDetailService } from '../../../services/enrollmentDetail/enrollment-detail.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EnrollmentDetail } from '../../../interfaces/enrollmentDetail';

@Component({
  selector: 'app-enrollment-detail-list',
  templateUrl: './enrollment-detail-list.component.html',
  styles: [],
})
export class EnrollmentDetailListComponent {
  private _service = inject(EnrollmentDetailService);
  private toast = inject(ToastrService);

  list: EnrollmentDetail[] = [];
  selectedItem: EnrollmentDetail | null = null;

  currentPage: number = 1;
  searchQuery: string = '';
  searchSelect: string = '';

  showForm: boolean = false;
  isActive: boolean = true;
  showBtnExport: boolean = false;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(searchQuery: string = '', searchSelect: string = ''): void {
    this._service.getData('active').subscribe((data: EnrollmentDetail[]) => {
      this.list =
        searchQuery || searchSelect ? this.filterData(data, searchQuery) : data;
    });
  }

  fechtInactiveData(searchQuery: string = '', searchSelect: string = ''): void {
    this._service.getData('inactive').subscribe((data: EnrollmentDetail[]) => {
      this.list =
        searchQuery || searchSelect ? this.filterData(data, searchQuery) : data;
    });
  }

  searchData() {
    if (this.isActive) {
      this.fetchData(this.searchQuery, this.searchSelect);
    } else {
      this.fechtInactiveData(this.searchQuery, this.searchSelect);
    }
  }

  filterData(
    data: EnrollmentDetail[],
    searchQuery: string
  ): EnrollmentDetail[] {
    return data.filter((item) => {
      const matchesSearchQuery = searchQuery
        ? item.student.names.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesSearchQuery;
    });
  }

  deleteItem(id: string) {
    Swal.fire({
      title: '¿Estás seguro de Eliminar este registro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.deleteData(id).subscribe(() => {
          this.toast.success('Registro Eliminado', 'Éxito');
          this.fetchData();
        });
      }
    });
  }

  restoreItem(id: string) {
    Swal.fire({
      title: '¿Estás seguro de reactivar este registro?',
      text: 'El registro será reactivado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reactivar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.restoreData(id).subscribe(() => {
          this.toast.success('Registro Reactivado', 'Éxito');
          this.fechtInactiveData();
        });
      }
    });
  }

  onCloseForm() {
    this.selectedItem = null;
    this.showForm = false;
  }

  onEditItem(item: EnrollmentDetail) {
    this.selectedItem = item;
    this.showForm = true;
  }

  refreshData() {
    this.fetchData();
  }

  toggleActive() {
    this.isActive = !this.isActive;
    this.isActive ? this.fetchData() : this.fechtInactiveData();
  }
}
