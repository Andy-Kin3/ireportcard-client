import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchoolSettingComponent } from './admin-school-setting.component';

describe('AdminSchoolSettingComponent', () => {
  let component: AdminSchoolSettingComponent;
  let fixture: ComponentFixture<AdminSchoolSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSchoolSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchoolSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
