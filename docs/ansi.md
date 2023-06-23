<a name="module_@ansi-art/tools/src/ansi"></a>

## @ansi-art/tools/src/ansi
This provides an abstraction for doing work in an ansi context


* [@ansi-art/tools/src/ansi](#module_@ansi-art/tools/src/ansi)
    * [~Ansi](#module_@ansi-art/tools/src/ansi..Ansi)
        * [new Ansi()](#new_module_@ansi-art/tools/src/ansi..Ansi_new)
    * [~length(value)](#module_@ansi-art/tools/src/ansi..length) ⇒ <code>integer</code>
    * [~codeRender(codes)](#module_@ansi-art/tools/src/ansi..codeRender) ⇒ <code>array</code>
    * [~clear()](#module_@ansi-art/tools/src/ansi..clear) ⇒ <code>integer</code>
    * [~substring(value, start, stop)](#module_@ansi-art/tools/src/ansi..substring) ⇒ <code>string</code>
    * [~trimTo(value, length)](#module_@ansi-art/tools/src/ansi..trimTo) ⇒ <code>string</code>
    * [~toArray(value)](#module_@ansi-art/tools/src/ansi..toArray) ⇒ <code>array</code>
    * [~toObjectArray(value, includeStyles)](#module_@ansi-art/tools/src/ansi..toObjectArray) ⇒ <code>array</code>
    * [~strip(value)](#module_@ansi-art/tools/src/ansi..strip) ⇒ <code>array</code>
    * [~charAt(value, index, includePrefix)](#module_@ansi-art/tools/src/ansi..charAt) ⇒ <code>array</code>
    * [~interstyle(...value, [callback])](#module_@ansi-art/tools/src/ansi..interstyle) ⇒ <code>Promise</code> \| <code>null</code>
    * [~intersect(...value, [callback])](#module_@ansi-art/tools/src/ansi..intersect) ⇒ <code>Promise</code> \| <code>null</code>
    * [~map(value, handler, includeLineEndings)](#module_@ansi-art/tools/src/ansi..map) ⇒ <code>array</code>
    * [~foregroundColor(style)](#module_@ansi-art/tools/src/ansi..foregroundColor) ⇒ <code>boolean</code>
    * [~backgroundColor(style)](#module_@ansi-art/tools/src/ansi..backgroundColor) ⇒ <code>boolean</code>

<a name="module_@ansi-art/tools/src/ansi..Ansi"></a>

### @ansi-art/tools/src/ansi~Ansi
This provides an abstraction for doing work in an ansi context

**Kind**: inner class of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
<a name="new_module_@ansi-art/tools/src/ansi..Ansi_new"></a>

#### new Ansi()
The default constructor for Ansi

<a name="module_@ansi-art/tools/src/ansi..length"></a>

### @ansi-art/tools/src/ansi~length(value) ⇒ <code>integer</code>
provide the length of an ansi string (not including control codes)

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>integer</code> - ansiColorCode  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="module_@ansi-art/tools/src/ansi..codeRender"></a>

### @ansi-art/tools/src/ansi~codeRender(codes) ⇒ <code>array</code>
render an internal code into a code wrapped with the appropriate escape sequence

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - escapedCodes  

| Param | Type |
| --- | --- |
| codes | <code>array</code> | 

<a name="module_@ansi-art/tools/src/ansi..clear"></a>

### @ansi-art/tools/src/ansi~clear() ⇒ <code>integer</code>
code to clear all active ansi codes

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>integer</code> - ansiColorCode  
<a name="module_@ansi-art/tools/src/ansi..substring"></a>

### @ansi-art/tools/src/ansi~substring(value, start, stop) ⇒ <code>string</code>
take a substring of an ansi string relative to its stripped positions

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>string</code> - ansiSubstring  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| start | <code>integer</code> | 
| stop | <code>integer</code> | 

<a name="module_@ansi-art/tools/src/ansi..trimTo"></a>

### @ansi-art/tools/src/ansi~trimTo(value, length) ⇒ <code>string</code>
truncate past a fixed size

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>string</code> - trimmedValue  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| length | <code>integer</code> | 

<a name="module_@ansi-art/tools/src/ansi..toArray"></a>

### @ansi-art/tools/src/ansi~toArray(value) ⇒ <code>array</code>
split sting into an array of elements, with or without styles

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - charAndStyleArray  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="module_@ansi-art/tools/src/ansi..toObjectArray"></a>

### @ansi-art/tools/src/ansi~toObjectArray(value, includeStyles) ⇒ <code>array</code>
return an array of characters with injected style information

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - charArray  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| includeStyles | <code>boolean</code> | 

<a name="module_@ansi-art/tools/src/ansi..strip"></a>

### @ansi-art/tools/src/ansi~strip(value) ⇒ <code>array</code>
remove all ansi code from the string

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - asciiString  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="module_@ansi-art/tools/src/ansi..charAt"></a>

### @ansi-art/tools/src/ansi~charAt(value, index, includePrefix) ⇒ <code>array</code>
get a character, relative to the stripped string positions

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - charAndStyleArray  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| index | <code>integer</code> | 
| includePrefix | <code>boolean</code> | 

<a name="module_@ansi-art/tools/src/ansi..interstyle"></a>

### @ansi-art/tools/src/ansi~interstyle(...value, [callback]) ⇒ <code>Promise</code> \| <code>null</code>
intersect many strings using styles

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>Promise</code> \| <code>null</code> - charAndStyleArray  

| Param | Type |
| --- | --- |
| ...value | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="module_@ansi-art/tools/src/ansi..intersect"></a>

### @ansi-art/tools/src/ansi~intersect(...value, [callback]) ⇒ <code>Promise</code> \| <code>null</code>
intersect many strings without styles

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>Promise</code> \| <code>null</code> - charAndStyleArray  

| Param | Type |
| --- | --- |
| ...value | <code>string</code> | 
| [callback] | <code>function</code> | 

<a name="module_@ansi-art/tools/src/ansi..map"></a>

### @ansi-art/tools/src/ansi~map(value, handler, includeLineEndings) ⇒ <code>array</code>
map through a string one character at a time with style information attached

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>array</code> - mappedValuesArray  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 
| handler | <code>function</code> | 
| includeLineEndings | <code>boolean</code> | 

<a name="module_@ansi-art/tools/src/ansi..foregroundColor"></a>

### @ansi-art/tools/src/ansi~foregroundColor(style) ⇒ <code>boolean</code>
determine whether the provided style is a foreground color

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>boolean</code> - itIsForegroundColor  

| Param | Type |
| --- | --- |
| style | <code>string</code> | 

<a name="module_@ansi-art/tools/src/ansi..backgroundColor"></a>

### @ansi-art/tools/src/ansi~backgroundColor(style) ⇒ <code>boolean</code>
determine whether the provided style is a background color

**Kind**: inner method of [<code>@ansi-art/tools/src/ansi</code>](#module_@ansi-art/tools/src/ansi)  
**Returns**: <code>boolean</code> - itIsBackgroundColor  

| Param | Type |
| --- | --- |
| style | <code>string</code> | 

