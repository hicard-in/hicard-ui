import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLinkComponent } from './setting-link.component';

describe('SettingLinkComponent', () => {
  let component: SettingLinkComponent;
  let fixture: ComponentFixture<SettingLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
