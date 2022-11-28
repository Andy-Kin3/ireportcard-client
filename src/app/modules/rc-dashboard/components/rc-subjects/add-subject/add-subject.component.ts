import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {Router} from "@angular/router";
import {SchoolService} from "../../../../../services/school.service";
import {DepartmentService} from "../../../../../services/department.service";
import {Department} from "../../../../../models/dto/department.model";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  subjectForm: FormGroup = this.fb.group({});
  departments: Department[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _schoolService: SchoolService,
    private _subjectService: SubjectService,
    private _departmentService: DepartmentService,
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required], code: ['', Validators.required],
      coeff: ['', Validators.required], department: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    const schoolIdOb = this._schoolService.loadSchoolIdLocalStorage();
    schoolIdOb.subscribe((id) => this.loadDepartments(id));
  }

  loadDepartments = (schoolId: number) => {
    if (schoolId) {
      this._departmentService.getAllBySchoolId(schoolId).subscribe((department) => {
        this.departments = department;
      });
    }
  }

  saveSubjectAction() {
    const subject: Subject = {
      name: this.subjectForm.get('name')?.value,
      code: this.subjectForm.get('code')?.value,
      coefficient: this.subjectForm.get('coeff')?.value,
      departmentId: this.subjectForm.get('department')?.value
    }
    this._subjectService.save(subject).subscribe(() => {
      this.router.navigate([`/dashboard/subject`]).then();
    });
  }
}
