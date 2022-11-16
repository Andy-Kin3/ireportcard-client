import {Component, OnInit} from '@angular/core';
import {AcademicYearService} from "../../../../services/academic-year.service";
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {SectionService} from "../../../../services/section.service";
import {LocalStorageUtil, SCHOOL_ID_LOCAL} from "../../../../utils/local-storage.util";
import {StudentClassLevel} from "../../../../app.types";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {StudentClassLevelService} from "../../../../services/student-class-level.service";
import {SchoolBaseServiceStrategy} from "../../../../services/strategy/service.strategy";

@Component({
  selector: 'app-rc-classlists',
  templateUrl: './rc-class-lists.component.html',
  styleUrls: ['./rc-class-lists.component.scss']
})
export class RcClassListsComponent implements OnInit {
  classes: StudentClassLevel[] = [];
  academicYears: AcademicYear[] = [];
  subjects: Subject[] = [];
  sequences: Sequence[] = [];
  private readonly schoolId = LocalStorageUtil.readSchoolId();

  constructor(
    private _sectionService: SectionService,
    private _subjectService: SubjectService,
    private _sequenceService: SequenceService,
    private _classLevelService: ClassLevelService,
    private _academicYearService: AcademicYearService,
    private _classLevelSubService: ClassLevelSubService,
    private _studentClassLevelService: StudentClassLevelService,
  ) {
  }

  ngOnInit(): void {
    this.loadClasses();
    this._academicYearService.getAll().subscribe(years => this.academicYears = years);
    this._subjectService.getAll().subscribe((subjects) => this.subjects = subjects);
    this._sequenceService.getAllBySchoolId(SCHOOL_ID_LOCAL).subscribe((sequences) => this.sequences = sequences);
  }

  loadClasses() { // TODO identify all bulk methods like this and clean
    if (this.schoolId) {
      this._studentClassLevelService.loadStudentClassLevels(
        this.classes, SchoolBaseServiceStrategy.BY_SCHOOL,
        {schoolId: SCHOOL_ID_LOCAL},
        [(classLevels: StudentClassLevel[]) => this.classes = classLevels]
      );
    }
  }
}
