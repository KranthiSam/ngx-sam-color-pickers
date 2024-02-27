import { Component, EventEmitter, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { CMYK, ColorType, HEX, HSL, HSV, RGB, cmykToHSL, hexToHsl, hsvToHsl, rgbToHsl } from '../util';
import { COLOR_CONFIG, COLOR_TYPE, colorPickerDefaultOptions } from '../color-picker';

@Component({
  selector: 'hue-alpha-picker',
  templateUrl: './hue-alpha-picker.component.html',
  styleUrls: ['./hue-alpha-picker.component.css']
})
export class HueAlphaPicker implements OnInit {

  
  inputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;
  outputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;

  @Input() thumbStyle: ("circle"| "tube") = "circle"; 
  @Input() 
  set color(_color: ColorType){
    this.setInputData(_color);
  }

  @Output() onColorChange = new EventEmitter<ColorType>();

  
  constructor(private zone: NgZone, @Inject(COLOR_CONFIG) colorConfig: colorPickerDefaultOptions) { 
    this.inputType = colorConfig.inputType;
    this.outputType = colorConfig.outputType;
    console.log(colorConfig, "config");
  }

  ngOnInit(): void {
  }

  setInputData(color: ColorType){
    
  }
  colorChanged(evt: ColorType){
    this.onColorChange.emit(evt);
  }
}
