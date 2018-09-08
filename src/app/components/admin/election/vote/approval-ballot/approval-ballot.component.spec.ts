import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBallotComponent } from './approval-ballot.component';

describe('ApprovalBallotComponent', () => {
  let component: ApprovalBallotComponent;
  let fixture: ComponentFixture<ApprovalBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
