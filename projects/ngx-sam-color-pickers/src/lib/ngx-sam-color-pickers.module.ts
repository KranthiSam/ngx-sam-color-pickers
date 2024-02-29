import { NgModule } from '@angular/core';
import { HuePicker } from './hue-picker/hue-picker.component';
import { HueAlphaPicker } from './hue-alpha-picker/hue-alpha-picker.component';
import { AlphaPicker } from './alpha-picker/alpha-picker.component';
import { RgbaPicker } from './rgba-picker/rgba-picker.component';

@NgModule({
  declarations: [
    HuePicker,
    HueAlphaPicker,
    AlphaPicker,
    RgbaPicker,
  ],
  imports: [
  ],
  exports: [
    HuePicker,
    HueAlphaPicker,
    AlphaPicker,
    RgbaPicker
  ]
})
export class NgxSamColorPickersModule { }
