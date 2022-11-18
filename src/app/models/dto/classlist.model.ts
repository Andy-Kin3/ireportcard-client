import {Subject} from "./subject.model";
import {ClassLevelSub} from "./class-level-sub.model";
import {Grade} from "./grade.model";
import {Student} from "./student.model";
import {ClassLevel} from "./class-level.model";

export class ClassListRequest {
  constructor(
    public yearId: number,
    public classId: number,
    public subjectId: number,
    public sequenceId: number
  ) {
  }

  isValid = () => {
    return this.yearId > 0 && this.classId > 0 && this.subjectId > 0 && this.sequenceId > 0;
  }
}

export interface ClassListResponse {
  className: string;
  sequenceName: string;
  subject: Subject;
  classLevel: ClassLevel;
  classLevelSub: ClassLevelSub;
  studentGrades: { student: Student, grade: Grade }[];
}
