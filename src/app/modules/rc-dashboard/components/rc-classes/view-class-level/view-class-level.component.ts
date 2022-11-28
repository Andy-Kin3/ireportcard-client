import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassLevel} from "../../../../../models/dto/class-level.model";
import {ClassLevelSubService} from "../../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../../models/dto/class-level-sub.model";
import {ClassLevelService} from "../../../../../services/class-level.service";
import {SectionService} from "../../../../../services/section.service";
import {Section} from "../../../../../models/dto/section.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {NO_ENTITY_ID} from "../../../../../models/base/base.model";
import {LocalStorageUtil} from "../../../../../utils/local-storage.util";

@Component({
  selector: 'app-class',
  templateUrl: './view-class-level.component.html',
  styleUrls: ['./view-class-level.component.scss']
})
export class ViewClassLevelComponent implements OnInit {
  readonly schoolId = LocalStorageUtil.readSchoolId() ?? NO_ENTITY_ID;
  classForm: FormGroup;
  msFormControl: FormControl;
  classLevel: ClassLevel = {id: -1, name: '', order: 0, sectionId: -1};
  section: Section;
  classLevelSubs: ClassLevelSub[] = [];

  mandatorySubjects: { subject: Subject, added: boolean }[] = [];
  nonMandatorySubjects: Subject[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sectionService: SectionService,
    private _subjectService: SubjectService,
    private _classLevelService: ClassLevelService,
    private _classLevelSubService: ClassLevelSubService
  ) {
    this.section = {id: -1, name: '', schoolId: -1}
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      classLevels: this.fb.array([])
    });
    this.msFormControl = new FormControl(0, Validators.required);
  }

  get classLevelSubForms(): FormArray {
    return this.classForm.get('classLevels') as FormArray;
  }

  ngOnInit(): void {
    const classId = this.activatedRoute.snapshot.params['id'];
    this.loadClassLevel(classId);
  }

  loadClassLevel(classLevelId: number) {
    this._classLevelService.getById(classLevelId).subscribe({
      next: (classLevel) => {
        this.classLevel = classLevel;
        this.loadSection(classLevel.sectionId);
        this.loadClassLevelSubs(classLevel.id!!);
        this.loadSubjects(classLevel.id!!);
      },
      error: () => this.router.navigate(['/dashboard/class']).then()
    });
  }

  loadClassLevelSubs(classLevelId: number) {
    this._classLevelSubService.getAllByClassLevelId(classLevelId).subscribe((cls) => {
      this.classLevelSubs = cls;
      (this.classForm.get('classLevels') as FormArray).controls = [];
      cls.forEach((classLevelSub) => {
        this.setClassLevelSubForm(classLevelSub.id ?? NO_ENTITY_ID, classLevelSub.name)
      });
    });
  }

  loadSection(sectionId: number) {
    this.sectionService.getById(sectionId).subscribe((section: Section) => this.section = section);
  }

  loadSubjects(classLevelId: number) {
    this._classLevelService.getSubjects(classLevelId).subscribe((mSubjects) => {
      this.mandatorySubjects = mSubjects.map((s): { subject: Subject, added: boolean } => {
        return {subject: s, added: true}
      });

      this._subjectService.getAllBySchoolId(this.schoolId).subscribe(subjects => {
        this.nonMandatorySubjects = [];
        subjects.forEach(nmSubject => this.addToNonMandatorySubjects(nmSubject));
      });
    });
  }

  addToNonMandatorySubjects(subject: Subject) {
    if (!this.mandatorySubjects.find(s => s.subject.id == subject.id)) this.nonMandatorySubjects.push(subject);
  }

  setClassLevelSubForm(id: number, name: string) {
    this.classLevelSubForms.push(this.fb.group({id: [id], name: [name, Validators.required]}))
  }

  saveClassLevel() {
    this.classLevel.name = this.classForm.get('name')?.value;
    this._classLevelService.update(this.classLevel).subscribe(() => {
      this.loadClassLevel(this.classLevel.id ?? NO_ENTITY_ID);
    })
  }

  saveClassLevelSub(formId: number) {
    const clsForm = this.classLevelSubForms.controls[formId];
    const classLevelSub: ClassLevelSub = {
      id: clsForm.get('id')?.value,
      name: clsForm.get('name')?.value,
      classLevelId: this.classLevel.id!!
    }
    if (!classLevelSub.id || classLevelSub.id < 0) {
      this._classLevelSubService.save(classLevelSub).subscribe(
        () => this.loadClassLevelSubs(this.classLevel.id!!)
      );
    } else {
      this._classLevelSubService.update(classLevelSub).subscribe(
        () => this.loadClassLevelSubs(this.classLevel.id!!)
      );
    }
  }

  addMandatorySubjectAction() {
    const subjectId = this.msFormControl.value;
    if (subjectId > 0) {
      const subject = this.nonMandatorySubjects.find(s => s.id == subjectId);
      if (subject) {
        if (!this.mandatorySubjects.find(s => s.subject.id == subject.id)) {
          this.mandatorySubjects = [...this.mandatorySubjects, {subject: subject, added: false}];
        }
      }
    }
  }

  saveMandatorySubjectAction() {
    const id: number = this.classLevel.id!!;
    const subjectIds = this.mandatorySubjects.filter(ms => !ms.added).map(ms => ms.subject.id ?? NO_ENTITY_ID)
    this._classLevelService.updateSubjects(id, subjectIds).subscribe(
      () => this.loadSubjects(id)
    );
  }
}
