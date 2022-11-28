import {Component, OnInit} from '@angular/core';
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {Term} from "../../../../models/dto/term.model";
import {Sequence} from "../../../../models/dto/sequence.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {School} from "../../../../models/dto/school.model";
import {SchoolService} from "../../../../services/school.service";
import {UserModel} from "../../../../models/dto/user.model";
import {UserService} from "../../../../services/user.service";
import {Admin} from "../../../../models/dto/admin.model";


@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {
  schoolManagerId: number = 0;
  showSchoolDialog: boolean = false;
  schools: School[] = [];
  admins: UserModel[] = [];
  schoolForm: FormGroup = this._fb.group({});

  terms: Term[] = [];
  years: AcademicYear[] = [];
  sequences: Sequence[] = [];
  academicYears: AcademicYear[] = [];

  constructor(
    private _fb: FormBuilder,
    private msgService: MessageService,
    private _userService: UserService,
    private _schoolService: SchoolService,
  ) {
  }

  ngOnInit(): void {
    this.schoolForm = this._fb.group({
      name: ['', Validators.required],
      maxGrade: [20, Validators.required],
    });
    this.loadSettings();
  }

  loadSettings = () => {
    this._userService.getCompleteFromSession().subscribe((u) => {
      this.schoolManagerId = (u.account as Admin).schoolManagerId
      this._schoolService.getAllBySchoolManagerId(this.schoolManagerId).subscribe(schools => {
        this.schools = schools
      });
    });
    this._userService.getAllAdmin().subscribe(admins => this.admins = admins);
  }

  addNewSchoolAction(submitting: boolean) {
    if (submitting) {
      const school: School = {
        id: -1,
        name: this.schoolForm.get('name')?.value,
        schoolManagerId: this.schoolManagerId,
        applicationOpen: false,
        maxGrade: this.schoolForm.get('maxGrade')?.value
      }
      this._schoolService.save(school).subscribe((res) => {
        this.showSchoolDialog = false;
        this.loadSettings();
      })
    } else {
      this.showSchoolDialog = true;
    }
  }

  deleteSelectedSchoolAction() {

  }
}
