import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {UserComplete} from "../../../../models/dto/user.model";
import {StudentService} from "../../../../services/student.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {ApplicationRequest, StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {Student} from "../../../../models/dto/student.model";
import {StudentClassLevel} from "../../../../app.types";
import {StudentClassLevelService} from "../../../../services/student-class-level.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  student?: UserComplete;
  sat?: StudentApplicationTrial;
  studentClassLevels: StudentClassLevel[] = [];
  showApplyDialog: boolean = false;
  selectClassLevelForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _studentService: StudentService,
    private _studentClassLevelService: StudentClassLevelService,
    private _studentApplicationService: StudentApplicationService,
  ) {
    this.selectClassLevelForm = this._fb.group({
      classLevel: [0, Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadUserComplete();
  }

  loadUserComplete = () => this._userService.getCompleteFromSession().subscribe(u => {
    this.student = u;
    this.loadClassLevels((u.account as Student).schoolId);
    this.loadCurrentStudentApplicationTrial((u.account as Student).id ?? NO_ENTITY_ID);
  });

  loadClassLevels = (schoolId: number) => this._studentClassLevelService.getAllBySchool(schoolId).subscribe((res) => {
    console.log(res)
    this.studentClassLevels = res;
  })

  loadCurrentStudentApplicationTrial = (studentId: number) => {
    this._studentApplicationService.getTrialByStudentAndCurrentYear(studentId).subscribe(trial => {
      if (trial) {
        this.showApplyDialog = false;
        this.sat = trial;
      } else {
        this.showApplyDialog = true;
      }
    });
  }

  createStudentApplicationAction = () => {
    if (this.student) {
      const classSubId: number = this.selectClassLevelForm.get('classLevel')?.value
      const applicationRequest: ApplicationRequest = {
        studentId: (this.student.account as Student).id ?? NO_ENTITY_ID,
        classSubId: classSubId,
        academicYearId: -1 // setting this so the current academic year is used instead
      }
      this._studentApplicationService.save(applicationRequest).subscribe(() => this.loadUserComplete());
    }
  }
}
