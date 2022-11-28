import {Component, OnInit} from '@angular/core';
import {ClassLevel} from "../../../../models/dto/class-level.model";
import {ClassLevelService} from "../../../../services/class-level.service";
import {MenuItem, MessageService} from "primeng/api";
import {addToMessageService} from "../../../../utils/message-service.util";
import {ClassLevelSubService} from "../../../../services/class-level-sub.service";
import {ClassLevelSub} from "../../../../models/dto/class-level-sub.model";
import {SectionService} from "../../../../services/section.service";
import {Section} from "../../../../models/dto/section.model";
import {Router} from "@angular/router";
import {RcClassLevel} from "../../../../app.types";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {NO_ENTITY_ID} from "../../../../models/base/base.model";

@Component({
  selector: 'app-rc-classes',
  templateUrl: './rc-classes.component.html',
  styleUrls: ['./rc-classes.component.scss']
})
export class RcClassesComponent implements OnInit {
  classMenuItems: MenuItem[] = [];
  classes: RcClassLevel[] = [];
  sections: Section[] = [];
  sectionId: number = 0;

  constructor(
    private router: Router,
    private classLevelService: ClassLevelService,
    private classLevelSubService: ClassLevelSubService,
    private sectionService: SectionService,
    private messageService: MessageService
  ) {
    this.classMenuItems = [
      {label: 'Edit', icon: 'pi pi-pencil',},
      {label: 'Delete', icon: 'pi pi-trash',}
    ]
  }

  ngOnInit(): void {
    const schoolId = LocalStorageUtil.readSchoolId();
    if (schoolId) this.loadSections(schoolId);
  }

  loadSections(schoolId: number): void {
    this.sectionService.getAllBySchoolId(schoolId).subscribe({
      next: (sections) => {
        this.sections = sections;
        if (sections.length > 0) {
          this.sectionId = sections[0].id ?? NO_ENTITY_ID;
        }
        this.loadClasses();
      }
    });
  }

  loadClasses(): void {
    const sectionId = this.sectionId;
    this.classes = [];
    if (sectionId > 0) {
      this.classLevelService.getBySection(sectionId).subscribe({
        next: (classLevels: ClassLevel[]) => {
          console.log(classLevels)
          classLevels.forEach((classLevel) => this.loadClassSubs(classLevel));
        },
        error: (error) => {
          addToMessageService(this.messageService, 'error', 'Error loading classes', `Server not responding.\n${error.message}`);
        }
      });
    }
  }

  sortClasses(): void {
    this.classes.sort((a, b) => {
      return a.classLevel.name.localeCompare(b.classLevel.name);
    })
  }

  deleteClassAction(classLevel: ClassLevel) {
    const confirmDelete = confirm(`Are you sure you want to delete this class: ${classLevel.name}?`)
    if (confirmDelete) {
      this.classLevelService.delete(classLevel).subscribe(
        (res) => addToMessageService(this.messageService, 'warn', 'Delete successful', res)
      )
    }
  }

  addClassLevelSubAction(classLevel: ClassLevel, inputElement: HTMLInputElement) {
    const classLevelSub: ClassLevelSub = {
      name: inputElement.value,
      classLevelId: classLevel.id!!
    }
    this.classLevelSubService.save(classLevelSub).subscribe(() => {
      this.loadClassSubs(classLevel);
      inputElement.value = '';
    })
  }

  deleteClassSubAction(classLevel: ClassLevel, classLevelSubId: number) {
    this.classLevelSubService.delete(classLevelSubId).subscribe(() => this.loadClassSubs(classLevel));
  }

  getColClass(classLevelSubs: ClassLevelSub[]) {
    switch (classLevelSubs.length) {
      case 1:
        return 'col-12';
      case 2:
        return 'col-6';
      case 3:
        return 'col-4';
      default :
        return 'col-3';
    }
  }

  private loadClassSubs(classLevel: ClassLevel): void {
    this.classLevelSubService.getAllByClassLevelId(classLevel.id!!).subscribe({
      next: (classLevelSubs) => {
        const classLevelFind = this.classes.find((c) => c.classLevel.id === classLevel.id);
        if (classLevelFind) {
          classLevelFind.classLevelSubs = classLevelSubs;
        } else {
          this.classes.push({classLevel, classLevelSubs});
        }
        this.sortClasses();
      },
      error: (error) => {
        addToMessageService(this.messageService, 'error', 'Error loading class subs', error.message);
      }
    });
  }
}


