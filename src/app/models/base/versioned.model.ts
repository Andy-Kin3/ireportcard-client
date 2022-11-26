import {BaseModel} from "./base.model";

export class VersionedModel extends BaseModel {
  constructor(
    public createdAt?: string,
    public updatedAt?: string,
    public deletedAt?: string,
  ) {
    super();
  }
}
