import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBallotComponent } from './score-ballot.component';

describe('ScoreBallotComponent', () => {
  let component: ScoreBallotComponent;
  let fixture: ComponentFixture<ScoreBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
