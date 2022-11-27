import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationAndRefundPoliciesComponent } from './cancellation-and-refund-policies.component';

describe('CancellationAndRefundPoliciesComponent', () => {
  let component: CancellationAndRefundPoliciesComponent;
  let fixture: ComponentFixture<CancellationAndRefundPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancellationAndRefundPoliciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationAndRefundPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
