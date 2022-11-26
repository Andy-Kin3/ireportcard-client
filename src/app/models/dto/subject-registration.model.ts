import {VersionedModel} from "../base/versioned.model";

export interface SubjectRegistration {
  id?: number;
  satId: number;
  subjectId: number;
  createdAt?: string;
  updatedAt?: string;
}

export class SubjectRegistration extends VersionedModel {
  constructor(
    satId: number,
    subjectId: number,
  ) {
    super();
  }
}
