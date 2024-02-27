import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { CMYK, ColorType, HEX, HSL, HSV, RGB, cmykToHSL, hexToHsl, hslToCmyk, hslToHex, hslToHsv, hslToRgb, hsvToHsl, rgbToCmyk, rgbToHex, rgbToHsl, rgbToHsv } from '../util';
import { COLOR_CONFIG, COLOR_TYPE, colorPickerDefaultOptions } from '../color-picker';

@Component({
  selector: 'hue-picker',
  templateUrl: './hue-picker.component.html',
  styleUrls: ['./hue-picker.component.less']
})
export class HuePicker implements OnInit {


  huePercentage: number = 0;

  inputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;
  outputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;

  @Input() thumbStyle: ("circle"| "tube") = "circle"; 
  @Input() 
  set color(_color: ColorType){
    this.setInputData(_color);
  }

  @Output() onColorChange = new EventEmitter<RGB>();
  sliderThumbRef: ElementRef<any> | undefined;
  hueStripRef: ElementRef<any> | undefined;
  sliderThumbContainerRef: ElementRef<any> | undefined;


  @ViewChild('sliderThumbContainer')
  set sliderThumbContainer(ref: ElementRef){
    this.sliderThumbContainerRef = ref;
    ref.nativeElement.addEventListener("mouseDown", this.mouseDownEvent.bind(this));
  }

  
  @ViewChild('hueStrip')
  set hueStrip(ref: ElementRef){
    this.hueStripRef = ref;
    ref.nativeElement.addEventListener("click", this.mouseClickEvent.bind(this));
  }

  @ViewChild('sliderThumb') 
  set sliderThumb(ref: ElementRef){
    this.sliderThumbRef = ref;
  }

  

  constructor(private zone: NgZone, @Inject(COLOR_CONFIG) colorConfig: colorPickerDefaultOptions) { 
    this.inputType = colorConfig.inputType;
    this.outputType = colorConfig.outputType;
    console.log(colorConfig, "config");
  }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.changeThumb(this.huePercentage);
  }

  mouseDownEvent(evt: Event){
    this.zone.run(()=>{

    });
  }

  mouseMoveEvent(evt: Event){
    this.zone.run(()=>{

    });
  }

  mouseUpEvent(evt: Event){
    
  }

  mouseClickEvent(evt: any){
    this.zone.run(()=>{
      this.changeThumb(((evt.offsetX - evt.target.offsetLeft)/evt.target.clientWidth * 100));
      this.emitOutput();
    });    
  }
  changeThumb(huePercent: number){
    this.huePercentage = huePercent;
    if(this.sliderThumbContainerRef){
      this.sliderThumbContainerRef.nativeElement.style.left =  this.huePercentage + "%";
    }
    if(this.sliderThumbRef){
      this.sliderThumbRef.nativeElement.style.backgroundColor = hslToHex({
        h: this.huePercentage * 360 / 100, 
        s: 100, 
        l: 50
      });
    }
  }
  setInputData(color: ColorType){
    let huePercent = 0;
    try{
      huePercent = rgbToHsl(color as RGB).h; 
    }catch(e: any){
      throw new Error("Invalid input data, expected value of type" + COLOR_TYPE.COLOR_RGB);
    }
    this.zone.run(()=>{
      this.changeThumb(huePercent / 360 * 100);
    });
  }
  emitOutput(){
    const hslValue = {h: this.huePercentage * 360 / 100, s: 100, l: 50};
    this.onColorChange.emit(hslToRgb(hslValue)); 
  }
  setThumbPosition(_color: ColorType) {

  }
}


