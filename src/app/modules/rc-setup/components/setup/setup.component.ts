import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-setup',
  styleUrls: ['./setup.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="setupMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen my-2 py-8">
      <router-outlet></router-outlet>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
  `
})
export class SetupComponent implements OnInit {
  setupMenuItems: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.setupMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/setup'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'School Manager',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/setup/school-manager'],
        routerLinkActiveOptions: {exact: true},
      }
    ]
  }

}
