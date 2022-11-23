import {Component, OnInit} from '@angular/core';
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Term} from "../../../../models/dto/term.model";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {UserService} from "../../../../services/user.service";
import {UserComplete} from "../../../../models/dto/user.model";
import {Student} from "../../../../models/dto/student.model";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {StudentClassLevel} from "../../../../app.types";
import {ReportCardModel} from "../../../../models/dto/report-card.model";
import {ReportCardService} from "../../../../services/report-card.service";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";

@Component({
  selector: 'app-student-results',
  templateUrl: './student-results.component.html',
  styleUrls: ['./student-results.component.scss']
})
export class StudentResultsComponent implements OnInit {
  reportCardModel?: ReportCardModel;
  user!: UserComplete;
  rcRequest: { termId: number, academicYearId: number, classLevelSubId: number };
  studentClassLevels: StudentClassLevel[] = [];
  terms: Term[] = [];
  academicYears: AcademicYear[] = [];
  studentApplicationTrials: StudentApplicationTrial[] = [];

  constructor(
    private _userService: UserService,
    private _termService: TermService,
    private _reportCardService: ReportCardService,
    private _academicYearService: AcademicYearService,
    private _studentApplicationService: StudentApplicationService,
  ) {
    this.rcRequest = {termId: -1, academicYearId: -1, classLevelSubId: -1}
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadTerms();
    this.loadYears();
    setTimeout(() => this.requestResults(), 5000)
  }

  loadUser = () => this._userService.getCompleteFromSession().subscribe(res => {
    this.user = res;
    const student = this.user.account as Student;
    this._studentApplicationService.getAllByStudent(student.id!!).subscribe(
      (studentApplications) => {
        this.studentApplicationTrials = [];
        studentApplications.forEach(sa => {
          this.studentApplicationTrials.push(...sa.studentApplicationTrials);
          this.studentClassLevels.push({
            classLevel: sa.classLevel,
            id: sa.classLevel.id!!,
            classLevelSub: sa.classLevelSub,
            subId: sa.classLevelSub.id!!,
            name: `${sa.classLevel.name} ${sa.classLevelSub.name}`
          });
          this.rcRequest.classLevelSubId = sa.classLevelSub.id!!;
        });
      }
    );
  });
  loadTerms = () => this._termService.getAllBySchoolId(0 /* TODO remove this */).subscribe(res => this.terms = res);
  loadYears = () => this._academicYearService.getAll().subscribe(res => this.academicYears = res);

  requestResults() {
    const requestResultAlright: boolean = this.rcRequest.termId > 0 &&
      this.rcRequest.academicYearId > 0 && this.rcRequest.classLevelSubId > 0;
    if (requestResultAlright) {
      const student: Student = this.user.account as Student;
      this._studentApplicationService.getTrialWithParams(
        student.id!!,
        this.rcRequest.classLevelSubId,
        this.rcRequest.academicYearId
      ).subscribe({
        next: (sat) => {
          this.loadReportCardModel(sat.id, this.rcRequest.termId);
        }, error: (e) => console.log(e)
      });
    }
  }

  loadReportCardModel = (satId: number, termId: number) => {
    this.reportCardModel = undefined;
    this._reportCardService.getReportCard(satId, termId).subscribe((reportCardModel) => {
      this.reportCardModel = reportCardModel;
      console.log(reportCardModel)
    });
  }

  loadReportCardFile = (satId: number, termId: number) => {
    this._reportCardService.getReportCardFile(satId, termId).subscribe();
  }
}
