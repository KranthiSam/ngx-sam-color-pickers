import { InjectionToken } from "@angular/core";
import { ColorType,HSL } from "./util";

export enum COLOR_TYPE {
    COLOR_HSL = "HSL",
    COLOR_HSV = "HSV",
    COLOR_RGB = "RGB",
    COLOR_HEX = "HEX",
    COLOR_CMYK = "CMYK"    
}

export interface colorPickerDefaultOptions{
    inputType: COLOR_TYPE,
    outputType: COLOR_TYPE
}
/**
 * Injectable token that can be used to get input and output 
 * values for all color pickers within the app
 */
export const COLOR_CONFIG = new InjectionToken<colorPickerDefaultOptions>('color.config', {
    providedIn: 'root',
    factory: () => { 
        return {
            inputType: COLOR_TYPE.COLOR_RGB,
            outputType: COLOR_TYPE.COLOR_RGB
        }
    },
});
