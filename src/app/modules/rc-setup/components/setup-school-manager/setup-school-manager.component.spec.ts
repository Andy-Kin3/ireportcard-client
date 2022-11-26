import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SetupSchoolManagerComponent} from './setup-school-manager.component';

describe('SetupSchoolManagerComponent', () => {
  let component: SetupSchoolManagerComponent;
  let fixture: ComponentFixture<SetupSchoolManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupSchoolManagerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSchoolManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
