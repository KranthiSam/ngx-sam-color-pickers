import { Component, OnInit } from '@angular/core';
import { ALPHA, COLOR_CONFIG, COLOR_TYPE, ColorType, RGB } from 'ngx-sam-color-pickers'; 

@Component({
  selector: 'app-color-hue',
  templateUrl: './color-hue.component.html',
  styleUrls: ['./color-hue.component.less'],
  providers:[
    {
      provide: COLOR_CONFIG, 
      useValue: {
        inputType: COLOR_TYPE.COLOR_HEX,
        outputType: COLOR_TYPE.COLOR_HEX,
      }
    }
  ]
})
export class ColorHueComponent implements OnInit {

  color: RGB = {r: 140, g: 255, b: 0};
  alpha: ALPHA = 10;

  constructor() { }

  ngOnInit(): void {
  }

  alphaChanged(evt: ALPHA){
    console.log(evt);
  }
  colorChanged(evt: RGB){
    this.color = evt;
    console.log(evt);
  }
}
