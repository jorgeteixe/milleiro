import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasinalComponent } from './contrasinal.component';

describe('ContrasinalComponent', () => {
  let component: ContrasinalComponent;
  let fixture: ComponentFixture<ContrasinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
