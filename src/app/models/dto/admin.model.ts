import {VersionedModel} from "../base/versioned.model";
import {User} from "./user.model";

export class Admin extends VersionedModel{
  constructor(
    public isSuperAdmin: boolean,
    public schoolManagerId: number,
    public user: User
  ) {
    super(undefined, undefined, undefined);
  }
}
