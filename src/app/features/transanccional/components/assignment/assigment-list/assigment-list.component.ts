import { Component } from '@angular/core';

@Component({
  selector: 'app-assigment-list',
  templateUrl: './assigment-list.component.html',
  styleUrls: ['./assigment-list.component.css']
})
export class AssigmentListComponent {
  currentPage = 1;
  itemsPerPage = 10;

}
