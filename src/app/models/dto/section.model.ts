import {BaseModel} from "../base/base.model";

export interface Section {
  id: number;
  name: string;
  schoolId: number;
}

export class Section extends BaseModel {
  constructor(
    public name: string,
    public schoolId: number,
  ) {
    super();
  }
}
