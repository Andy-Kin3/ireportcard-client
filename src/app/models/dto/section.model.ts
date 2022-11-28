import {BaseModel} from "../base/base.model";

export interface ISection {
  id?: number;
  name: string;
  schoolId: number;
}

export class Section extends BaseModel implements ISection {
  constructor(
    public name: string,
    public schoolId: number,
  ) {
    super();
  }
}
