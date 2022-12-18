import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatepersonalInfoComponent } from './candidatepersonal-info.component';

describe('CandidatepersonalInfoComponent', () => {
  let component: CandidatepersonalInfoComponent;
  let fixture: ComponentFixture<CandidatepersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatepersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatepersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
