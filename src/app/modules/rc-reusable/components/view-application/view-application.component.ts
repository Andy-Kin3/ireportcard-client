import {Component, Input, OnInit} from '@angular/core';
import {StudentApplication, StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {FormBuilder} from "@angular/forms";
import {Subject} from "../../../../models/dto/subject.model";
import {SubjectService} from "../../../../services/subject.service";
import {SubjectRegistration} from "../../../../models/dto/subject-registration.model";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {StudentService} from "../../../../services/student.service";
import {Student} from "../../../../models/dto/student.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {Dropdown} from "primeng/dropdown";
import {Term} from "../../../../models/dto/term.model";
import {TermService} from "../../../../services/term.service";
import {ReportCardService} from "../../../../services/report-card.service";
import {RcSubjectRegistered} from "../../../../app.types";
import {SCHOOL_ID_LOCAL} from "../../../../utils/local-storage.util";

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  @Input() satId: number = -1;
  student!: Student;
  studentApplication!: StudentApplication;
  studentApplicationTrial!: StudentApplicationTrial;
  registeredSubjects: RcSubjectRegistered[] = [];
  subjects: Subject[] = [];
  terms: Term[] = [];
  academicYears: AcademicYear[] = [];

  alreadyAddedSubject: boolean = false;
  subjectsToRegister: Subject[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msgService: MessageService,
    private reportCardService: ReportCardService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private termService: TermService,
    private _studentApplicationService: StudentApplicationService,
    private _subjectRegistrationService: SubjectRegistrationService,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.loadStudentApplicationTrial(this.satId);
  }

  loadData = () => {
    this.termService.getAllBySchoolId(SCHOOL_ID_LOCAL).subscribe((terms) => this.terms = terms);
    this.subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
  }

  loadStudentApplicationTrial = (satId: number) => {
    this._studentApplicationService.getTrial(satId).subscribe((sat) => {
      this.studentApplicationTrial = sat;
      this.loadRegisteredSubjects(satId);
      this._studentApplicationService.get(sat.applicationKey).subscribe((application) => {
        this.studentApplication = application;
        this.student = application.student;
      });
    });
  }

  loadRegisteredSubjects = (satId: number) => {
    this.registeredSubjects = [];
    this._subjectRegistrationService.getBySatId(satId).subscribe((subjectRegs) => {
      subjectRegs.forEach(subjectReg => {
        this.subjectService.getById(subjectReg.subjectId).subscribe((subject) => {
          this.registeredSubjects.push({
            registration: subjectReg,
            subject: subject,
            complete: true
          });
        });
      });
    });
  }

  unregisterSubjectAction(subject: RcSubjectRegistered) {
    this._subjectRegistrationService.delete(subject.registration.id!!).subscribe(() => this.loadRegisteredSubjects(subject.registration.satId));
  }

  addSubjectToRegisterAction(subjectDropDown: Dropdown) {
    const subjectId = subjectDropDown.value;
    if (subjectId) {
      const selectedSubject = this.subjects.find(s => s.id == subjectId)
      const subjectRegistered = this.registeredSubjects.find(s => s.subject.id == subjectId);
      const subjectSelected = this.subjectsToRegister.find(s => s.id == subjectId);
      if (!(subjectSelected || subjectRegistered) && selectedSubject) {
        this.subjectsToRegister.push(selectedSubject);
      }
    }
  }

  removeSubjectToRegister(subjectId: number) {
    this.subjectsToRegister = this.subjectsToRegister.filter(s => s.id != subjectId)
  }

  registerSubjectsAction() {
    if (this.studentApplicationTrial && this.subjectsToRegister.length != 0) {
      const subjectRegs: SubjectRegistration[] = [];
      const satId = this.studentApplicationTrial.id;
      this.subjectsToRegister.forEach(s => subjectRegs.push({
        subjectId: s.id!!, satId: satId, id: 0
      }));
      this._subjectRegistrationService.saveMultiple(subjectRegs).subscribe(() => {
        this.loadRegisteredSubjects(satId);
        this.subjectsToRegister = [];
      });
    }
  }

  getReportCardAction(termId: number) {
    this.reportCardService.getReportCardFile(this.satId, termId).subscribe();
  }
}
