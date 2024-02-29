import { Component, EventEmitter, Inject, Input, NgZone, OnInit, Output } from '@angular/core';
import { ALPHA, COLOR_CONFIG, COLOR_TYPE, ColorType, RGB, RGBA, colorPickerDefaultOptions } from '../color-picker';

@Component({
  selector: 'ngx-hue-alpha-picker',
  templateUrl: './hue-alpha-picker.component.html',
  styleUrls: ['./hue-alpha-picker.component.less']
})
export class HueAlphaPicker implements OnInit {

  
  inputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;
  outputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;

  @Input() thumbStyle: ("circle"| "tube" | "dot") = "circle"; 
  alphaValue: ALPHA = 50;
  hueValue: RGB = {
    r: 0,
    g: 255,
    b: 255
  };
  @Input() 
  set color(_color: RGBA){
    this.setInputData(_color);
  }

  @Output() onColorChange = new EventEmitter<RGBA>();

  
  constructor(private zone: NgZone, @Inject(COLOR_CONFIG) colorConfig: colorPickerDefaultOptions) { 
    this.inputType = colorConfig.inputType;
    this.outputType = colorConfig.outputType;
    console.log(colorConfig, "config");
  }

  ngOnInit(): void {
  }

  setInputData(color: RGBA){
    this.hueValue = {
      r: color.r,
      g: color.g,
      b: color.b
    }
    this.alphaValue = color.a;
  }
  alphaChanged(evt: ALPHA){
    this.alphaValue = evt;
    let rgba: RGBA = {...this.hueValue, a: this.alphaValue / 100}
    this.onColorChange.emit(rgba);
  }
  colorChanged(evt: RGB){
    this.hueValue = evt;
    let rgba: RGBA = {...this.hueValue, a: this.alphaValue / 100}
    this.onColorChange.emit(rgba);
  }
}
