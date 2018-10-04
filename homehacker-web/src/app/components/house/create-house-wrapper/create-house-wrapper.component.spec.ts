import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHouseWrapperComponent } from './create-house-wrapper.component';

describe('CreateHouseWrapperComponent', () => {
  let component: CreateHouseWrapperComponent;
  let fixture: ComponentFixture<CreateHouseWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHouseWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHouseWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
