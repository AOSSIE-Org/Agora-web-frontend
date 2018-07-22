import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionFormOneComponent } from './election-form-one.component';

describe('ElectionFormOneComponent', () => {
  let component: ElectionFormOneComponent;
  let fixture: ComponentFixture<ElectionFormOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionFormOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionFormOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
