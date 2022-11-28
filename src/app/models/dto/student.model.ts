import {Gender} from "../enum/gender.enum";
import {UserModel} from "./user.model";
import {BaseModel} from "../base/base.model";

export class Student extends BaseModel {
  constructor(
    public name: string,
    public regNum: string,
    public gender: Gender,
    public dob: string,
    public pob: string,
    public schoolId: number,
    public info: StudentInfo,
    public user: UserModel
  ) {
    super();
    this.name = `${this.user.firstName} ${this.user.lastName}`
  }
}

export class StudentInfo {
  constructor(
    public fatherName: string,
    public fatherPhone: string,
    public motherName: string,
    public motherPhone: string,
    public guardianName: string,
    public guardianPhone: string,
  ) {
  }
}
