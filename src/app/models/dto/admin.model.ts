import {VersionedModel} from "../base/versioned.model";
import {UserModel} from "./user.model";

export class Admin extends VersionedModel {
  constructor(
    public isSuperAdmin: boolean,
    public schoolManagerId: number,
    public schoolManagerSmId: string,
    public user: UserModel
  ) {
    super(undefined, undefined, undefined);
  }
}
