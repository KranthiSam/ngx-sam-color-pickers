import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hue-picker',
  templateUrl: './hue-picker.component.html',
  styleUrls: ['./hue-picker.component.less']
})
export class HuePicker implements OnInit {

  @Input() thumbStyle: ("circle"| "tube") = "circle"; 
  constructor() { }
  
  selectedColor: string = "#4287f5";
  thumbPosition: string = "50%";
  ngOnInit(): void {
  }

}
