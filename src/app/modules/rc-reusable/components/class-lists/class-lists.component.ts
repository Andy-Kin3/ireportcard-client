import {Component, Input, OnInit} from '@angular/core';
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Subject} from "../../../../models/dto/subject.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {Grade} from "../../../../models/dto/grade.model";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassListService} from "../../../../services/class-list.service";
import {GradeService} from "../../../../services/grade.service";
import {MessageService} from "primeng/api";
import {ClassListRequest, ClassListResponse} from "../../../../models/dto/classlist.model";
import {Teacher} from "../../../../models/dto/teacher.model";
import {StudentClassLevel} from "../../../../app.types";

@Component({
  selector: 'app-class-lists',
  templateUrl: './class-lists.component.html',
  styleUrls: ['./class-lists.component.scss']
})
export class ClassListsComponent implements OnInit {

  classListRequest: ClassListRequest;
  classListResponse?: ClassListResponse;

  @Input() teacher?: Teacher;
  @Input() classes: StudentClassLevel[] = [];
  @Input() academicYears: AcademicYear[] = [];
  @Input() subjects: Subject[] = [];
  @Input() sequences: Sequence[] = [];

  constructor(
    private classListService: ClassListService,
    private gradeService: GradeService,
    private msg: MessageService
  ) {
    this.classListRequest = new ClassListRequest(-1, -1, -1, -1);
  }

  ngOnInit(): void {
  }

  loadGrades() {
    if (this.classListRequest.isValid()) {
      this.classListService.get(this.classListRequest).subscribe({
        next: (classList) => this.classListResponse = classList
      });
    }
  }

  saveGrade(grade: Grade, gradeInput: HTMLInputElement) {
    if (this.teacher) {
      grade.graderId = this.teacher.id!!;
      const newScore = this.getGradeInputValue(gradeInput);
      if (newScore >= 0 && newScore <= 20) {
        if (grade.score) {
          grade.score = newScore;
          this.gradeService.update(grade).subscribe({
            next: (res) => {
              addToMessageService(this.msg, 'success', 'Update grade successfully', res.message)
              this.loadGrades();
            },
            error: (err) => addToMessageService(this.msg, 'error', 'Update grade failed', err.message)
          });
        } else {
          console.log("setting new grade")
          grade.score = newScore
          this.gradeService.save(grade).subscribe({
            next: (res) => {
              addToMessageService(this.msg, 'success', 'Add grade successfully', res.message)
              this.loadGrades();
            },
            error: (err) => addToMessageService(this.msg, 'error', 'Add grade failed', err.message)
          });
        }
      } else {
        alert(`Cannot add this grade because it falls out of the range [0-20]: ${newScore}`);
      }
    }
  }

  getGradeInputValue(gradeInput: HTMLInputElement): number {
    return parseFloat(gradeInput.value);
  }

  gradeInputValid(grade: Grade, gradeInput: HTMLInputElement) {
    const gradeInputValue = this.getGradeInputValue(gradeInput);
    return (gradeInputValue >= 0 && gradeInputValue <= 20) && (grade.score !== gradeInputValue);
  }


}
