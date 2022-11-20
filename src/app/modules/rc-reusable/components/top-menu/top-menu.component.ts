import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {ReportCardService} from "../../../../services/report-card.service";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {UserService} from "../../../../services/user.service";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {User} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-top-menu',
  styleUrls: ['./top-menu.component.scss'],
  template: `
    <div class="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static" style="height:60px">
      <div class="flex">
        <a pRipple class="cursor-pointer block lg:hidden text-700 mr-3" pStyleClass="#app-sidebar" enterClass="hidden" enterActiveClass="fadeinleft" leaveToClass="hidden" leaveActiveClass="fadeoutleft" [hideOnOutsideClick]="true">
          <i class="pi pi-bars text-4xl"></i>
        </a>
        <span class="p-input-icon-left">
                    <i class="pi pi-search"></i>
                    <input type="text" pInputText class="border-none w-10rem sm:w-20rem" placeholder="Search">
                </span>
      </div>
      <a pRipple class="cursor-pointer block lg:hidden text-700" pStyleClass="@next" enterClass="hidden" enterActiveClass="fadein" leaveToClass="hidden" leaveActiveClass="fadeout" [hideOnOutsideClick]="true">
        <i class="pi pi-ellipsis-v text-2xl"></i>
      </a>
      <ul class="list-none p-0 m-0 hidden lg:flex lg:align-items-center select-none lg:flex-row
                surface-section border-1 lg:border-none surface-border right-0 top-100 z-1 shadow-2 lg:shadow-none absolute lg:static">
        <li>
          <a pRipple class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                        transition-duration-150 transition-colors">
            <i class="pi pi-inbox text-base lg:text-2xl mr-2 lg:mr-0"></i>
            <span class="block lg:hidden font-medium">Inbox</span>
          </a>
        </li>
        <li>
          <a pRipple class="flex p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer
                        transition-duration-150 transition-colors">
            <i class="pi pi-bell text-base lg:text-2xl mr-2 lg:mr-0" pBadge severity="danger"></i>
            <span class="block lg:hidden font-medium">Notifications</span>
          </a>
        </li>
        <li class="border-top-1 surface-border lg:border-top-none">
          <a pRipple (click)="logoutAction()" class="flex p-3 lg:px-3 lg:py-2 align-items-center hover:surface-100 font-medium border-round cursor-pointer
                        transition-duration-150 transition-colors text-decoration-none">
            <i class="pi pi-sign-out text-base lg:text-2xl mr-2 lg:mr-0 text-red-400"></i>
            <div class="block lg:hidden">
              <div class="text-900 font-medium">{{user?.username  ?? ''}}</div>
              <span class="text-600 font-medium text-sm">{{user?.role  ?? ''}}</span>
            </div>
          </a>
        </li>
      </ul>
    </div>

  `
})
export class TopMenuComponent implements OnInit {
  user?: User;
  online: boolean = false;
  hideAdminLink: boolean = true;
  @Input() menuItems: MenuItem[] = [];
  schoolsByAdmin: School[] = [];
  selectedSchoolId: number = LocalStorageUtil.readSchoolId() ?? -1;


  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _defaultService: ReportCardService,
    private _msgService: MessageService,
    private _userService: UserService,
    private _schoolService: SchoolService) {
  }

  ngOnInit(): void {
    this.checkOnlineStatus();
    this._userService.getCompleteFromSession().subscribe(u => this.user = u.user);
    // this.loadSchoolsByAdmin(); // TODO find  better way to do this
  }

  loadSchoolsByAdmin = () => this._userService.getCompleteFromSession().subscribe(u => {
    if (!u.account) this.hideAdminLink = false;
    this._schoolService.getAllByOwner(u.user.id ?? NO_ENTITY_ID).subscribe(
      (schools) => this.schoolsByAdmin = schools
    );
  })

  checkOnlineStatus(): void {
    this._defaultService.test().subscribe({
      next: () => this.online = true,
      error: () => this.online = false
    });
  }

  logoutAction() {
    const confirmDelete = confirm("Are you sure you want to log out?");
    const sessionId: string | null = LocalStorageUtil.readUserToken();
    if (sessionId && confirmDelete) {
      this._authService.logout({sessionId: sessionId}).subscribe({
        next: (res) => {
          this._router.navigate(['/auth/login']).then(() => {
            addToMessageService(this._msgService, 'success', 'Log out', res.message);
          });
          LocalStorageUtil.deleteUserToken();
          LocalStorageUtil.deleteSchoolId();
        }, error: (e: HttpErrorResponse) => {
          addToMessageService(this._msgService, 'warn', 'Log out', e.error.message)
        }
      });
    }

  }

  changeSchoolAction() {
    if (this.selectedSchoolId > 0) {
      LocalStorageUtil.writeSchoolId(this.selectedSchoolId);
      location.reload();
    }
  }
}
