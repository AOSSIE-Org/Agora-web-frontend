import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencialBallotComponent } from './preferencial-ballot.component';

describe('PreferencialBallotComponent', () => {
  let component: PreferencialBallotComponent;
  let fixture: ComponentFixture<PreferencialBallotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencialBallotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencialBallotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
