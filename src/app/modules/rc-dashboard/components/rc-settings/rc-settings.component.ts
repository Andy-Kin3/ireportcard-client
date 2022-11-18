import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {Sequence} from "../../../../models/dto/sequence.model";
import {SequenceService} from "../../../../services/sequence.service";
import {TermService} from "../../../../services/term.service";
import {AcademicYearService} from "../../../../services/academic-year.service";
import {Term} from "../../../../models/dto/term.model";
import {AcademicYear} from "../../../../models/dto/academic-year.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportCardService} from "../../../../services/report-card.service";
import {SchoolService} from "../../../../services/school.service";
import {School} from "../../../../models/dto/school.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Section} from "../../../../models/dto/section.model";
import {SectionService} from "../../../../services/section.service";
import {PaymentSetting} from "../../../../models/dto/payment-setting.model";
import {PaymentSettingService} from "../../../../services/payment-setting.service";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";
import {EntityUtil} from "../../../../utils/message.util";
import {AcademicYearServiceStrategy} from "../../../../services/strategy/service.strategy";

@Component({
  selector: 'app-rc-settings',
  templateUrl: './rc-settings.component.html',
  styleUrls: ['./rc-settings.component.scss']
})
export class RcSettingsComponent implements OnInit {

  schoolId: number = LocalStorageUtil.readSchoolId() ?? NO_ENTITY_ID;
  settingsForm: FormGroup = this.fb.group({});
  paymentSettingsForm: FormGroup = this.fb.group({});
  school?: School;
  sequences: Sequence[] = [];

  terms: Term[] = [];
  sequencesByTerms: { term: Term, sequences: Sequence[] }[] = [];
  academicYears: AcademicYear[] = [];

  constructor(
    private fb: FormBuilder,
    private msgService: MessageService,
    private defaultService: ReportCardService,
    private schoolService: SchoolService,
    private sectionService: SectionService,
    private sequenceService: SequenceService,
    private termService: TermService,
    private _academicYearService: AcademicYearService,
    private _paymentSettingService: PaymentSettingService,
  ) {
  }

  ngOnInit(): void {
    this.loadSchool();
    this.loadSettingsInfo();

    this.settingsForm = this.fb.group({
      applicationsOpen: [this.school ? this.school.applicationOpen : false, Validators.required],
      name: [this.school ? this.school.name : '', Validators.required],
      year: [this.school ? (this.school.currentYearId ? this.school.currentYearId : -1) : -1, Validators.required],
      term: [this.school ? (this.school.currentTerm ? this.school.currentTerm : 'None') : 'None'],
      sequence: [this.school ? (this.school.currentSequenceId ? this.school.currentSequenceId : -1) : -1, Validators.required],
      maxGrade: [this.school ? this.school.maxGrade : -1, Validators.compose([Validators.min(0), Validators.max(100)])]
    });
    this.paymentSettingsForm = this.fb.group({
      tuitionFee: [0, [Validators.required, Validators.min(0)]],
      applicationFee: [0, [Validators.required, Validators.min(0)]],
    });
  }

  patchSettingsForm = (school: School) => {
    this.settingsForm.patchValue({maxGrade: school.maxGrade});
    this.settingsForm.patchValue({name: school.name});
    if (school.currentSequenceId) this.settingsForm.patchValue({sequence: school.currentSequenceId});
    if (school.currentTerm) this.settingsForm.patchValue({term: school.currentTerm});
    if (school.currentYearId) this.settingsForm.patchValue({year: school.currentYearId});
  }

  patchPaymentSettingsForm = (paymentSetting: PaymentSetting) => {
    this.paymentSettingsForm.patchValue({tuitionFee: paymentSetting.tuitionFee});
    this.paymentSettingsForm.patchValue({applicationFee: paymentSetting.applicationFee});
  }

  loadSchool(): void {
    if (EntityUtil.isValidId(this.schoolId)) {
      this.schoolService.getById(this.schoolId).subscribe((school) => {
        this.school = school;
        this.patchSettingsForm(school);
      });
      this._paymentSettingService.getBySchoolId(this.schoolId).subscribe((paymentSetting) => {
        if (paymentSetting) this.patchPaymentSettingsForm(paymentSetting);
      });
    }
  }

  loadSettingsInfo(): void {
    this.sequenceService.getAllBySchoolId(this.schoolId).subscribe((sequences) => this.sequences = sequences);
    this.termService.getAllBySchoolId(this.schoolId).subscribe((terms) => {
      this.sequencesByTerms = [];
      this.terms = terms;
      this.terms.forEach(term => this.sequenceService.getByTermId(term.id).subscribe((sequences) => {
        this.sequencesByTerms.push({term: term, sequences: sequences});
      }))
    });
    this._academicYearService.loadAcademicYears(
      this.academicYears, AcademicYearServiceStrategy.BY_SCHOOL,
      {schoolId: this.schoolId}, [(years: AcademicYear[]) => {this.academicYears = years}]
    );
  }

  saveSettingsAction() {
    if (this.school) {
      const school: School = {
        id: this.school.id,
        name: this.settingsForm.get('name')?.value,
        applicationOpen: this.settingsForm.get('applicationsOpen')?.value,
        currentYearId: parseInt(this.settingsForm.get("year")?.value),
        maxGrade: this.settingsForm.get('maxGrade')?.value,
        currentSequenceId: parseInt(this.settingsForm.get("sequence")?.value),
        schoolManagerId: this.school.schoolManagerId // fix school manager id
      }
      this.schoolService.update(school).subscribe(() => this.loadSchool());
    }
  }

  savePaymentSettingsAction() {
    if (this.school) {
      const paymentSetting = new PaymentSetting(
        this.paymentSettingsForm.get('tuitionFee')?.value,
        this.paymentSettingsForm.get('applicationFee')?.value,
        this.school.id!!
      );
      this._paymentSettingService.save(paymentSetting).subscribe(() => this.loadSchool());
    }
  }
}
