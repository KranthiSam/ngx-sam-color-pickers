import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorHueComponent } from './color-hue.component';

describe('ColorHueComponent', () => {
  let component: ColorHueComponent;
  let fixture: ComponentFixture<ColorHueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorHueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorHueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
