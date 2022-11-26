import {Component, Input, OnInit} from '@angular/core';
import {ATS} from "../../../../app.types";
import {AcademicYearUtil} from "../../../../utils/academic-year.util";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {addToMessageService} from "../../../../utils/message-service.util";
import {Term} from "../../../../models/dto/term.model";
import {Sequence, SequenceType} from "../../../../models/dto/sequence.model";
import {TermService} from "../../../../services/term.service";
import {SequenceService} from "../../../../services/sequence.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {School} from "../../../../models/dto/school.model";
import {EntityUtil} from "../../../../utils/entity.util";

@Component({
  selector: 'app-admin-school-setting',
  templateUrl: './admin-school-setting.component.html',
  styleUrls: ['./admin-school-setting.component.scss']
})
export class AdminSchoolSettingComponent implements OnInit {
  readonly today = new Date();

  @Input() schools: School[] = [];
  selectedSchoolId: number = NO_ENTITY_ID;
  terms: Term[] = [];
  years: AcademicYear[] = [];
  sequences: Sequence[] = [];
  sequencesByTerms: { term: Term, sequence: Sequence }[] = [];
  academicYears: AcademicYear[] = [];
  sequenceTypes: string[] = Object.keys(SequenceType);
  sequenceForm: FormGroup = this._fb.group({});
  academicYearForm: FormGroup = this._fb.group({});

  constructor(
    private _fb: FormBuilder,
    private _msgService: MessageService,
    private _termService: TermService,
    private _sequenceService: SequenceService,
    private _academicYearService: AcademicYearService
  ) {
  }

  ngOnInit(): void {
    this.academicYearForm = this._fb.group({
      startYear: [this.today.getFullYear(), [Validators.required, Validators.max(this.today.getFullYear())]],
      endYear: [{value: this.today.getFullYear() + 1, disabled: true}, Validators.required],
    });
    this.sequenceForm = this._fb.group({
      name: ['', Validators.required], term: [0, Validators.required], type: [SequenceType.OPENING, Validators.required]
    });
  }

  loadSettings() {
    if (EntityUtil.isValidId(this.selectedSchoolId)) {
      this._sequenceService.getAllBySchoolId(this.selectedSchoolId).subscribe((sequences) => {
        this.sequences = sequences
      });
      this._termService.getAllBySchoolId(this.selectedSchoolId).subscribe((terms) => {
        this.sequencesByTerms = [];
        this.terms = terms;
        this.terms.forEach(term => this._sequenceService.getByTermId(term.id).subscribe((sequences) => {
          sequences.forEach(s => this.sequencesByTerms.push({term: term, sequence: s}))
        }))
      });
      this._academicYearService.getAllBySchool(this.selectedSchoolId).subscribe((years) => {
        this.academicYears = years
      });
    }
  }

  editYTSAction(atsOrdinal: ATSName, entity: ATS, inputElement: HTMLInputElement) {
    if (inputElement.disabled && inputElement.value) {
      entity.name = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {
        if (AcademicYearUtil.isValid(entity.name)) {
          this._academicYearService.update(entity as AcademicYear).subscribe(() => this.loadSettings());
        } else {
          addToMessageService(this._msgService, 'warn', 'Invalid Year', `The value '${entity.name}' is not valid!`);
        }
      } else if (atsOrdinal == ATSName.TERM) {
        this._termService.update(entity as Term).subscribe(() => this.loadSettings());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        console.log(entity)
        this._sequenceService.update(entity as Sequence).subscribe(() => this.loadSettings());
      }
    }
  }

  saveYearAction(academicYear?: AcademicYear) {
    if (EntityUtil.isValidId(this.selectedSchoolId)) {
      if (!academicYear) {
        const year: AcademicYear = {
          name: '',
          startYear: this.academicYearForm.get('startYear')?.value,
          schoolId: this.selectedSchoolId
        }
        year.endYear = year.startYear + 1;
        this._academicYearService.save(year).subscribe(() => this.loadSettings());
      } else {
        academicYear.endYear = academicYear.startYear + 1;
        this._academicYearService.update(academicYear).subscribe();
      }
    }
  }

  addYTSAction(atsOrdinal: ATSName, inputElement: HTMLInputElement) {
    if (inputElement.hidden && inputElement.value !== '') {
      const elValue = inputElement.value;
      if (atsOrdinal == ATSName.YEAR) {

      } else if (atsOrdinal == ATSName.TERM) {
        const term: Term = {id: -1, name: elValue, schoolId: this.selectedSchoolId};
        this._termService.save(term).subscribe(() => this.loadSettings());
      } else if (atsOrdinal == ATSName.SEQUENCE) {
        const sequence: Sequence = {
          id: -1, termId: this.sequenceForm.get('term')?.value, type: this.sequenceForm.get('type')?.value,
          name: this.sequenceForm.get('name')?.value
        }
        this._sequenceService.save(sequence).subscribe(() => this.loadSettings());
      }
    }
  }


  deleteATSAction(number: number, ats: ATS) {

  }
}

enum ATSName {YEAR, TERM, SEQUENCE,}
