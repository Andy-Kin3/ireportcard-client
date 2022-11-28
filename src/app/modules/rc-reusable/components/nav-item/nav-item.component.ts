import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {NavItem} from "../../../../models/ui/nav-item";

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {
  @Input() index: number = -1;
  @Input() item: NavItem = {
    icon: "", name: "", path: "", active: false, children: []
  }

  @Output() onSelect: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  navigateAction() {
    this._router.navigate([this.item.path]).then(r => {
      this.onSelect.emit(this.index);
    });
  }
}
