import '@angular/compiler';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RcAuthModule} from './modules/rc-auth/rc-auth.module';
import {RcDashboardModule} from "./modules/rc-dashboard/rc-dashboard.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {injectables} from "./app.injectables";
import {MessageService} from "primeng/api";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RcWelcomeComponent} from './components/rc-welcome/rc-welcome.component';
import {HttpResponseInterceptor} from "./interceptors/http-response.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {RcAdminModule} from "./modules/rc-admin/rc-admin.module";
import {RcStudentModule} from "./modules/rc-student/rc-student.module";
import {RcReusableModule} from "./modules/rc-reusable/rc-reusable.module";
import {RcSharedModule} from "./modules/rc-shared.module";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {RcSetupModule} from "./modules/rc-setup/rc-setup.module";
import {SampleComponent} from './components/sample/sample.component';


@NgModule({
  declarations: [
    AppComponent,
    RcWelcomeComponent,
    SampleComponent,
  ],
  imports: [
    RcReusableModule,
    RcSharedModule,
    RcDashboardModule,
    RcAuthModule,
    RcAdminModule,
    RcStudentModule,
    RcSetupModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    injectables,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true},
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: MessageService, useClass: MessageService},
    {provide: NgbActiveModal, useClass: NgbActiveModal},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
