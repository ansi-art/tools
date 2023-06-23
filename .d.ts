/**
 * This provides an abstraction for doing work in an ansi context
 */
declare module "@ansi-art/tools/src/ansi" {
    /**
     * The default constructor for Ansi
     */
    class Ansi {
    }
    /**
     * provide the length of an ansi string (not including control codes)
     * @returns ansiColorCode
     */
    function length(value: string): integer;
    /**
     * render an internal code into a code wrapped with the appropriate escape sequence
     * @returns escapedCodes
     */
    function codeRender(codes: any[]): any[];
    /**
     * code to clear all active ansi codes
     * @returns ansiColorCode
     */
    function clear(): integer;
    /**
     * take a substring of an ansi string relative to its stripped positions
     * @returns ansiSubstring
     */
    function substring(value: string, start: integer, stop: integer): string;
    /**
     * truncate past a fixed size
     * @returns trimmedValue
     */
    function trimTo(value: string, length: integer): string;
    /**
     * split sting into an array of elements, with or without styles
     * @returns charAndStyleArray
     */
    function toArray(value: string): any[];
    /**
     * return an array of characters with injected style information
     * @returns charArray
     */
    function toObjectArray(value: string, includeStyles: boolean): any[];
    /**
     * remove all ansi code from the string
     * @returns asciiString
     */
    function strip(value: string): any[];
    /**
     * get a character, relative to the stripped string positions
     * @returns charAndStyleArray
     */
    function charAt(value: string, index: integer, includePrefix: boolean): any[];
    /**
     * intersect many strings using styles
     * @returns charAndStyleArray
     */
    function interstyle(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * intersect many strings without styles
     * @returns charAndStyleArray
     */
    function intersect(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * map through a string one character at a time with style information attached
     * @returns mappedValuesArray
     */
    function map(value: string, handler: (...params: any[]) => any, includeLineEndings: boolean): any[];
    /**
     * determine whether the provided style is a foreground color
     * @returns itIsForegroundColor
     */
    function foregroundColor(style: string): boolean;
    /**
     * determine whether the provided style is a background color
     * @returns itIsBackgroundColor
     */
    function backgroundColor(style: string): boolean;
    /**
     * The default constructor for Ansi
     */
    class Ansi {
    }
    /**
     * provide the length of an ansi string (not including control codes)
     * @returns ansiColorCode
     */
    function length(value: string): integer;
    /**
     * render an internal code into a code wrapped with the appropriate escape sequence
     * @returns escapedCodes
     */
    function codeRender(codes: any[]): any[];
    /**
     * code to clear all active ansi codes
     * @returns ansiColorCode
     */
    function clear(): integer;
    /**
     * take a substring of an ansi string relative to its stripped positions
     * @returns ansiSubstring
     */
    function substring(value: string, start: integer, stop: integer): string;
    /**
     * truncate past a fixed size
     * @returns trimmedValue
     */
    function trimTo(value: string, length: integer): string;
    /**
     * split sting into an array of elements, with or without styles
     * @returns charAndStyleArray
     */
    function toArray(value: string): any[];
    /**
     * return an array of characters with injected style information
     * @returns charArray
     */
    function toObjectArray(value: string, includeStyles: boolean): any[];
    /**
     * remove all ansi code from the string
     * @returns asciiString
     */
    function strip(value: string): any[];
    /**
     * get a character, relative to the stripped string positions
     * @returns charAndStyleArray
     */
    function charAt(value: string, index: integer, includePrefix: boolean): any[];
    /**
     * intersect many strings using styles
     * @returns charAndStyleArray
     */
    function interstyle(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * intersect many strings without styles
     * @returns charAndStyleArray
     */
    function intersect(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * map through a string one character at a time with style information attached
     * @returns mappedValuesArray
     */
    function map(value: string, handler: (...params: any[]) => any, includeLineEndings: boolean): any[];
    /**
     * determine whether the provided style is a foreground color
     * @returns itIsForegroundColor
     */
    function foregroundColor(style: string): boolean;
    /**
     * determine whether the provided style is a background color
     * @returns itIsBackgroundColor
     */
    function backgroundColor(style: string): boolean;
}

/**
 * This provides an abstraction for doing work in with an ansi string in a grid context
 */
declare module "@ansi-art/tools/src/grid" {
    /**
     * The default constructor for the ansi grid
     */
    class Grid {
    }
    /**
     * set the internal height and width of the grid
     */
    function codeRender(height: integer, width: integer): void;
    /**
     * render the contents of the grid back into a string
     * @returns renderedString
     */
    function toString(): string;
    /**
     * set a specific value on the grid and either provide or absorb the existing styles
     */
    function setValue(x: integer, y: integer, chr: string, styles: any[]): void;
    /**
     * draw a 2d string onto the grid at a specified offset
     */
    function drawOnto(value: string, offsetX: integer, offsetY: integer, isTransparent: boolean, mergeStyles: boolean): void;
    /**
     * The default constructor for the ansi grid
     */
    class Grid {
    }
    /**
     * set the internal height and width of the grid
     */
    function codeRender(height: integer, width: integer): void;
    /**
     * render the contents of the grid back into a string
     * @returns renderedString
     */
    function toString(): string;
    /**
     * set a specific value on the grid and either provide or absorb the existing styles
     */
    function setValue(x: integer, y: integer, chr: string, styles: any[]): void;
    /**
     * draw a 2d string onto the grid at a specified offset
     */
    function drawOnto(value: string, offsetX: integer, offsetY: integer, isTransparent: boolean, mergeStyles: boolean): void;
}

/**
 * Generate threshold maps as block characters
 */
declare module "@ansi-art/char-subgrid/src/blocks" {
    /**
     * UTF Block based SubGridTransformer
     */
    class AsciiCharBlocksTransformer extends AsciiCharSingleCharTransformer {
    }
}

/**
 * Generate threshold maps as braille characters
 */
declare module "@ansi-art/char-subgrid/src/braille" {
    /**
     * UTF Block based SubGridTransformer
     */
    class AsciiCharBlocksTransformer extends AsciiCharDoubleCharTransformer {
    }
}

/**
 * Generate threshold maps as dual quads base class
 */
declare module "@ansi-art/char-subgrid/src/double-char" {
    /**
     * UTF Block based SubGridTransformer
     */
    class AsciiCharDoubleCharTransformer extends SubGridTransformer {
    }
}

/**
 * Generate threshold maps as mini-quads base class
 */
declare module "@ansi-art/char-subgrid/src/single-char" {
    /**
     * UTF Block based SubGridTransformer
     */
    class AsciiCharSingleCharTransformer extends SubGridTransformer {
    }
}

/**
 * Generate threshold maps as slanted characters
 */
declare module "@ansi-art/char-subgrid/src/slants" {
    /**
     * UTF Block based SubGridTransformer
     */
    class AsciiCharSlantsTransformer extends AsciiCharSingleCharTransformer {
    }
}

/**
 * Generate threshold maps base class
 */
declare module "@ansi-art/char-subgrid/src/transform" {
    /**
     * The default constructor for SubGridTransformer
     */
    class SubGridTransformer {
    }
    /**
     * The map implementation (provided by implementations)
     * @returns mappedValue
     */
    function mapTo(value: string, mapFunction: (...params: any[]) => any): any;
    /**
     * The map implementation (provided by implementations)
     * @returns transformedValue
     */
    function transform(chunk: string): any;
    /**
     * The map implementation (provided by implementations)
     * @returns extendedSubGridTransformer
     */
    function extend(memberFunctions: any, constructor: (...params: any[]) => any): Class;
}

/**
 * The default constructor for SubGridTransformer
 */
declare class Color {
}

/**
 * The map implementation (provided by implementations)
 * @returns ansiColorCode
 */
declare function ansi(depth: string | number): string;

/**
 * The map implementation (provided by implementations)
 * @returns hexValue
 */
declare function hex(): string;

/**
 * The map implementation (provided by implementations)
 * @returns rgbArray
 */
declare function rgb(): any[];

/**
 * This provides an abstraction for doing work in a color space
 */
declare module "@ansi-art/color/src/context" {
    /**
     * The default constructor for ColorContext
     */
    class ColorContext {
    }
    /**
     * get the mapped color for a particular color in this context
     * @returns ansiColorCode
     */
    function getColor(color: Color, palette: ColorPalette): string;
}

/**
 * get the distance between the provided color components
 */
declare module "@ansi-art/color/src/distance" {
    /**
     * get the distance between the provided color components
     * @returns wrappedDistanceFn
     */
    function colorDistance(distanceFn: (...params: any[]) => any): (...params: any[]) => any;
}

/**
 * This provides an abstraction for the color profiles associated with drawing output
 */
declare module "@ansi-art/color/src/medium" {
    /**
     * The default constructor for ColorMedium
     */
    class ColorMedium {
    }
    /**
     * get the mapped color for a particular color in this context
     * @returns ansiColorCode
     */
    function getColors(): any[];
}

/**
 * This provides an abstraction for performing color adhoc evaluations given a specific context (space + medium)
 */
declare module "@ansi-art/color/src/palette" {
    /**
     * The default constructor for ColorPalette
     */
    class ColorPalette {
    }
    /**
     * get the mapped color for a particular color in this context
     * @returns mappedHexColor
     */
    function interpretColor(hexColor: string): string;
    /**
     * get the mapped color for a particular color in this context
     * @returns hexValueArray
     */
    function getColors(): any[];
}

/**
 * This provides default set of colors in a given color space
 */
declare module "@ansi-art/color/src/space" {
    /**
     * The default constructor for ColorSpace
     */
    class ColorSpace {
    }
    /**
     * get the set of colors for this color space, given the provided output medium
     * @returns hexColorsArray
     */
    function getColors(medium: ColorMedium): any[];
}

/**
 * This provides an abstraction for doing work in an ansi context
 */
declare module "@ansi-art/tools/src/ansi" {
    /**
     * The default constructor for Ansi
     */
    class Ansi {
    }
    /**
     * provide the length of an ansi string (not including control codes)
     * @returns ansiColorCode
     */
    function length(value: string): integer;
    /**
     * render an internal code into a code wrapped with the appropriate escape sequence
     * @returns escapedCodes
     */
    function codeRender(codes: any[]): any[];
    /**
     * code to clear all active ansi codes
     * @returns ansiColorCode
     */
    function clear(): integer;
    /**
     * take a substring of an ansi string relative to its stripped positions
     * @returns ansiSubstring
     */
    function substring(value: string, start: integer, stop: integer): string;
    /**
     * truncate past a fixed size
     * @returns trimmedValue
     */
    function trimTo(value: string, length: integer): string;
    /**
     * split sting into an array of elements, with or without styles
     * @returns charAndStyleArray
     */
    function toArray(value: string): any[];
    /**
     * return an array of characters with injected style information
     * @returns charArray
     */
    function toObjectArray(value: string, includeStyles: boolean): any[];
    /**
     * remove all ansi code from the string
     * @returns asciiString
     */
    function strip(value: string): any[];
    /**
     * get a character, relative to the stripped string positions
     * @returns charAndStyleArray
     */
    function charAt(value: string, index: integer, includePrefix: boolean): any[];
    /**
     * intersect many strings using styles
     * @returns charAndStyleArray
     */
    function interstyle(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * intersect many strings without styles
     * @returns charAndStyleArray
     */
    function intersect(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * map through a string one character at a time with style information attached
     * @returns mappedValuesArray
     */
    function map(value: string, handler: (...params: any[]) => any, includeLineEndings: boolean): any[];
    /**
     * determine whether the provided style is a foreground color
     * @returns itIsForegroundColor
     */
    function foregroundColor(style: string): boolean;
    /**
     * determine whether the provided style is a background color
     * @returns itIsBackgroundColor
     */
    function backgroundColor(style: string): boolean;
    /**
     * The default constructor for Ansi
     */
    class Ansi {
    }
    /**
     * provide the length of an ansi string (not including control codes)
     * @returns ansiColorCode
     */
    function length(value: string): integer;
    /**
     * render an internal code into a code wrapped with the appropriate escape sequence
     * @returns escapedCodes
     */
    function codeRender(codes: any[]): any[];
    /**
     * code to clear all active ansi codes
     * @returns ansiColorCode
     */
    function clear(): integer;
    /**
     * take a substring of an ansi string relative to its stripped positions
     * @returns ansiSubstring
     */
    function substring(value: string, start: integer, stop: integer): string;
    /**
     * truncate past a fixed size
     * @returns trimmedValue
     */
    function trimTo(value: string, length: integer): string;
    /**
     * split sting into an array of elements, with or without styles
     * @returns charAndStyleArray
     */
    function toArray(value: string): any[];
    /**
     * return an array of characters with injected style information
     * @returns charArray
     */
    function toObjectArray(value: string, includeStyles: boolean): any[];
    /**
     * remove all ansi code from the string
     * @returns asciiString
     */
    function strip(value: string): any[];
    /**
     * get a character, relative to the stripped string positions
     * @returns charAndStyleArray
     */
    function charAt(value: string, index: integer, includePrefix: boolean): any[];
    /**
     * intersect many strings using styles
     * @returns charAndStyleArray
     */
    function interstyle(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * intersect many strings without styles
     * @returns charAndStyleArray
     */
    function intersect(...value: string[], callback?: (...params: any[]) => any): Promise | null;
    /**
     * map through a string one character at a time with style information attached
     * @returns mappedValuesArray
     */
    function map(value: string, handler: (...params: any[]) => any, includeLineEndings: boolean): any[];
    /**
     * determine whether the provided style is a foreground color
     * @returns itIsForegroundColor
     */
    function foregroundColor(style: string): boolean;
    /**
     * determine whether the provided style is a background color
     * @returns itIsBackgroundColor
     */
    function backgroundColor(style: string): boolean;
}

/**
 * This provides an abstraction for doing work in with an ansi string in a grid context
 */
declare module "@ansi-art/tools/src/grid" {
    /**
     * The default constructor for the ansi grid
     */
    class Grid {
    }
    /**
     * set the internal height and width of the grid
     */
    function codeRender(height: integer, width: integer): void;
    /**
     * render the contents of the grid back into a string
     * @returns renderedString
     */
    function toString(): string;
    /**
     * set a specific value on the grid and either provide or absorb the existing styles
     */
    function setValue(x: integer, y: integer, chr: string, styles: any[]): void;
    /**
     * draw a 2d string onto the grid at a specified offset
     */
    function drawOnto(value: string, offsetX: integer, offsetY: integer, isTransparent: boolean, mergeStyles: boolean): void;
    /**
     * The default constructor for the ansi grid
     */
    class Grid {
    }
    /**
     * set the internal height and width of the grid
     */
    function codeRender(height: integer, width: integer): void;
    /**
     * render the contents of the grid back into a string
     * @returns renderedString
     */
    function toString(): string;
    /**
     * set a specific value on the grid and either provide or absorb the existing styles
     */
    function setValue(x: integer, y: integer, chr: string, styles: any[]): void;
    /**
     * draw a 2d string onto the grid at a specified offset
     */
    function drawOnto(value: string, offsetX: integer, offsetY: integer, isTransparent: boolean, mergeStyles: boolean): void;
}

