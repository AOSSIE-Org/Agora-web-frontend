import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionFormFourComponent } from './election-form-four.component';

describe('ElectionFormFourComponent', () => {
  let component: ElectionFormFourComponent;
  let fixture: ComponentFixture<ElectionFormFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionFormFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionFormFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
