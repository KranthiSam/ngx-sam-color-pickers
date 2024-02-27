import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorHueComponent } from './color-hue/color-hue.component';
import { NgxSamColorPickersModule } from 'ngx-sam-color-pickers';


@NgModule({
    declarations: [
        AppComponent,
        ColorHueComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxSamColorPickersModule,
    ]
})
export class AppModule { }
