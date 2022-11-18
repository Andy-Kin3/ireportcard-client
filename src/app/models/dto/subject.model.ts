import {BaseModel} from "../base/base.model";

export interface Subject {
  id?: number;
  name: string;
  code: string;
  coefficient: number;
  departmentId: number;
}

export class Subject extends BaseModel {
  constructor(
    public name: string,
    public code: string,
    public coefficient: number,
    public departmentId: number,
  ) {
    super();
  }
}
