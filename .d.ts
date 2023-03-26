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
}

