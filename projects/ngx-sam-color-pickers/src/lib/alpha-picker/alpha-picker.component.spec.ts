import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaPickerComponent } from './alpha-picker.component';

describe('AlphaPickerComponent', () => {
  let component: AlphaPickerComponent;
  let fixture: ComponentFixture<AlphaPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphaPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
