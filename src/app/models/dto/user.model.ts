import {Role} from "../enum/role.enum";
import {Teacher} from "./teacher.model";
import {Student} from "./student.model";
import {BaseModel} from "../base/base.model";

export class User extends BaseModel{
  constructor(
    public email: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public phone: string,
    public address: string,
    public approved: boolean,
    public role: Role
  ) {
    super();
  }
}

export class UserComplete {
  constructor(
    public user: User,
    public account: Student | Teacher | null
  ) {
  }
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserAuth {
  sessionId: string;
  message: string;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterResponse {
  id: number;
  username: string;
  message: string;
}

export interface UserChangePassword {
  username: string,
  oldPassword: string,
  newPassword: string,
}
