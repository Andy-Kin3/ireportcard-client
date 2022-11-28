import {Component, OnInit} from '@angular/core';
import {Student} from "../../../../models/dto/student.model";
import {StudentService} from "../../../../services/student.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {StudentServiceStrategy} from "../../../../services/strategy/service.strategy";

@Component({
  selector: 'app-rc-students',
  templateUrl: './rc-students.component.html',
  styleUrls: ['./rc-students.component.scss']
})
export class RcStudentsComponent implements OnInit {
  schoolId: number = LocalStorageUtil.readSchoolId() ?? NO_ENTITY_ID;
  students: Student[] = [];

  constructor(
    private modalService: NgbModal,
    private _studentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this._studentService.loadStudents(
      this.students, StudentServiceStrategy.BY_SCHOOL,
      {schoolId: this.schoolId},
      [(students: Student[]) => this.students = students]
    );
  }

  deleteStudentAction(student: Student) {
    const confirmDelete = confirm(`Are you sure you want to delete account of: ${student.user.firstName}`);
    if (confirmDelete) {
      this._studentService.delete(student.id!!).subscribe({next: () => this.loadStudents()});
    }
  }
}
