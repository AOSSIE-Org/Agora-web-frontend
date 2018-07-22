import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionFormFiveComponent } from './election-form-five.component';

describe('ElectionFormFiveComponent', () => {
  let component: ElectionFormFiveComponent;
  let fixture: ComponentFixture<ElectionFormFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionFormFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionFormFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
