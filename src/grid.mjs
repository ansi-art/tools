import { Ansi } from './ansi.mjs';
import { Color } from '@ansi-art/color/color.mjs';
/**
 * This provides an abstraction for doing work in with an ansi string in a grid context
 * @module @ansi-art/tools/src/grid
 */

/**
 * The default constructor for the ansi grid
 * @class Grid
 * @classdesc Provides an abstraction for doing work in with an ansi string in a grid context
 */
export const Grid = function(str, opts){
    const options = opts || {};
    this.ansi = new Ansi(options.color || new Color(options.bitDepth) || new Color('4bit'));
    
    var size = options.len || options.length || 1;
    this.data = [];
    var ob = this;
    var row = 0;
    var w = 0;
    this.height = 1;
    this.ansi.map(str, function(chr, styles, p, pos, shortCircuit){
        if(chr == "\n" ){
            row++;
            ob.height++;
            if(ob.width < w || !ob.width) ob.width = w;
            w=0;
        }else{
            if(!ob.data[row]) ob.data[row] = [];
            if(pos % size === 0){
                ob.data[row].push({
                    chr:chr, styles:styles.slice()
                });
            }else{
                ob.data[row][ob.data[row].length-1].chr += chr;
            }
            w++;
        }
    }, true);
    this.height = this.data.length;
}

/**
 * set the internal height and width of the grid
 * @function codeRender
 * @param {integer} height
 * @param {integer} width
 */
Grid.prototype.canvasSize = function(height, width){
    this.height = height;
    this.width = width;
}

/**
 * render the contents of the grid back into a string
 * @function toString
 * @returns {string} renderedString
 */
Grid.prototype.toString = function(){
    var result = '';
    var item;
    outer:for(var y=0; y < this.height; y++){
        for(var x=0; x < this.width; x++){
            if(!this.data[y]){
                continue outer;
            }
            item = this.data[y][x] || {chr:' '};
            result += this.ansi.codeRender(item.styles)+item.chr;
        }
        result += "\u001B[0m\n";
    }
    return result;
}

/**
 * set a specific value on the grid and either provide or absorb the existing styles
 * @function setValue
 * @param {integer} x
 * @param {integer} y
 * @param {string} chr
 * @param {array} styles
 */
Grid.prototype.setValue = function(x, y, chr, styles){
    if(x > this.width || !this.data[y]){
        //throw new Error('set outside bounds('+x+', '+y+')['+this.height+', '+this.width+']');
        return;
    }
    const value = {chr};
    if(styles === true){
        value.styles = (this.data[y][x] && this.data[y][x].styles)?
            this.data[y][x].styles.concat(value.styles):
            (value.styles?value.styles:[]);
    }
    if(Array.isArray(styles)){
        value.styles = this.ansi.stylesToCodes(styles);
    }
    this.data[y][x] = value;
}

var dimensions = function(model, ob){
    var w = 0;
    var result = 0;
    var h = 0;
    ob.ansi.map(model, function(c){
        if(c === "\n"){
            h++;
            if(w > result){
                result = w;
            }
            w=0;
        }else w++;
    }, true);
    return {
        height : h,
        width : result
    };
}

var isEmpty = function(chr){
    return (!chr.trim() || chr.trim() === '⠀');
}
/**
 * draw a 2d string onto the grid at a specified offset
 * @function drawOnto
 * @param {string} value
 * @param {integer} offsetX
 * @param {integer} offsetY
 * @param {boolean} isTransparent
 * @param {boolean} mergeStyles
 */
Grid.prototype.drawOnto = function(str, offX, offY, isTransparent, mergeStyles){
    if(offX < 0 || offY < 0){ //negatives for positioning from opposite margin
        var dims = dimensions(str, this);
        if(offX < 0) offX = this.width + offX - dims.width +1;
        if(offY < 0) offY = this.height + offY - dims.height +1;
    }
    if(offX === null) offX = 0;
    if(offY === null) offY = 0;
    var x = 0;
    var y = 0;
    var ob = this;
    this.ansi.map(str, function(chr, styles, p, pos, shortCircuit){
        if(ob.debug) console.log(chr, offX+x, offY+y, offX, x, offY, y);
        if(chr === "\n" ){
            y++;
            x=0;
        }else{
            if(chr && (!(isTransparent && isEmpty(chr) ))) ob.setValue(offX+x, offY+y, {
                chr:chr, styles:styles
            }, mergeStyles);
            x++;
        }
    }, true);
}
