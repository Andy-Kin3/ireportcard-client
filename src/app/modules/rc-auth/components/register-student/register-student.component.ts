import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Gender} from "../../../../models/enum/gender.enum";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {DateUtil} from "../../../../utils/date.util";
import {Student, StudentInfo} from "../../../../models/dto/student.model";
import {User, UserModel} from "../../../../models/dto/user.model";
import {Role} from "../../../../models/enum/role.enum";
import {AuthService} from "../../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {
  schoolManagerSmId: string = "";
  studentForm: FormGroup;
  genders: string[] = Object.keys(Gender);
  schools: School[] = [];
  maximumDate: Date;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _schoolService: SchoolService,
    private _authService: AuthService,
  ) {
    const schoolManagerSmId = this._activatedRoute.snapshot.params['smId'];
    if (schoolManagerSmId) {
      this.schoolManagerSmId = schoolManagerSmId
    } else {
      this._router.navigate(['/']).then();
    }
    this.maximumDate = new Date(Date.UTC(new Date().getUTCFullYear() - 1, 0));
    this.studentForm = this.buildStudentForm();
  }

  private buildStudentForm = (): FormGroup => {
    const suggestedDate: Date = new Date(Date.UTC(new Date().getUTCFullYear() - 12, 0, 1));
    return this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [suggestedDate, Validators.required],
      pob: ['', Validators.required],
      school: [0, Validators.required],
      fatherName: [''],
      fatherPhone: [''],
      motherName: [''],
      motherPhone: [''],
      guardianName: [''],
      guardianPhone: [''],
    });
  }

  ngOnInit(): void {
    this.loadSchools(); // TODO restrict student reg to one school
  }

  loadSchools = () => {
    this._schoolService.getAllBySchoolManagerSmId((this.schoolManagerSmId)).subscribe((schools) => {
      this.schools = schools
    });
  }

  registerStudentAction() {
    console.log(this.studentForm.value);

    const user: UserModel = {
      email: this.studentForm.get('email')?.value,
      username: this.studentForm.get('email')?.value,
      firstName: this.studentForm.get('firstname')?.value,
      lastName: this.studentForm.get('lastname')?.value,
      phone: this.studentForm.get('phone')?.value,
      address: this.studentForm.get('address')?.value,
      approved: false,
      role: Role.STUDENT
    }

    const info: StudentInfo = {
      fatherName: this.studentForm.get('fatherName')?.value,
      fatherPhone: this.studentForm.get('fatherPhone')?.value,
      motherName: this.studentForm.get('motherName')?.value,
      motherPhone: this.studentForm.get('motherPhone')?.value,
      guardianName: this.studentForm.get('guardianName')?.value,
      guardianPhone: this.studentForm.get('guardianPhone')?.value,
    };
    const student: Student = {
      id: -1, regNum: '', name: '',
      gender: this.studentForm.get('gender')?.value,
      dob: DateUtil.toString(new Date(this.studentForm.get('dob')?.value)),
      pob: this.studentForm.get('pob')?.value,
      schoolId: this.studentForm.get('school')?.value,
      info: info, user: user
    }
    const password = this.studentForm.get('password')?.value;
    this._authService.registerStudent(student, password).subscribe(() => {
      this._router.navigate(['/auth/login']).then();
    });
  }
}
