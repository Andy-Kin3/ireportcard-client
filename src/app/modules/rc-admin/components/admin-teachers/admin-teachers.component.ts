import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../../../services/teacher.service";
import {Teacher} from "../../../../models/dto/teacher.model";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/dto/school.model";
import {UserService} from "../../../../services/user.service";
import {Admin} from "../../../../models/dto/admin.model";
import {TeacherServiceStrategyParams} from "../../../../services/strategy/service.strategy.params";
import {TeacherServiceStrategy} from "../../../../services/strategy/service.strategy";


@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.scss']
})
export class AdminTeachersComponent implements OnInit {
  schoolId: number = -1;
  schools: School[] = [];
  teachers: Teacher[] = [];

  constructor(
    private _userService: UserService,
    private _schoolService: SchoolService,
    private _teacherService: TeacherService,
  ) {
  }

  ngOnInit(): void {
    this._userService.getCompleteFromSession().subscribe((userComplete) => {
      const schoolManagerId = (userComplete.account as Admin).schoolManagerId
      this.loadSchools(schoolManagerId);
      this.loadTeachers({schoolManagerId: schoolManagerId});
    });
  }

  loadTeachers = (params: TeacherServiceStrategyParams) => {
    if (params.schoolId && params.schoolId > 0) {
      this._teacherService.loadTeachers(
        this.teachers,
        TeacherServiceStrategy.BY_SCHOOL,
        {schoolId: params.schoolId});
    } else {
      this._teacherService.loadTeachers(
        this.teachers,
        TeacherServiceStrategy.BY_SCHOOL_MANAGER,
        {schoolManagerId: params.schoolManagerId}
      );
    }
  }

  loadSchools = (smId: number) => {
    this._schoolService.getAllBySchoolManagerId(smId).subscribe(schools => this.schools = schools);
  }
}
