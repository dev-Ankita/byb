import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BYBdetailsComponent } from './bybdetails.component';

describe('BYBdetailsComponent', () => {
  let component: BYBdetailsComponent;
  let fixture: ComponentFixture<BYBdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BYBdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BYBdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
