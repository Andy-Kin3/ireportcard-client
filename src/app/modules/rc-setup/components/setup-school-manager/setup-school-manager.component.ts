import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../models/dto/user.model";
import {SchoolManager, SchoolManagerSetup} from "../../../../models/dto/school-manager.model";
import {SchoolManagerService} from "../../../../services/school-manager.service";

@Component({
  selector: 'app-setup-school-manager',
  templateUrl: './setup-school-manager.component.html',
  styleUrls: ['./setup-school-manager.component.scss']
})
export class SetupSchoolManagerComponent implements OnInit {
  schoolManagerForm: FormGroup = this._fb.group({});

  constructor(
    private _fb: FormBuilder,
    private _schoolManagerService: SchoolManagerService
  ) {
    this.schoolManagerForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rpassword: ['', Validators.required],
      phone: ['', Validators.required],
      address: [],
      manager: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  setupSchoolManagerAction() {
    // TODO validate repeat password
    const creator: UserModel = {
      firstName: this.schoolManagerForm.get('firstName')?.value,
      lastName: this.schoolManagerForm.get('lastName')?.value,
      email: this.schoolManagerForm.get('email')?.value,
      username: this.schoolManagerForm.get('email')?.value,
      phone: this.schoolManagerForm.get('phone')?.value,
      address: this.schoolManagerForm.get('address')?.value,
    }
    const schoolManager: SchoolManager = {
      name: this.schoolManagerForm.get('manager')?.value,
      managerId: -1,
    }
    const request: SchoolManagerSetup = {
      creator: creator,
      schoolManager: schoolManager,
      password: this.schoolManagerForm.get('password')?.value,
    }

    this._schoolManagerService.setup(request).subscribe((response) => {
      console.log(response)
    });
  }
}
