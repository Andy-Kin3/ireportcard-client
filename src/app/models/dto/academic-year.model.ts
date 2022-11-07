import {BaseModel} from "../base/base.model";

export interface IAcademicYear {
  id?: number;
  name: string;
  startYear: number;
  endYear?: number;
  academicInfo?: AcademicInfo
}

export class AcademicYear extends BaseModel implements IAcademicYear{
  constructor(
    public name: string,
    public startYear: number,
    public schoolId: number,
    public endYear?: number,
    public academicInfo?: AcademicInfo,
  ) {
    super();
  }
}

export class AcademicInfo {
  constructor(
    public startDate: string,
    public endDate: string,
  ) {
  }
}
