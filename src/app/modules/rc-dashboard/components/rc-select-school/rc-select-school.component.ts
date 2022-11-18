import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {School} from "../../../../models/dto/school.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";

@Component({
  selector: 'rc-app-select-school',
  templateUrl: './rc-select-school.component.html',
  styleUrls: ['./rc-select-school.component.scss']
})
export class RcSelectSchoolComponent implements OnInit, OnChanges {

  schoolId: number = -1;
  @Input() schools: School[] = [];
  @Output() onSchoolSelect = new EventEmitter<boolean>(true);

  constructor() {
  }

  ngOnInit(): void {
    const sid = LocalStorageUtil.readSchoolId();
    if (sid) {
      this.schoolId = sid;
      this.onSchoolSelect.emit(false);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.schools.length == 1) {
      this.schoolId = this.schools[0].id!!;
      this.setSchoolAction();
    }
  }

  setSchoolAction() {
    if (this.schoolId > 0) {
      LocalStorageUtil.writeSchoolId(this.schoolId);
      this.onSchoolSelect.emit(false);
    } else {
      alert("Select a school to continue");
    }
  }
}
