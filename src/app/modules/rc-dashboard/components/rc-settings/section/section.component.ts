import {Component, Input, OnInit} from '@angular/core';
import {Section} from "../../../../../models/dto/section.model";
import {NO_ENTITY_ID} from "../../../../../models/base/base.model";
import {SectionService} from "../../../../../services/section.service";
import {School} from "../../../../../models/dto/school.model";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() school?: School;
  sections: Section[] = [];

  constructor(
    private sectionService: SectionService,
  ) {
  }

  ngOnInit(): void {
  }

  loadSections = () => {
    if (this.school?.id) {
      this.sectionService.getAllBySchoolId(this.school.id).subscribe((sections) => {
        this.sections = sections
      });
    }
  }

  saveSection(sectionInput: HTMLInputElement | Section, blocked: boolean) {
    if (this.school) {
      if (blocked) {
        if (sectionInput instanceof HTMLInputElement) {
          if (sectionInput.hidden && sectionInput.value !== "") {
            const section: Section = new Section(sectionInput.value, this.school.id!!);

            this.sectionService.save(section).subscribe(() => {
              sectionInput.value = "";
              this.loadSections();
            });
          }
        } else {
          this.sectionService.update(sectionInput).subscribe(() => this.loadSections());
        }
      }
    }
  }

  deleteSection(section: Section) {
    this.sectionService.delete(section.id ?? NO_ENTITY_ID).subscribe(() => this.loadSections());
  }
}
