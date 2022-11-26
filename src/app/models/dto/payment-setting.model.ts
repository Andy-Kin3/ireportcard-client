import {BaseModel} from "../base/base.model";

export class PaymentSetting extends BaseModel {
  constructor(
    public tuitionFee: number,
    public applicationFee: number,
    public schoolId: number,
  ) {
    super();
  }
}
