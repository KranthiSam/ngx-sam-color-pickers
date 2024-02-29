import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbaPicker } from './rgba-picker.component';

describe('NgxRgbPickerComponent', () => {
  let component: RgbaPicker;
  let fixture: ComponentFixture<RgbaPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgbaPicker ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgbaPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
