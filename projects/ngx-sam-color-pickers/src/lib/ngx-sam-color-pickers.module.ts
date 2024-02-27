import { NgModule } from '@angular/core';
import { HuePicker } from './hue-picker/hue-picker.component';
import { HueAlphaPicker } from './hue-alpha-picker/hue-alpha-picker.component';
import { AlphaPicker } from './alpha-picker/alpha-picker.component';

@NgModule({
  declarations: [
    HuePicker,
    HueAlphaPicker,
    AlphaPicker,
  ],
  imports: [
  ],
  exports: [
    HuePicker,
    HueAlphaPicker,
    AlphaPicker
  ]
})
export class NgxSamColorPickersModule { }
