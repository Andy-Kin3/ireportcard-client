import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../models/dto/user.model";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../../models/enum/role.enum";
import {Teacher} from "../../../../models/dto/teacher.model";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() schools: School[] = [];
  @Input() role: string = "user";
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private _schoolService: SchoolService
  ) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required], lastName: ["", Validators.required],
      email: ["", Validators.required], school: [0, Validators.required],
      password: ["", Validators.required], rpassword: ["", Validators.required],
      phone: ["", Validators.required], address: [""],
    })
  }

  ngOnInit(): void {
    if (this.role === 'admin') {
      console.log(this.registerForm.get('school')?.validator)
      this.registerForm.get('school')?.clearValidators();

      console.log(this.registerForm.get('school')?.validator)
    }
  }

  registerAction() {
    const password = this.registerForm.get("password")?.value;
    const user: UserModel = {
      id: -1, role: Role.TEACHER, email: this.registerForm.get("email")?.value, username: '',
      firstName: this.registerForm.get("firstName")?.value, lastName: this.registerForm.get("lastName")?.value,
      phone: this.registerForm.get("phone")?.value, address: this.registerForm.get("address")?.value, approved: false
    }


    if (this.role === 'teacher') {
      const teacher: Teacher = {
        id: -1, user: user, schoolId: this.registerForm.get("school")?.value,
      }
      this.authService.registerTeacher(teacher, password).subscribe(() => this.router.navigate(['/admin/teachers']).then())
    } else if (this.role === 'admin') {
      this.authService.registerAdmin(user, password).subscribe(() => this.router.navigate(['/admin/admins']).then());
    }

  }

  isFormValid() {
    return this.registerForm.get('rpassword')?.value == this.registerForm.get('password')?.value && this.registerForm.valid;
  }
}
