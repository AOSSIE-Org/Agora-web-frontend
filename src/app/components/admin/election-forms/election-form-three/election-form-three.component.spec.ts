import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionFormThreeComponent } from './election-form-three.component';

describe('ElectionFormThreeComponent', () => {
  let component: ElectionFormThreeComponent;
  let fixture: ComponentFixture<ElectionFormThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionFormThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionFormThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
