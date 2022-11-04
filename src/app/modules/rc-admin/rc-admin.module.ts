import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RcAdminRoutingModule} from './rc-admin-routing.module';
import {AdminSettingComponent} from './components/admin-setting/admin-setting.component';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {AdminUsersComponent} from './components/admin-users/admin-users.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";
import {ToolbarModule} from "primeng/toolbar";
import {AdminTeachersComponent} from './components/admin-teachers/admin-teachers.component';
import {AdminAddTeacherComponent} from './components/admin-teachers/admin-add-teacher/admin-add-teacher.component';
import {AdminViewTeacherComponent} from './components/admin-teachers/admin-view-teacher/admin-view-teacher.component';
import {AdminAdminsComponent} from './components/admin-admins/admin-admins.component';
import {AdminAddAdminComponent} from './components/admin-admins/admin-add-admin/admin-add-admin.component';
import {AdminViewAdminComponent} from './components/admin-admins/admin-view-admin/admin-view-admin.component';
import {RcAuthModule} from "../rc-auth/rc-auth.module";
import { AdminSchoolSettingComponent } from './components/admin-school-setting/admin-school-setting.component';


@NgModule({
  declarations: [
    AdminSettingComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminHomeComponent,
    AdminTeachersComponent,
    AdminAddTeacherComponent,
    AdminViewTeacherComponent,
    AdminAdminsComponent,
    AdminAddAdminComponent,
    AdminViewAdminComponent,
    AdminSchoolSettingComponent
  ],
  imports: [
    CommonModule,
    RcAdminRoutingModule,
    RcSharedModule,
    RcReusableModule,
    ToolbarModule,
    RcAuthModule,
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class RcAdminModule {
}
