import {Component, OnInit} from '@angular/core';
import {AcademicYearService} from "../../../../services/academic-year.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SubjectTeacherService} from "../../../../services/subject-teacher.service";
import {UserService} from "../../../../services/user.service";
import {Teacher} from "../../../../models/dto/teacher.model";
import {StudentClassLevel} from "../../../../app.types";
import {SCHOOL_ID_LOCAL} from "../../../../utils/local-storage.util";
import {StudentClassLevelService} from "../../../../services/student-class-level.service";
import {AcademicYearServiceStrategy, SchoolBaseServiceStrategy} from "../../../../services/strategy/service.strategy";

@Component({
  selector: 'app-teacher-class-list',
  templateUrl: './teacher-class-list.component.html',
  styleUrls: ['./teacher-class-list.component.scss']
})
export class TeacherClassListComponent implements OnInit {
  teacher?: Teacher;

  classes: StudentClassLevel[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];

  constructor(
    private userService: UserService,
    private subjectService: SubjectService,
    private sequenceService: SequenceService,
    private _academicYearService: AcademicYearService,
    private subjectTeacherService: SubjectTeacherService,
    private _studentClassLevelService: StudentClassLevelService
  ) {
  }

  ngOnInit(): void {
    this.userService.getCompleteFromSession().subscribe(u => {
      this.teacher = u.account as Teacher;
      if (u.account) this.loadData(u.account as Teacher)
    });
  }

  loadData = (teacher: Teacher) => {
    this._academicYearService.loadAcademicYears(
      this.academicYears, AcademicYearServiceStrategy.BY_SCHOOL,
      {schoolId: teacher.schoolId},
      [(academicYears: AcademicYear[]) => this.academicYears = academicYears]
    );
    this.sequenceService.getAllBySchoolId(SCHOOL_ID_LOCAL).subscribe((sequences) => this.sequences = sequences);
    this.subjectTeacherService.getAllByTeacher(teacher.id!!).subscribe((sts) => sts.forEach(st => {
      this.subjectService.getById(st.key.subjectId).subscribe(subject => this.subjects.push(subject));
    }));
    this._studentClassLevelService.loadStudentClassLevels(
      this.classes, SchoolBaseServiceStrategy.BY_SCHOOL,
      {schoolId: SCHOOL_ID_LOCAL},
      [(studentClassLevels: StudentClassLevel[]) => this.classes = studentClassLevels]
    )
  }

}
