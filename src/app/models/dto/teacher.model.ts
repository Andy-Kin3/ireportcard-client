import {UserModel} from "./user.model";
import {VersionedModel} from "../base/versioned.model";

export class Teacher extends VersionedModel {
  constructor(
    public schoolId: number,
    public user: UserModel
  ) {
    super();
  }
}
