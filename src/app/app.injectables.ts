import {SchoolService} from "./services/school.service";
import {
  RC_ACADEMIC_YEAR_API_URL,
  RC_AUTH_API_URL,
  RC_AUTH_TEST_API_URL,
  RC_CLASS_LEVEL_API_URL,
  RC_CLASS_LEVEL_SUB_API_URL,
  RC_CLASS_LIST_API_URL,
  RC_DEFAULT_API_URL,
  RC_GRADE_API_URL, RC_PAYMENT_SETTING_API_URL,
  RC_REPORT_CARD_API_URL,
  RC_SCHOOL_API_URL,
  RC_SECTION_API_URL,
  RC_SEQUENCE_API_URL,
  RC_SETTINGS_API_URL,
  RC_STUDENT_API_URL,
  RC_STUDENT_APPLICATION_API_URL,
  RC_STUDENT_CLASS_LEVEL_API_URL,
  RC_SUBJECT_API_URL,
  RC_SUBJECT_REGISTRATION_API_URL,
  RC_SUBJECT_TEACHER_API_URL,
  RC_TEACHER_API_URL,
  RC_TERM_API_URL,
  RC_USER_API_URL
} from "./app.constants";
import {StudentService} from "./services/student.service";
import {ClassLevelService} from "./services/class-level.service";
import {SectionService} from "./services/section.service";
import {SubjectService} from "./services/subject.service";
import {ClassLevelSubService} from "./services/class-level-sub.service";
import {AcademicYearService} from "./services/academic-year.service";
import {SequenceService} from "./services/sequence.service";
import {ClassListService} from "./services/class-list.service";
import {GradeService} from "./services/grade.service";
import {SubjectRegistrationService} from "./services/subject-registration.service";
import {SchoolSettingsService} from "./services/school-settings.service";
import {TermService} from "./services/term.service";
import {ReportCardService} from "./services/report-card.service";
import {StudentApplicationService} from "./services/student-application.service";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {TeacherService} from "./services/teacher.service";
import {SubjectTeacherService} from "./services/subject-teacher.service";
import {StudentClassLevelService} from "./services/student-class-level.service";
import {PaymentSettingService} from "./services/payment-setting.service";

const academicYearInjectables: Array<any> = [
  {provide: AcademicYearService, useClass: AcademicYearService},
  {provide: RC_ACADEMIC_YEAR_API_URL, useValue: RC_ACADEMIC_YEAR_API_URL},
];
const authInjectables: Array<any> = [
  {provide: AuthService, useClass: AuthService},
  {provide: RC_AUTH_API_URL, useValue: RC_AUTH_API_URL},
];
const classLevelInjectables: Array<any> = [
  {provide: ClassLevelService, useClass: ClassLevelService},
  {provide: RC_CLASS_LEVEL_API_URL, useValue: RC_CLASS_LEVEL_API_URL}
];
const classLevelSubInjectables: Array<any> = [
  {provide: ClassLevelSubService, useClass: ClassLevelSubService},
  {provide: RC_CLASS_LEVEL_SUB_API_URL, useValue: RC_CLASS_LEVEL_SUB_API_URL}
];
const classListInjectables: Array<any> = [
  {provide: ClassListService, useClass: ClassListService},
  {provide: RC_CLASS_LIST_API_URL, useValue: RC_CLASS_LIST_API_URL}
];
const gradeInjectables: Array<any> = [
  {provide: GradeService, useClass: GradeService},
  {provide: RC_GRADE_API_URL, useValue: RC_GRADE_API_URL}
];
const paymentSettingInjectables: Array<any> = [
  {provide: PaymentSettingService, useClass: PaymentSettingService},
  {provide: RC_PAYMENT_SETTING_API_URL, useValue: RC_PAYMENT_SETTING_API_URL}
];
const reportCardInjectables: Array<any> = [
  {provide: ReportCardService, useClass: ReportCardService},
  {provide: RC_REPORT_CARD_API_URL, useValue: RC_REPORT_CARD_API_URL},
  {provide: RC_DEFAULT_API_URL, useValue: RC_DEFAULT_API_URL},
  {provide: RC_AUTH_TEST_API_URL, useValue: RC_AUTH_TEST_API_URL},
];
const schoolInjectables: Array<any> = [
  {provide: SchoolService, useClass: SchoolService},
  {provide: RC_SCHOOL_API_URL, useValue: RC_SCHOOL_API_URL}
];
const schoolSettingsInjectables: Array<any> = [
  {provide: SchoolSettingsService, useClass: SchoolSettingsService},
  {provide: RC_SETTINGS_API_URL, useValue: RC_SETTINGS_API_URL}
];
const sectionInjectables: Array<any> = [
  {provide: SectionService, useClass: SectionService},
  {provide: RC_SECTION_API_URL, useValue: RC_SECTION_API_URL}
];
const sequenceInjectables: Array<any> = [
  {provide: SequenceService, useClass: SequenceService},
  {provide: RC_SEQUENCE_API_URL, useValue: RC_SEQUENCE_API_URL}
];
const studentInjectables: Array<any> = [
  {provide: StudentService, useClass: StudentService},
  {provide: RC_STUDENT_API_URL, useValue: RC_STUDENT_API_URL}
];
const studentApplicationInjectables: Array<any> = [
  {provide: StudentApplicationService, useClass: StudentApplicationService},
  {provide: RC_STUDENT_APPLICATION_API_URL, useValue: RC_STUDENT_APPLICATION_API_URL},
];
const studentClassLevelInjectables: Array<any> = [
  {provide: StudentClassLevelService, useClass: StudentClassLevelService},
  {provide: RC_STUDENT_CLASS_LEVEL_API_URL, useValue: RC_STUDENT_CLASS_LEVEL_API_URL},
];
const subjectInjectables: Array<any> = [
  {provide: SubjectService, useClass: SubjectService},
  {provide: RC_SUBJECT_API_URL, useValue: RC_SUBJECT_API_URL}
];
const subjectRegistrationInjectables: Array<any> = [
  {provide: SubjectRegistrationService, useClass: SubjectRegistrationService},
  {provide: RC_SUBJECT_REGISTRATION_API_URL, useValue: RC_SUBJECT_REGISTRATION_API_URL}
];
const subjectTeacherInjectables: Array<any> = [
  {provide: SubjectTeacherService, useClass: SubjectTeacherService},
  {provide: RC_SUBJECT_TEACHER_API_URL, useValue: RC_SUBJECT_TEACHER_API_URL}
];
const teacherInjectables: Array<any> = [
  {provide: TeacherService, useClass: TeacherService},
  {provide: RC_TEACHER_API_URL, useValue: RC_TEACHER_API_URL}
];
const termInjectables: Array<any> = [
  {provide: TermService, useClass: TermService},
  {provide: RC_TERM_API_URL, useValue: RC_TERM_API_URL}
];
const userInjectables: Array<any> = [
  {provide: UserService, useClass: UserService},
  {provide: RC_USER_API_URL, useValue: RC_USER_API_URL}
];

export const injectables = [
  academicYearInjectables,
  authInjectables,
  classLevelInjectables,
  classLevelSubInjectables,
  classListInjectables,
  gradeInjectables,
  paymentSettingInjectables,
  reportCardInjectables,
  schoolInjectables,
  sectionInjectables,
  sequenceInjectables,
  schoolSettingsInjectables,
  studentInjectables,
  studentApplicationInjectables,
  studentClassLevelInjectables,
  subjectInjectables,
  subjectRegistrationInjectables,
  subjectTeacherInjectables,
  termInjectables,
  teacherInjectables,
  userInjectables
];
