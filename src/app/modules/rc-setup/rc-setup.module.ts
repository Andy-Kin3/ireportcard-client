import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RcSetupRoutingModule } from './rc-setup-routing.module';
import { SetupSchoolManagerComponent } from './components/setup-school-manager/setup-school-manager.component';
import { SetupHomeComponent } from './components/setup-home/setup-home.component';
import {SetupComponent} from "./components/setup/setup.component";
import {RcSharedModule} from "../rc-shared.module";
import {RcReusableModule} from "../rc-reusable/rc-reusable.module";


@NgModule({
  declarations: [
    SetupComponent,
    SetupSchoolManagerComponent,
    SetupHomeComponent
  ],
  imports: [
    CommonModule,
    RcSetupRoutingModule,
    RcSharedModule,
    RcReusableModule,
  ]
})
export class RcSetupModule { }
