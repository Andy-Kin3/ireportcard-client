import {BaseModel} from "../base/base.model";

export class Department extends BaseModel {
  constructor(
    public name: string,
    public schoolId: number,
    public hodId?: number,
  ) {
    super();
  }
}
