import {TeacherPosition} from "../enum/teacher-position.enum";

export class SubjectTeacher {
  constructor(
    public key: SubjectTeacherKey,
    public position: TeacherPosition
  ) {
  }
}

export class SubjectTeacherKey {
  constructor(
    public subjectId: number,
    public teacherId: number
  ) {
  }
}

