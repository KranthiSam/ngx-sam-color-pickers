import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HueAlphaPickerComponent } from './hue-alpha-picker.component';

describe('HueAlphaPickerComponent', () => {
  let component: HueAlphaPickerComponent;
  let fixture: ComponentFixture<HueAlphaPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HueAlphaPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HueAlphaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
