import {Student} from "./student.model";
import {ClassLevelSub} from "./class-level-sub.model";
import {ClassLevel} from "./class-level.model";

export interface StudentApplicationKey {
  studentId: number;
  classSubId: number;
}

export interface StudentApplication {
  key: StudentApplicationKey;
  student: Student;
  classLevel: ClassLevel,
  classLevelSub: ClassLevelSub;
  studentApplicationTrials: StudentApplicationTrial[];
}

export interface StudentApplicationTrial {
  id: number;
  order: number;
  repeating: boolean;
  numberOfSubjects?: number;
  createdAt: string;
  updatedAt?: string;
  applicationKey: StudentApplicationKey;
  academicYearId: number;
}

export interface ApplicationRequest {
  classSubId: number;
  academicYearId: number;
  studentId: number;
}

export interface ApplicationsRequest {
  classSubId: number;
  yearId: number;
}

export interface ApplicationResponse {
  className: string;
  student: Student;
  application: StudentApplication;
  applicationTrials: StudentApplicationTrial[];
}
