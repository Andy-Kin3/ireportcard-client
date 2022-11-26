import {Component, OnInit} from '@angular/core';
import {NavItem, SIDEBAR_ADMIN_MENU_ITEMS} from "../../../../models/ui/nav-item";

@Component({
  selector: 'app-admin-dashboard',
  styleUrls: ['./admin-dashboard.component.scss'],
  template: `
    <div class="min-h-screen flex surface-ground">
      <app-sidebar [navItems]="adminMenuItems"></app-sidebar>
      <div class="min-h-screen flex flex-column relative flex-auto">
        <app-top-menu></app-top-menu>

        <div class="flex flex-column flex-auto">
          <div class="p-5">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  adminMenuItems: NavItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.adminMenuItems = SIDEBAR_ADMIN_MENU_ITEMS;
  }

}
