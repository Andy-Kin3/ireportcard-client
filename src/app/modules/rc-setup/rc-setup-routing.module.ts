import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetupComponent} from "./components/setup/setup.component";
import {SetupHomeComponent} from "./components/setup-home/setup-home.component";
import {SetupSchoolManagerComponent} from "./components/setup-school-manager/setup-school-manager.component";

const routes: Routes = [
  {
    component: SetupComponent, path: 'setup', canActivate: [/* AuthGuard, AuthAdminGuard */],
    children: [
      {component: SetupHomeComponent, path: ''},
      {component: SetupSchoolManagerComponent, path: 'school-manager'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RcSetupRoutingModule {
}
