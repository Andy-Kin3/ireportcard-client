import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../models/dto/subject.model";
import {SubjectService} from "../../../../services/subject.service";
import {MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {SubjectServiceStrategy} from "../../../../services/strategy/service.strategy";

@Component({
  selector: 'app-rc-subjects',
  templateUrl: './rc-subjects.component.html',
  styleUrls: ['./rc-subjects.component.scss']
})
export class RcSubjectsComponent implements OnInit {
  schoolId: number = LocalStorageUtil.readSchoolId() ?? NO_ENTITY_ID;
  subjects: Subject[] = [];

  constructor(private _subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.subjects = []

    this.loadSubjects();
  }


  loadSubjects(): void {
    this._subjectService.loadSubjects(
      this.subjects, SubjectServiceStrategy.BY_SCHOOL, {schoolId: this.schoolId},
      [
        (subjects: Subject[]) => this.subjects = subjects
      ]
    );
  }

  deleteSubjectAction(subject: Subject) {
    const confirmDelete: boolean = confirm("Are you sure want to delete " + subject.name);
    if (confirmDelete) {
      this._subjectService.delete(subject.id!!).subscribe(() => this.loadSubjects());
    }
  }
}
