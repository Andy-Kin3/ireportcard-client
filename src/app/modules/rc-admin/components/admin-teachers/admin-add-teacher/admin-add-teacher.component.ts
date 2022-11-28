import {Component, OnInit} from '@angular/core';
import {SchoolService} from "../../../../../services/school.service";
import {School} from "../../../../../models/dto/school.model";
import {UserService} from "../../../../../services/user.service";
import {Admin} from "../../../../../models/dto/admin.model";

@Component({
  selector: 'app-admin-add-teacher',
  templateUrl: './admin-add-teacher.component.html',
  styleUrls: ['./admin-add-teacher.component.scss']
})
export class AdminAddTeacherComponent implements OnInit {
  schools: School[] = [];

  constructor(
    private _userService: UserService,
    private _schoolService: SchoolService,
  ) {
  }

  ngOnInit(): void {
    this._userService.getCompleteFromSession().subscribe((u) => {
      this._schoolService.getAllBySchoolManagerId((u.account as Admin).schoolManagerId).subscribe((schools) => {
        this.schools = schools
      });
    });
  }
}
