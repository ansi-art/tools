<a name="module_@ansi-art/tools/src/grid"></a>

## @ansi-art/tools/src/grid
This provides an abstraction for doing work in with an ansi string in a grid context


* [@ansi-art/tools/src/grid](#module_@ansi-art/tools/src/grid)
    * [~Grid](#module_@ansi-art/tools/src/grid..Grid)
        * [new Grid()](#new_module_@ansi-art/tools/src/grid..Grid_new)
    * [~codeRender(height, width)](#module_@ansi-art/tools/src/grid..codeRender)
    * [~toString()](#module_@ansi-art/tools/src/grid..toString) ⇒ <code>string</code>
    * [~setValue(x, y, chr, styles)](#module_@ansi-art/tools/src/grid..setValue)
    * [~drawOnto(value, offsetX, offsetY, isTransparent, mergeStyles)](#module_@ansi-art/tools/src/grid..drawOnto)

<a name="module_@ansi-art/tools/src/grid..Grid"></a>

### @ansi-art/tools/src/grid~Grid
Provides an abstraction for doing work in with an ansi string in a grid context

**Kind**: inner class of [<code>@ansi-art/tools/src/grid</code>](#module_@ansi-art/tools/src/grid)  
<a name="new_module_@ansi-art/tools/src/grid..Grid_new"></a>

#### new Grid()
The default constructor for the ansi grid

<a name="module_@ansi-art/tools/src/grid..codeRender"></a>

### @ansi-art/tools/src/grid~codeRender(height, width)
set the internal height and width of the grid

**Kind**: inner method of [<code>@ansi-art/tools/src/grid</code>](#module_@ansi-art/tools/src/grid)  

| Param | Type |
| --- | --- |
| height | <code>integer</code> | 
| width | <code>integer</code> | 

<a name="module_@ansi-art/tools/src/grid..toString"></a>

### @ansi-art/tools/src/grid~toString() ⇒ <code>string</code>
render the contents of the grid back into a string

**Kind**: inner method of [<code>@ansi-art/tools/src/grid</code>](#module_@ansi-art/tools/src/grid)  
**Returns**: <code>string</code> - renderedString  
<a name="module_@ansi-art/tools/src/grid..setValue"></a>

### @ansi-art/tools/src/grid~setValue(x, y, chr, styles)
set a specific value on the grid and either provide or absorb the existing styles

**Kind**: inner method of [<code>@ansi-art/tools/src/grid</code>](#module_@ansi-art/tools/src/grid)  

| Param | Type |
| --- | --- |
| x | <code>integer</code> | 
| y | <code>integer</code> | 
| chr | <code>string</code> | 
| styles | <code>array</code> | 

<a name="module_@ansi-art/tools/src/grid..drawOnto"></a>

### @ansi-art/tools/src/grid~drawOnto(value, offsetX, offsetY, isTransparent, mergeStyles)
draw a 2d string onto the grid at a specified offset

**Kind**: inner method of [<code>@ansi-art/tools/src/grid</code>](#module_@ansi-art/tools/src/grid)  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| offsetX | <code>integer</code> | 
| offsetY | <code>integer</code> | 
| isTransparent | <code>boolean</code> | 
| mergeStyles | <code>boolean</code> | 

