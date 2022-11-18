import {VersionedModel} from "../base/versioned.model";

export interface ClassLevelSub {
  id?: number;
  name: string;
  classLevelId: number;
  numberOfStudents?: number;
}

export class ClassLevelSub extends VersionedModel {
  constructor(
    public name: string,
    public classLevelId: number,
    public numberOfStudents?: number
  ) {
    super();
  }
}
