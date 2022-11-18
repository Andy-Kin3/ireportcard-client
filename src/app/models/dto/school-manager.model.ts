import {BaseModel} from "../base/base.model";
import {User} from "./user.model";

export class SchoolManager extends BaseModel{
  constructor(
    public managerId: number,
    public name: string,
  ) {
    super();
  }
}

export class SchoolManagerSetup {
  constructor(
    public creator: User,
    public password: string,
    public schoolManager: SchoolManager
  ) {
  }
}
