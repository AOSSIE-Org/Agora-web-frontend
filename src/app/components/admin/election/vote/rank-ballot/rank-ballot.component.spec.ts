import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankBallotComponent } from './rank-ballot.component';

describe('RankBallotComponent', () => {
  let component: RankBallotComponent;
  let fixture: ComponentFixture<RankBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
