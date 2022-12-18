import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrallinkComponent } from './referrallink.component';

describe('ReferrallinkComponent', () => {
  let component: ReferrallinkComponent;
  let fixture: ComponentFixture<ReferrallinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrallinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferrallinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
