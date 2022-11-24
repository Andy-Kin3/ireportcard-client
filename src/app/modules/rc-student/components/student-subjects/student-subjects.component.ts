import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {UserService} from "../../../../services/user.service";
import {StudentApplicationService} from "../../../../services/student-application.service";
import {StudentApplication, StudentApplicationTrial} from "../../../../models/dto/student-application.model";
import {SchoolService} from "../../../../services/school.service";
import {SubjectRegistrationService} from "../../../../services/subject-registration.service";
import {RcSubjectRegistered} from "../../../../app.types";
import {SubjectService} from "../../../../services/subject.service";
import {Subject} from "../../../../models/dto/subject.model";
import {SubjectRegistration} from "../../../../models/dto/subject-registration.model";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.scss']
})
export class StudentSubjectsComponent implements OnInit {
  student!: Student;
  currentTrial?: StudentApplicationTrial;
  studentApplicationTrials: StudentApplicationTrial[] = [];
  studentApplications: StudentApplication[] = [];
  subjectsRegistered: RcSubjectRegistered[] = [];
  subjects: Subject[] = []

  constructor(
    private userService: UserService,
    private schoolService: SchoolService,
    private subjectService: SubjectService,
    private studentApplicationService: StudentApplicationService,
    private subjectRegistrationService: SubjectRegistrationService,
  ) {
  }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent = () => {
    this.userService.getCompleteFromSession().subscribe(user => {
      this.student = user.account as Student;
      this.schoolService.getById(this.student.schoolId).subscribe(school => {
        this.studentApplicationService.getTrialByStudent(this.student.id ?? NO_ENTITY_ID).subscribe(
          (res) => {
            this.currentTrial = res.find(sat => sat.academicYearId == school.currentYearId);
            if (this.currentTrial) {
              this.loadRegisteredSubjects(this.currentTrial.id);
            }
          }
        );
      });
      this.studentApplicationService.getAllByStudent(this.student.id ?? NO_ENTITY_ID).subscribe(
        (res) => {
          this.studentApplications = res
        }
      );
    });
  }

  loadUnregisteredSubjects = (subjectRegistrations: SubjectRegistration[]) => {
    this.subjectService.getAllBySchoolId(this.student.schoolId).subscribe(res => {
      this.subjects = [];
      res.forEach(subject => {
        if (!subjectRegistrations.map(sr => sr.subjectId).find(id => id == subject.id)) {
          this.subjects.push(subject);
        }
      })
    });
  }

  loadRegisteredSubjects = (satId: number) => {
    this.subjectRegistrationService.getBySatId(satId).subscribe((res) => {
      this.subjectsRegistered = [];
      res.forEach(sr => this.subjectService.getById(sr.subjectId).subscribe(subject => {
        this.subjectsRegistered.push({registration: sr, subject: subject, complete: true});
      }));

      this.loadUnregisteredSubjects(res)
    })
  }

  addOrRemoveUncompletedRegisteredSubjectAction(subject: Subject, adding: boolean, sr?: RcSubjectRegistered) {
    if (this.currentTrial) {
      if (adding) {
        this.subjectsRegistered.push({
          subject: subject,
          complete: false,
          registration: {
            subjectId: subject.id ?? NO_ENTITY_ID,
            satId: this.currentTrial.id,
          }
        });
        this.subjects = this.subjects.filter(s => s.id != subject.id);
      } else {
        if (sr && sr.complete) {
          this.subjectRegistrationService.delete(sr.registration.id ?? NO_ENTITY_ID).subscribe(() => this.loadStudent())
        }
        this.subjectsRegistered = this.subjectsRegistered.filter(sr => sr.subject.id != subject.id)
        this.subjects.push(subject);
      }
    }
  }

  createStudentApplicationAction() {

  }

  saveRegisteredSubjectsAction() {
    const subjectsToRegister = this.subjectsRegistered.filter(sr => !sr.complete).map(sr => sr.registration);
    console.log(subjectsToRegister)
    this.subjectRegistrationService.saveMultiple(subjectsToRegister).subscribe(() => this.loadStudent());
  }
}
