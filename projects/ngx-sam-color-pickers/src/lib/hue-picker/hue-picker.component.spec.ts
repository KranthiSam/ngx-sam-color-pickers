import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuePickerComponent } from './hue-picker.component';

describe('HuePickerComponent', () => {
  let component: HuePickerComponent;
  let fixture: ComponentFixture<HuePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HuePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
