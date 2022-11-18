import {VersionedModel} from "../base/versioned.model";

export interface Sequence {
  id: number;
  name: string;
  termId: number;
  type?: SequenceType;
}

export class Sequence extends VersionedModel {
  constructor(
    public name: string,
    public termId: number,
    public type?: SequenceType,
  ) {
    super();
  }
}

export enum SequenceType {
  OPENING = "OPENING",
  MID = "MID",
  CLOSING = "CLOSING"
}
