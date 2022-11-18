import {BaseModel} from "../base/base.model";

export interface Term {
  id: number;
  name: string;
  schoolId: number;
}

export class Term extends BaseModel {
  constructor(
    public name: string,
    public schoolId: number,
    public sequenceIds?: number[]
  ) {
    super();
  }
}
