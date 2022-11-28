import {Component, OnInit} from '@angular/core';
import {ClassLevelService} from "../../../../services/class-level.service";
import {SubjectService} from "../../../../services/subject.service";
import {SectionService} from "../../../../services/section.service";
import {StudentService} from "../../../../services/student.service";

@Component({
  selector: 'app-rc-home',
  templateUrl: './rc-home.component.html',
  styleUrls: ['./rc-home.component.scss'],
})
export class RcHomeComponent implements OnInit {
  title: string = 'Home';
  homeStats: { title: string; icon: string; value: number; link: string }[] = [];
  user: { name: string; email: string; role: string; } = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'Admin',
  };

  constructor(
    private classLevelService: ClassLevelService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) {
    this.homeStats = [
      {title: 'Classes', icon: 'pi pi-user', value: 0, link: '/dashboard/classes'},
      {title: 'Sections', icon: 'pi pi-user', value: 0, link: '#'},
      {title: 'Students', icon: 'pi pi-user', value: 0, link: '/dashboard/students'},
      {title: 'Subjects', icon: 'pi pi-user', value: 0, link: '/dashboard/subjects'},
    ]

  }

  ngOnInit(): void {

  }
}
