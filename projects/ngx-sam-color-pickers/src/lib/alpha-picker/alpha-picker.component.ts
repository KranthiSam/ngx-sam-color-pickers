import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { COLOR_TYPE, COLOR_CONFIG, colorPickerDefaultOptions, ALPHA, ColorType, RGB } from '../color-picker';
import { hslToRgb, rgbToHsl } from '../util';

@Component({
  selector: 'alpha-picker',
  templateUrl: './alpha-picker.component.html',
  styleUrls: ['./alpha-picker.component.less']
})
export class AlphaPicker implements OnInit {
  
  huePercentage: number = 50;
  alphaPercentage: ALPHA = 50;


  inputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;
  outputType: COLOR_TYPE = COLOR_TYPE.COLOR_RGB;

  @Input() thumbStyle: ("circle"| "tube") = "circle"; 
  @Input() 
  set alpha(_alpha: number){
    this.setInputAlpha(_alpha);
  }
  @Input() 
  set color(_color: RGB){
    this.setInputHue(_color);
  }

  @Output() onAlphaChange = new EventEmitter<ALPHA>();
  sliderThumbRef: ElementRef<any> | undefined;
  alphaStripRef: ElementRef<any> | undefined;
  sliderThumbContainerRef: ElementRef<any> | undefined;
  alphaMaskRef: ElementRef<any> | undefined;



  @ViewChild('sliderThumbContainer')
  set sliderThumbContainer(ref: ElementRef){
    this.sliderThumbContainerRef = ref;
    ref.nativeElement.addEventListener("mouseDown", this.mouseDownEvent.bind(this));
  }

  
  @ViewChild('alphaStrip')
  set alphaStrip(ref: ElementRef){
    this.alphaStripRef = ref;
    ref.nativeElement.addEventListener("click", this.mouseClickEvent.bind(this));
  }

  @ViewChild('sliderThumb') 
  set sliderThumb(ref: ElementRef){
    this.sliderThumbRef = ref;
  }

  @ViewChild('alphaMask')
  set alphaMask(ref: ElementRef){
    this.alphaMaskRef = ref;
  }
  

  constructor(private zone: NgZone, @Inject(COLOR_CONFIG) colorConfig: colorPickerDefaultOptions) { 
    this.inputType = colorConfig.inputType;
    this.outputType = colorConfig.outputType;
    console.log(colorConfig, "config");
  }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.changeStripData(this.huePercentage);
    this.changeThumbData(this.alphaPercentage);
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
      this.changeThumbData(((evt.offsetX - evt.target.offsetLeft)/evt.target.clientWidth * 100));
      this.emitOutput();
    });    
  }

  changeStripData(huePercent: number){
    this.huePercentage = huePercent;
    const rgbData = hslToRgb({
      h: this.huePercentage * 360 / 100, 
      s: 100, 
      l: 50
    });
    if(this.sliderThumbRef){
      this.sliderThumbRef.nativeElement.style.backgroundColor = `rgb(${rgbData.r},${rgbData.g},${rgbData.b})`;
    }
    if(this.alphaMaskRef){
      this.alphaMaskRef.nativeElement.style.background = "linear-gradient(to right, rgba(0, 0, 0, 0) 0%," + `rgb(${rgbData.r},${rgbData.g},${rgbData.b}) 100%)`;
    }
  }
  changeThumbData(alphaPercent: number){
    this.alphaPercentage = alphaPercent;
    if(this.sliderThumbContainerRef){
      this.sliderThumbContainerRef.nativeElement.style.left =  this.alphaPercentage + "%";
    }
  }
  setInputAlpha(alpha: number){
    if(alpha >= 0 && alpha <= 100){
      this.alphaPercentage = alpha
    }else{
      throw new Error("Invalid alpha data, expected value of between 0-100");
    }
    this.zone.run(()=>{
      this.changeThumbData(this.alphaPercentage);
    });
  }
  setInputHue(color: ColorType){
    let huePercent = 0;
    try{
      huePercent = rgbToHsl(color as RGB).h;
    }catch(e: any){
      throw new Error("Invalid input data, expected value of type" + COLOR_TYPE.COLOR_RGB);
    }
    this.zone.run(()=>{
      this.changeStripData(huePercent / 360 * 100);
    });
  }
  emitOutput(){
    const alphaValue = this.alphaPercentage;
    this.onAlphaChange.emit(alphaValue); 
  }
  setThumbPosition(_color: ColorType) {

  }
}
