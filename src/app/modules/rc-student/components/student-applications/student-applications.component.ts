import {Component, OnInit} from '@angular/core';
import {UserComplete} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {Student} from "../../../../models/dto/student.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {SAT} from "../../../../app.types";

@Component({
  selector: 'app-student-applications',
  templateUrl: './student-applications.component.html',
  styleUrls: ['./student-applications.component.scss']
})
export class StudentApplicationsComponent implements OnInit {
  userComplete?: UserComplete;
  sats: SAT[] = [];

  constructor(
    private _userService: UserService,
    private _academicYearService: AcademicYearService,
    private _studentApplicationService: StudentApplicationService
  ) {
  }

  ngOnInit(): void {
    this.loadUser();
  }


  loadUser = () => this._userService.getCompleteFromSession().subscribe((user) => {
    this.userComplete = user;
    const student = user.account as Student;
    console.log(student.schoolId)
    this.loadStudentApplications(student.id!!);
  });

  loadStudentApplications = (studentId: number) => {
    this._studentApplicationService.getAllByStudent(studentId).subscribe((res) => {
      res.forEach(sa => sa.studentApplicationTrials.forEach(sat => {
        this._academicYearService.getById(sat.academicYearId).subscribe(academicYear => {
          this.sats.push({student: sa.student, sat: sat, sa: sa, year: academicYear})
        })
      }));
    });
  }

}
