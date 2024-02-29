import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { COLOR_CONFIG, COLOR_TYPE, ColorType, RGB, colorPickerDefaultOptions } from '../color-picker';
import { hslToHex, rgbToHsl, hslToRgb, trueOffsetLeft } from '../util';
import { Observable, debounce, debounceTime, fromEvent, interval, map } from 'rxjs';

@Component({
  selector: 'ngx-hue-picker',
  templateUrl: './hue-picker.component.html',
  styleUrls: ['./hue-picker.component.less']
})
export class HuePicker implements OnInit {

  outputEmitDebounce: number | undefined;
  trackMouseMove: boolean = false;
  offsetLeft: number = 0;

  huePercentage: number = 50;

  inputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;
  outputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;

  @Input() thumbStyle: ("circle"| "tube" | "dot") = "circle"; 
  
  
  @Input() 
  set color(_color: RGB){
    this.setInputData(_color);
  }

  @Output() onColorChange = new EventEmitter<RGB>();
  
  sliderThumbRef: ElementRef<any> | undefined;
  hueStripRef: ElementRef<any> | undefined;
  sliderThumbContainerRef: ElementRef<any> | undefined;


  @ViewChild('sliderThumbContainer')
  set sliderThumbContainer(ref: ElementRef){
    this.sliderThumbContainerRef = ref;
    ref.nativeElement.addEventListener("mousedown", this.mouseDownEvent.bind(this));
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

    window.addEventListener("mousemove", this.mouseMoveEvent.bind(this), true);
    window.addEventListener("mouseup", this.mouseUpEvent.bind(this), true);
  }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.changeThumb(this.huePercentage);
  }

  mouseDownEvent(evt: Event){
    this.zone.run(()=>{
      this.trackMouseMove = true;
      const refEle = this.hueStripRef?.nativeElement;
      this.offsetLeft = trueOffsetLeft(refEle);
      evt?.preventDefault();
    });
  }

  mouseMoveEvent(evt: any){
    this.zone.run(()=>{
      if(this.trackMouseMove){
        this.changeThumb(((evt.clientX - this.offsetLeft)/this.hueStripRef?.nativeElement.clientWidth * 100));
        this.emitOutput();
      }
    });
  }

  mouseUpEvent(evt: any){
    this.zone.run(()=>{
      this.trackMouseMove = false;
    });
  }

  mouseClickEvent(evt: any){
    this.zone.run(()=>{
      const refEle = this.hueStripRef?.nativeElement;
      const offsetLeft = trueOffsetLeft(refEle);
      this.changeThumb(((evt.clientX - offsetLeft)/refEle.clientWidth * 100));
      this.emitOutput();
    });    
  }
  changeThumb(huePercent: number, evt?: any){
    if(huePercent <= 0){
      huePercent = 0;
    }else if(huePercent >= 100){
      huePercent = 100;
    }
    this.huePercentage = huePercent;
    if(this.sliderThumbContainerRef){
      this.sliderThumbContainerRef.nativeElement.style.left =  this.huePercentage + "%";
    }
    if(this.sliderThumbRef && this.thumbStyle != "dot"){
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
    if(this.outputEmitDebounce){
      clearTimeout(this.outputEmitDebounce);
    }
    this.outputEmitDebounce = window.setTimeout(() => {
      const hslValue = {h: this.huePercentage * 360 / 100, s: 100, l: 50};
      this.onColorChange.emit(hslToRgb(hslValue)); 
    }, 100);
    
  }
  setThumbPosition(_color: ColorType) {

  }
}


