import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateinformationsComponent } from './candidateinformations.component';

describe('CandidateinformationsComponent', () => {
  let component: CandidateinformationsComponent;
  let fixture: ComponentFixture<CandidateinformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateinformationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateinformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
