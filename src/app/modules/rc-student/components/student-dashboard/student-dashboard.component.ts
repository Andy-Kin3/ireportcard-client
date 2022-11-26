import {Component, OnInit} from '@angular/core';
import {NavItem, SIDEBAR_STUDENT_MENU_ITEMS} from "../../../../models/ui/nav-item";

@Component({
  selector: 'app-student-dashboard',
  styleUrls: ['./student-dashboard.component.scss'],
  template: `
    <p-toast></p-toast>
    <div class="min-h-screen flex surface-ground">
      <app-sidebar [navItems]="studentMenuItems"></app-sidebar>
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
export class StudentDashboardComponent implements OnInit {
  studentMenuItems: NavItem[] = SIDEBAR_STUDENT_MENU_ITEMS;

  constructor() {
  }

  ngOnInit(): void {
  }

}
