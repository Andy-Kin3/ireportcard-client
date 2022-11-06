import {Component, Input, OnInit} from '@angular/core';
import {markNavItemActive, markNavItemActiveByPath, NavItem} from "../../../../models/ui/nav-item";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() navItems: NavItem[] = [];
  constructor(
  ) {

  }

  ngOnInit(): void {
    markNavItemActiveByPath(this.navItems);
  }

  markNavItemActiveAction($event: number) {
    markNavItemActive($event, this.navItems);
  }
}
