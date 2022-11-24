interface BaseParams {
  id?: number,
}
export interface SchoolBaseParams extends BaseParams {
  schoolId?: number,
  schoolManagerId?: number,
  schoolManagerSmId?: string,
}

export interface AcademicYearServiceStrategyParams extends SchoolBaseParams {}

export interface StudentServiceStrategyParams extends SchoolBaseParams {}

export interface SubjectServiceStrategyParams extends SchoolBaseParams {
  departmentId?: number;
}

export interface TeacherServiceStrategyParams  extends SchoolBaseParams{}


