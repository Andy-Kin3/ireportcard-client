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


@Component({
  selector: 'app-rc-applications',
  templateUrl: './rc-applications.component.html',
  styleUrls: ['./rc-applications.component.scss']
})
export class RcApplicationsComponent implements OnInit {
  schoolId = LocalStorageUtil.readSchoolId();
  applicationsQueried: boolean = false;

  studentApplicationTrials: StudentApplicationTrial[] = [];

  studentATs: SAT[] = [];
  applicationsRequest: ApplicationsRequest;

  academicYears: AcademicYear[] = [];
  classes: StudentClassLevel[] = []

  constructor(
    private modalService: NgbModal,
    private classService: ClassLevelService,
    private classSubService: ClassLevelSubService,
    private academicYearService: AcademicYearService,
    private studentApplicationService: StudentApplicationService
  ) {
    this.applicationsRequest = {yearId: -1, classSubId: -1}
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
    this.academicYearService.getAll().subscribe((years) => {
      this.academicYears = years;
      if (years.length > 0) this.applicationsRequest.yearId = years[0].id
    });
  }

  loadClasses() {
    if (this.schoolId) {
      this.classService.getBySchool(this.schoolId).subscribe((classes) => {
        classes.forEach(c => this.classSubService.getAllByClassLevelId(c.id).subscribe((classSubs) => {
          classSubs.forEach((cs) => {
            this.classes.push({
              id: c.id, subId: cs.id, name: `${c.name} ${cs.name}`, classLevel: c, classLevelSub: cs
            });
          });
          if (this.classes.length > 0) this.applicationsRequest.classSubId = this.classes[0].subId
        }));
      });
    }
  }

  loadApplications() {
    this.studentATs = [];
    console.log(this.applicationsRequest);
    if (this.applicationsRequest.yearId > 0) {
      const classId: number = this.applicationsRequest.classSubId;
      const yearId: number = this.applicationsRequest.yearId;
      this.studentApplicationService.getTrialByClassAndYear(classId, yearId).subscribe({
        next: (response) => {
          this.studentApplicationTrials = response;
          response.forEach((sat) => {
            this.studentApplicationService.get(sat.applicationKey).subscribe((sa) => {
              this.academicYearService.getById(sat.academicYearId).subscribe(academicYear => {
                this.studentATs.push({student: sa.student, sat: sat, sa: sa, year: academicYear})
              })
            })
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
