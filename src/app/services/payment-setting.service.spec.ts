import { TestBed } from '@angular/core/testing';

import { PaymentSettingService } from './payment-setting.service';

describe('PaymentSettingService', () => {
  let service: PaymentSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
