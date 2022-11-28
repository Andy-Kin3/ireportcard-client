import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: UserModel[] = [];
  selectedRoleId: number = -1;
  roles: { id: number, name: string }[] = [];

  constructor(private _userService: UserService) {
    this.roles = [
      {id: 1, name: 'Admin'},
      {id: 2, name: 'Student'},
      {id: 3, name: 'Teacher'}
    ];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers = () => this._userService.getAll().subscribe(users => this.users = users);

  toggleApprovedAction = (id: number) => this._userService.toggleApproved(id).subscribe();

  onSelectedRoleAction() {
    switch (this.selectedRoleId) {
      case 1:
        this._userService.getAllAdmin().subscribe(users => this.users = users);
        break;
      case 2:
        this._userService.getAllStudent().subscribe(users => this.users = users);
        break;
      case 3:
        this._userService.getAllTeacher().subscribe(users => this.users = users);
        break;
      default:
        this.loadUsers();
    }
  }
}
