import {TeacherPosition} from "../enum/teacher-position.enum";

export class ClassLevelTeacher {
  constructor(
    public key: ClassLevelTeacherKey,
    public position: TeacherPosition
  ) {
  }
}

export class ClassLevelTeacherKey {
  constructor(
    public classLevelSubId: number,
    public teacherId: number,
  ) {
  }
}
