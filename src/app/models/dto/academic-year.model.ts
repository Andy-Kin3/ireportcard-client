export interface AcademicYear {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  academicInfo: AcademicInfo
}

export class AcademicInfo {
  constructor(
    public startDate: string,
    public endDate: string,
  ) {
  }
}
