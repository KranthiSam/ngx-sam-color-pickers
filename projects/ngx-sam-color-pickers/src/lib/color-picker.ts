import { InjectionToken } from "@angular/core";

/**
 * Represents an HSL color model
 */
export interface HSL {
    h: number; // Hue (0 - 360)
    s: number; // Saturation (0 - 100%)
    l: number; // Lightness (0 - 100%)
}

/**
 * Represents an HSV color model
 */
export interface HSV {
    h: number; // Hue (0 - 360)
    s: number; // Saturation (0 - 100%)
    v: number; // Value (0 - 100%)
}

/**
 * Represents an RGB color model
 */
export interface RGB {
    r: number; // Red (0 - 255)
    g: number; // Green (0 - 255)
    b: number; // Blue (0 - 255)
}

/**
 * Represents an RGBA color model
 */
export interface RGBA {
    r: number; // Red (0 - 255)
    g: number; // Green (0 - 255)
    b: number; // Blue (0 - 255)
    a: number;
}

/**
 * Represents a CMYK color model
 */
export interface CMYK {
    c: number; // Cyan (0 - 100%)
    m: number; // Magenta (0 - 100%)
    y: number; // Yellow (0 - 100%)
    k: number; // Key (black) (0 - 100%)
}


export type HEX = string;

export type ALPHA = number;

export type ColorType = HSL|HSV|RGB|HEX|CMYK;

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
