(function (root, factory){
    if(typeof define === 'function' && define.amd){
        // AMD. Register as an anonymous module.
        define([
            './src/ansi', 
            './src/grid', 
            '@ansi-art/color', 
            '@ansi-art/char-subgrid'
        ], factory);
    }else if (typeof module === 'object' && module.exports){
        module.exports = factory(
            require('./src/ansi'), 
            require('./src/grid'), 
            require('@ansi-art/color'), 
            require('@ansi-art/char-subgrid')
        );
    }else{
        // Browser globals (root is window)
        root.AsciiArtTools = factory(
            root.Ascii.AnsiTools.Ansi, 
            root.Ascii.AnsiTools.Grid,
            root.AsciiArtColor,
            root.Ascii.Char.Grid
        );
    }
}(this, function(Ansi, Grid, AnsiColor, CharacterGrids){
    
    return {
        Ansi,
        Grid,
        ...AnsiColor,
        ...CharacterGrids
    };
}));