import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Profile } from '../../../interfaces/profile/profile';
import { ProfileService } from '../../../services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styles: [],
})
export class ProfileListComponent implements OnInit {
  private _profileService = inject(ProfileService);
  private toast = inject(ToastrService);

  list: Profile[] = [];
  selectedItem: Profile | null = null;

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
    this._profileService.getData('active').subscribe((data: Profile[]) => {
      this.list = searchQuery || searchSelect ? this.filterData(data, searchQuery, searchSelect) : data;
    });
  }

  fechtInactiveData(searchQuery: string = '', searchSelect: string = ''): void {
    this._profileService.getData('inactive').subscribe((data: Profile[]) => {
      this.list = searchQuery || searchSelect ? this.filterData(data, searchQuery, searchSelect) : data;
    });
  }

  searchData() {
    if (this.isActive) {
      this.fetchData(this.searchQuery, this.searchSelect);
    } else {
      this.fechtInactiveData(this.searchQuery, this.searchSelect);
    }
  }

  filterData(data: Profile[], searchQuery: string, searchSelect: string): Profile[] {
    return data.filter((item) => {
      const matchesManagementType = searchSelect ? item.managementType.toLowerCase() === searchSelect.toLowerCase() : true;
      const matchesSearchQuery = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.modularCode.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesManagementType && matchesSearchQuery;
    });
  }

  deleteItem(id: string) {
    Swal.fire({
      title: '¿Estás seguro de Eliminar este Cetpro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._profileService.deleteData(id).subscribe(() => {
          this.toast.success('Perfil Eliminado', 'Éxito');
          this.fetchData();
        });
      }
    });
  }

  restoreItem(id: string) {
    Swal.fire({
      title: '¿Estás seguro de reactivar este Cetpro?',
      text: 'El Cetpro será reactivado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reactivar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._profileService.restoreData(id).subscribe(() => {
          this.toast.success('Perfil Reactivado', 'Éxito');
          this.fechtInactiveData();
        });
      }
    });
  }

  onCloseForm() {
    this.selectedItem = null;
    this.showForm = false;
  }

  onEditItem(item: Profile) {
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
