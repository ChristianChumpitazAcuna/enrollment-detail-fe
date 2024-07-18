import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {

  toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    } else {
      html.classList.add('dark');
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

}
