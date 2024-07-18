import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.initializeJQueryFunctions();
  }

  initializeJQueryFunctions() {
    $(() => {
      // Manejar la apertura y cierre de submenús
      $('.menu > ul > li.has-submenu > a, .menu > ul > li.has-submenu > ul > li.has-submenu > a').on('click', function(e) {
        e.preventDefault();
        const target = $(this).parent(); 
        target.siblings().removeClass('active').find('ul').slideUp();
        target.toggleClass('active').find('ul').slideToggle();
      });

      // Manejar la apertura y cierre de la barra lateral
      $('.menu-btn').click(() => {
        $('.sidebar').toggleClass('active');
      });
    });
  }
}
