import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ALPHA, RGB, RGBA } from '../color-picker';

@Component({
  selector: 'ngx-rgba-picker',
  templateUrl: './rgba-picker.component.html',
  styleUrls: ['./rgba-picker.component.less']
})
export class RgbaPicker implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

  setInputData(color: RGBA){

  }
}
