import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Teacher} from "../../../../../models/dto/teacher.model";
import {TeacherService} from "../../../../../services/teacher.service";
import {SubjectTeacherService} from "../../../../../services/subject-teacher.service";
import {Subject} from "../../../../../models/dto/subject.model";
import {SubjectService} from "../../../../../services/subject.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubjectTeacher, SubjectTeacherKey} from "../../../../../models/dto/subject-teacher.model";
import {TeacherPosition} from "../../../../../models/enum/teacher-position.enum";

@Component({
  selector: 'app-admin-view-teacher',
  templateUrl: './admin-view-teacher.component.html',
  styleUrls: ['./admin-view-teacher.component.scss']
})
export class AdminViewTeacherComponent implements OnInit {

  teacherId?: number;
  showSubjectDialog: boolean = false;
  teacher?: Teacher;
  subjects: Subject[] = [];
  assignedSubjects: Subject[] = [];
  unassignedSubjects: Subject[] = [];
  assignSubjectForm: FormGroup = this._fb.group({});

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _teacherService: TeacherService,
    private _subjectService: SubjectService,
    private _subjectTeacherService: SubjectTeacherService,
  ) {
  }

  ngOnInit(): void {
    this.teacherId = this._activatedRoute.snapshot.params['id'];
    if (this.teacherId) {
      this.loadTeacher(this.teacherId);
      this.loadAssignedSubjects(this.teacherId);
    }

    this._subjectService.getAll().subscribe(subjects => this.subjects = subjects);
    this.assignSubjectForm = this._fb.group({subject: [0, [Validators.required, Validators.min(0)]]})
  }

  loadTeacher = (id: number) => {
    if (id > 0) this._teacherService.getById(id).subscribe(teacher => this.teacher = teacher);
  }

  loadAssignedSubjects(teacherId: number) {
    this.assignedSubjects = [];
    this._subjectTeacherService.getAllByTeacher(teacherId).subscribe((sts) => sts.forEach(st => {
      this._subjectService.getById(st.key.subjectId).subscribe(subject => this.assignedSubjects.push(subject));
    }));
  }

  loadUnassignedSubjects() {
    this.showSubjectDialog = true
    this.unassignedSubjects = this.subjects.filter(s => !this.assignedSubjects.find((aS) => aS.id == s.id));
  }

  assignSubjectAction() {
    if (this.teacher) {
      const subjectId = this.assignSubjectForm.get('subject')?.value;
      console.log(subjectId)
      const subjectTeacher = new SubjectTeacher(
        new SubjectTeacherKey(subjectId, this.teacher.id ?? 0),
        TeacherPosition.STAFF
      );
      this._subjectTeacherService.create(subjectTeacher).subscribe(() => {
        this.loadAssignedSubjects(subjectTeacher.key.teacherId);
        this.showSubjectDialog = false;
      });
    }
  }

  closeDialogAction() {
    console.log("qsd")
  }
}
