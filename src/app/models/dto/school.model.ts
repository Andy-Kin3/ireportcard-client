import {VersionedModel} from "../base/versioned.model";

export interface School {
  id?: number,
  name: string,
  maxGrade: number,
  applicationOpen: boolean,
  schoolManagerId: number,
  currentYearId?: number,
  currentTerm?: string,
  currentSequenceId?: number,
}

export class School extends VersionedModel{
  constructor(
    public name: string,
    public maxGrade: number,
    public applicationOpen: boolean,
    public schoolManagerId: number,
    public currentYearId?: number,
    public currentTerm?: string,
    public currentSequenceId?: number,
  ) {
    super();
  }
}
