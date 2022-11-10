import {VersionedModel} from "../base/versioned.model";
import {ClassLevelSub} from "./class-level-sub.model";

export interface ClassLevel {
  id?: number;
  name: string;
  order?: number;
  sectionId: number;
  classLevelSubs?: ClassLevelSub[]
}

export class ClassLevel extends VersionedModel{
  constructor(
    public name: string,
    public sectionId: number,
    public order?: number,
    public classLevelSubs?: ClassLevelSub[]
  ) {
    super();
  }
}
