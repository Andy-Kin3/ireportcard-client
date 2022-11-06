import {Component, Input, OnInit} from '@angular/core';
import {DepartmentService} from "../../../../../services/department.service";
import {School} from "../../../../../models/dto/school.model";
import {Department} from "../../../../../models/dto/department.model";
import {Section} from "../../../../../models/dto/section.model";
import {NO_ENTITY_ID} from "../../../../../models/base/base.model";

@Component({
  selector: 'app-department-settings',
  templateUrl: './department-settings.component.html',
  styleUrls: ['./department-settings.component.scss']
})
export class DepartmentSettingsComponent implements OnInit {

  @Input() school?: School;
  departments: Department[] = [];
  constructor(
    private _departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {
  }

  loadDepartments = () => {
    if (this.school?.id) {
      this._departmentService.getAllBySchoolId(this.school.id).subscribe(res => this.departments = res);
    }
  }
  saveDepartment(departmentInput: HTMLInputElement | Department, blocked: boolean) {
    if (this.school) {
      if (blocked) {
        if (departmentInput instanceof HTMLInputElement) {
          if (departmentInput.hidden && departmentInput.value !== "") {
            const department: Department = new Department(departmentInput.value, this.school.id!!);

            this._departmentService.save(department).subscribe(() => {
              departmentInput.value = "";
              this.loadDepartments();
            });
          }
        } else {
          this._departmentService.update(departmentInput).subscribe(() => this.loadDepartments());
        }
      }
    }
  }

  deleteDepartment(section: Section) {
    // this._departmentService.delete(section.id ?? NO_ENTITY_ID).subscribe(() => this.loadSections());
  }

}
