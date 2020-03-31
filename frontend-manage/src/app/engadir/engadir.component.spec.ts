import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngadirComponent } from './engadir.component';

describe('EngadirComponent', () => {
  let component: EngadirComponent;
  let fixture: ComponentFixture<EngadirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngadirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
