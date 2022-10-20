import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {UserComplete} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";
import {Teacher} from "../../../../models/dto/teacher.model";
import {School} from "../../../../models/dto/school.model";
import {Role} from "../../../../models/enum/role.enum";
import {SchoolService} from "../../../../services/school.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <header class="z-1 w-full fixed top-0">
      <p-toast></p-toast>
      <app-top-menu [menuItems]="dashboardMenuItems"></app-top-menu>
    </header>
    <main class="z-0 h-full min-h-screen py-8">
      <div class="dashboard-container row no-gutters dashbody-container">
        <div class="dash-body container-fluid dash-body-content">
          <router-outlet></router-outlet>
        </div>
      </div>

      <p-dialog [visible]="showSchoolsDialog" [modal]="true" [header]="'Select School'">
        <ng-template pTemplate="content">
          <rc-app-select-school [schools]="schools"
                                (onSchoolSelect)="onSchoolSelectAction($event)"></rc-app-select-school>
        </ng-template>
      </p-dialog>
    </main>
    <footer class="z-1">
      <app-footer></app-footer>
    </footer>
  `
})
export class DashboardComponent implements OnInit, OnDestroy {
  showSchoolsDialog: boolean = true;
  user?: UserComplete;
  schools: School[] = [];
  menuItems: MenuItem[] = [];
  dashboardMenuItems: MenuItem[] = [];

  constructor(
    private _userService: UserService,
    private _schoolService: SchoolService,
  ) {
  }

  ngOnDestroy(): void {
    LocalStorageUtil.deleteSchoolId();
  }


  ngOnInit(): void {
    this.menuItems = [
      {separator: true},
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
      }
    ];
    this.dashboardMenuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Subjects',
        icon: 'pi pi-fw pi-book',
        routerLink: ['/dashboard/subject'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Classes',
        icon: 'pi pi-fw pi-list',
        routerLink: ['/dashboard/class'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Students',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/dashboard/student'],
        routerLinkActiveOptions: {exact: true},
        items: [
          {
            label: 'Add',
            icon: 'pi pi-fw pi-plus',
            routerLink: ['/dashboard/student/add'],
            routerLinkActiveOptions: {exact: true},
          },
        ]
      },
      {
        label: 'Applications',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: ['/dashboard/application'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Class Lists',
        icon: 'pi pi-fw pi-folder',
        routerLink: ['/dashboard/class-list'],
        routerLinkActiveOptions: {exact: true},
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/dashboard/settings'],
        routerLinkActiveOptions: {exact: true},
      }

    ];
    this.loadUser();
  }

  loadUser = () => this._userService.getCompleteFromSession().subscribe((u) => {
    if (u.user.role.toLowerCase() == Role.TEACHER.toLowerCase()) {
      LocalStorageUtil.writeSchoolId((u.account as Teacher).schoolId);
      this.showSchoolsDialog = false;
    } else {
      if (u.user.role.toLowerCase() == Role.ADMIN.toLowerCase()) {
        this._schoolService.getAllByOwner(u.user.id).subscribe(schools => this.schools = schools);
      } else {
        this._schoolService.getAll().subscribe(schools => this.schools = schools);
      }
    }
  });

  onSchoolSelectAction($event: boolean) {
    const showOb = new Observable<boolean>((subscriber) => {
      subscriber.next($event);
      subscriber.complete();
    });
    showOb.subscribe((show) => this.showSchoolsDialog = show);
  }
}
