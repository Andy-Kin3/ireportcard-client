import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../../../models/dto/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user?: UserModel;
  @Output() onUserSaved = new EventEmitter<boolean>();
  userForm: FormGroup = this._fb.group({});

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
  }

  ngOnInit(): void {
    if (this.user) this.setupAdminForm(this.user);
  }

  setupAdminForm = (user: UserModel) => {
    this.userForm = this._fb.group({
      email: [user.email, Validators.required],
      username: [{value: user.username, disabled: true}, Validators.required],
      firstname: [user.firstName, Validators.required],
      lastname: [user.lastName, Validators.required],
      phone: [user.phone, Validators.required],
      address: [user.address, Validators.required],
    });
  }

  saveUserAction() {
    if (this.user) {
      const user: UserModel = {
        id: this.user.id, email: this.userForm.get('email')?.value, username: this.user.username,
        firstName: this.userForm.get('firstname')?.value, lastName: this.userForm.get('lastname')?.value,
        phone: this.userForm.get('phone')?.value, address: this.userForm.get('address')?.value,
        role: this.user.role, approved: true
      };
      this._userService.update(user).subscribe(() => this.onUserSaved.emit(true));
    }
  }

}
