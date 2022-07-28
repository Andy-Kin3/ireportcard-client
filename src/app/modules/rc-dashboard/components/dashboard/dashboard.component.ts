import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <header class="">
      <p-toast></p-toast>
      <app-top-menu></app-top-menu>
    </header>
    <main>
      <div class="dashboard-container row no-gutters">
        <div class="col-xl-2 col-lg-2 d-none d-lg-block side-menu-container">
          <app-side-menu></app-side-menu>
        </div>
        <div class="col-xl-10 col-lg-10 col-md-12 dashbody-container">
          <app-dashbody></app-dashbody>
        </div>
      </div>
    </main>
    <footer class="full-width">
      <app-footer></app-footer>
    </footer>
  `
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.menuItems = [
      {separator: true},
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
      }
    ];
  }

}
