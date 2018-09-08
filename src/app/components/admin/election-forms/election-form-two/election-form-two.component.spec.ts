import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionFormTwoComponent } from './election-form-two.component';

describe('ElectionFormTwoComponent', () => {
  let component: ElectionFormTwoComponent;
  let fixture: ComponentFixture<ElectionFormTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionFormTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
