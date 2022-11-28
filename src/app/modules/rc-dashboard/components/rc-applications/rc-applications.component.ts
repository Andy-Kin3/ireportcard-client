import {Component, OnInit} from '@angular/core';
import {ApplicationsRequest, StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SAT, StudentClassLevel} from "../../../../app.types";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {AcademicYearServiceStrategy, SchoolBaseServiceStrategy} from "../../../../services/strategy/service.strategy";
import {StudentClassLevelService} from "../../../../services/student-class-level.service";
import {EntityUtil} from "../../../../utils/entity.util";


@Component({
  selector: 'app-rc-applications',
  templateUrl: './rc-applications.component.html',
  styleUrls: ['./rc-applications.component.scss']
})
export class RcApplicationsComponent implements OnInit {
  schoolId = LocalStorageUtil.readSchoolId() ?? NO_ENTITY_ID;
  applicationsQueried: boolean = false;

  studentApplicationTrials: StudentApplicationTrial[] = [];

  studentATs: SAT[] = [];
  request: ApplicationsRequest;

  academicYears: AcademicYear[] = [];
  classes: StudentClassLevel[] = []

  constructor(
    private modalService: NgbModal,
    private classService: ClassLevelService,
    private classSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private _studentClassLevelService: StudentClassLevelService,
    private studentApplicationService: StudentApplicationService
  ) {
    this.request = {yearId: -1, classSubId: -1}
  }

  ngOnInit(): void {
    this.loadAcademicYears();
    this.loadClasses();

    const loadApplicationsInterval = setInterval(() => {
      if (this.applicationsQueried) clearInterval(loadApplicationsInterval);
      else this.loadApplications();
    }, 1000);
    setTimeout(() => {
      clearInterval(loadApplicationsInterval)
    }, 20000)
  }

  loadAcademicYears() {
    this.academicYearService.loadAcademicYears(
      this.academicYears,
      AcademicYearServiceStrategy.BY_SCHOOL,
      {schoolId: this.schoolId},
      [(yearsRes: AcademicYear[]) => {
        if (yearsRes.length > 0) this.request.yearId = yearsRes[0].id ?? NO_ENTITY_ID;
        this.academicYears = yearsRes
      }]
    )
  }

  loadClasses() {
    if (EntityUtil.isValidId(this.schoolId)) {
      this._studentClassLevelService.loadStudentClassLevels(
        this.classes, SchoolBaseServiceStrategy.BY_SCHOOL, {schoolId: this.schoolId},
        [(sclRes: StudentClassLevel[]) => {
          this.classes = sclRes;
          if (sclRes.length > 0) this.request.classSubId = sclRes[0].subId;
        }]
      );
    }
  }

  loadApplications() {
    this.studentATs = [];
    if (EntityUtil.areValidIds([this.request.yearId, this.request.classSubId])) {
      const classSubId: number = this.request.classSubId;
      const academicYearId: number = this.request.yearId;
      this.studentApplicationService.getAllByClassSubIdAndAcademicYearId(academicYearId, classSubId).subscribe({
        next: (response) => {
          response.forEach((satResponse) => {
            this.academicYearService.getById(academicYearId).subscribe(academicYear => {
              this.studentATs.push({
                student: satResponse.student,
                sa: satResponse.application,
                sat: satResponse.applicationTrials[0],
                year: academicYear
              });
            });
          });
        },
        complete: () => this.applicationsQueried = true
      });
    } else this.studentATs = [];
  }

  deleteSatAction(id: number) {
    this.studentApplicationService.deleteTrial(id).subscribe(() => this.loadApplications());
  }
}
