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

/**
 * Converts HSL to RGB
 * @param hsl The HSL color values
 * @returns The RGB color values
 */
export function hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Converts RGB to Hex
 * @param rgb The RGB color values
 * @returns The Hex color string 
 */
export function rgbToHex(rgb: RGB): HEX {
    const hex = (x: number) => {
        const hexDigit = Math.round(x).toString(16);
        return hexDigit.length === 1 ? '0' + hexDigit : hexDigit;
    };

    return '#' + hex(rgb.r) + hex(rgb.g) + hex(rgb.b);
}

/**
 * Converts HSL to Hex
 * @param hsl The HSL color values
 * @returns The Hex color string 
 */
export function hslToHex(hsl: HSL): HEX {
    let rgb = hslToRgb(hsl);
    return rgbToHex(rgb);
}


/**
 * Converts RGB to CMYK
 * @param rgb The RGB color values
 * @returns The CMYK color values
 */
export function rgbToCmyk(rgb: RGB): CMYK {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100),
    };
}

/**
 * Converts HSL to CMYK
 * @param hsl The HSL color values
 * @returns The CMYK color string 
 */
export function hslToCmyk(hsl: HSL): CMYK {
    let rgb = hslToRgb(hsl);
    return rgbToCmyk(rgb);
}

/**
 * Converts HSL to HSV
 * @param hsl The HSL color values
 * @returns The HSV color values
 */
export function hslToHsv(hsl: HSL): HSV {
    const rgb = hslToRgb(hsl);
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const delta = max - min;

    let h = 0; 
    if (delta !== 0) {
        if (max === rgb.r) h = 60 * (((rgb.g - rgb.b) / delta) % 6);
        else if (max === rgb.g) h = 60 * ((rgb.b - rgb.r) / delta + 2);
        else if (max === rgb.b) h = 60 * ((rgb.r - rgb.g) / delta + 4);
    }

    const s = max === 0 ? 0 : delta / max; 
    const v = max / 255; 

    return { 
        h: h,
        s: s * 100,
        v: v * 100
    };
}

/**
 * Converts RGB to HSL
 * @param rgb The RGB color values
 * @returns The HSL color values
 */

export function rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
        if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
        } else {
        h = 60 * ((r - g) / delta + 4);
        }
    }

    const l = (max + min) / 2;

    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return {
        h: h,
        s: s * 100,
        l: l * 100,
    };
}

/**
 * Converts HEX to RGB
 * @param hex The HEX color values
 * @returns The RGB color values
 */
export function hexToRgb(hex: HEX): RGB {
    // Remove the '#' prefix if it exists
    const cleanHex = hex.startsWith('#') ? hex.substring(1) : hex;

    // Validate hex code length (must be 3 or 6 characters)
    if (cleanHex.length !== 3 && cleanHex.length !== 6) {
        throw new Error('Invalid hexadecimal color code');
    }

    // Expand shorthand hex (e.g., "03F") to full form ("0033FF")
    const expandedHex = cleanHex.length === 3
        ? cleanHex.split('').map(char => char + char).join('')
        : cleanHex;

    // Extract RGB components and convert from hexadecimal to decimal
    const r = parseInt(expandedHex.substring(0, 2), 16);
    const g = parseInt(expandedHex.substring(2, 4), 16);
    const b = parseInt(expandedHex.substring(4, 6), 16);

    return { r, g, b };
}

/**
 * Converts RGB to HSV
 * @param rgb The RGB color values
 * @returns The HSV color values
 */

export function rgbToHsv(rgb: RGB): HSV {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta !== 0) {
        if (max === r) {
        h = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
        h = 60 * ((b - r) / delta + 2);
        } else {
        h = 60 * ((r - g) / delta + 4);
        }
    }

    h = h < 0 ? h + 360 : h; // Ensure hue is between 0 and 360

    const s = max === 0 ? 0 : delta / max; 
    const v = max;

    return {
        h: h,
        s: s * 100,
        v: v * 100
    };
}

/**
 * Converts CMYK to RGB
 * @param cmyk The CMYK color values
 * @returns The RGB color values
 */

export function cmykToRgb(cmyk: CMYK): RGB {
    const r = 255 * (1 - cmyk.c / 100) * (1 - cmyk.k / 100);
    const g = 255 * (1 - cmyk.m / 100) * (1 - cmyk.k / 100);
    const b = 255 * (1 - cmyk.y / 100) * (1 - cmyk.k / 100);

    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
    };
}

/**
 * Converts CMYK to HSL
 * @param cmyk The CMYK color values
 * @returns The HSL color values
 */

export function cmykToHSL(cmyk: CMYK): HSL {
    return rgbToHsl(cmykToRgb(cmyk));
}

/**
 * Converts HEX to HSL
 * @param hex The HEX color values
 * @returns The HSL color values
 */

export function hexToHsl(hex: HEX): HSL {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb);
} 

/**
 * Converts HSV to HSL
 * @param hsv The HSV color values
 * @returns The HSL color values
 */

export function hsvToHsl(hsv: HSV): HSL {
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    const l = (2 - s) * v / 2;

    let s2 = l !== 0 ? (l === 1 ? 0 : (v - l) / Math.min(l, 1 - l)) : 0;

    return {
        h: hsv.h,
        s: s2 * 100,
        l: l * 100
    };
}