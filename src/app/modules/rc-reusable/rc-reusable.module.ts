import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RcSharedModule} from "../rc-shared.module";
import {TopMenuComponent} from "./components/top-menu/top-menu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {ViewApplicationComponent} from "./components/view-application/view-application.component";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

@NgModule({
  declarations: [
    TopMenuComponent,
    FooterComponent,
    ViewApplicationComponent,
    ChangePasswordComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    RcSharedModule
  ],
  exports: [
    TopMenuComponent,
    FooterComponent,
    ViewApplicationComponent,
    ChangePasswordComponent,
    UserDetailsComponent
  ]
})
export class RcReusableModule {
}
