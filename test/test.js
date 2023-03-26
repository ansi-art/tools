const should = require('chai').should();
const { Ansi, Grid } = require('../tools');
const AnsiColor = require('@ansi-art/color');

describe('tools', ()=>{
   describe('static tools', ()=>{
      it('tests for foreground colors', ()=>{
         Ansi.is.it.foregroundColor('foo').should.equal(false)
         Ansi.is.it.foregroundColor('38;5;57m ').should.equal(true);
         Ansi.is.it.foregroundColor('31;42m').should.equal(true);
         Ansi.is.it.foregroundColor('3m').should.equal(false);
      });
     
      it('tests for background colors', ()=>{
         Ansi.is.it.backgroundColor('foo').should.equal(false)
         Ansi.is.it.backgroundColor('48;5;57m ').should.equal(true);
         Ansi.is.it.backgroundColor('41;42m').should.equal(true);
         Ansi.is.it.backgroundColor('4m').should.equal(false);
      });
       
   });
    
    const testContext = function(bitDepth){
      it('tests for correct lengths', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         ansi.length('a non-ansi string').should.equal(17);
         ansi.length('an \033[1;31mansi string').should.equal(14);
      });
       
      it('maps correctly', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         const theString = 'a string I am testing';
         const theStyledString = 'a \033[1;31mstring I am \033[1;34mtesting';
         const seen = [];
         const stripped = ansi.map(theStyledString, (char, styles, [line, position])=>{
            styles.forEach((style)=> seen.push(style) );
            char.should.equal(theString[position]);
            return char;
         });
         stripped.should.equal(theString);
         seen.indexOf('1;31').should.not.equal(-1);
         seen.indexOf('1;34').should.not.equal(-1);
      });
        
      it('strips correctly', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         const theString = 'a string I am testing';
         const theStyledString = 'a \033[1;31mstring I am \033[1;34mtesting';
         ansi.strip(theStyledString).should.equal(theString);
      });
      
      it('splits into array', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         const theString = 'a string I am testing';
         const theStyledString = 'a \033[1;31mstring I am \033[1;34mtesting';
         ansi.toArray(theStyledString).join('').should.equal(theString);
      });
      
      it('clear resolves correctly', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         ansi.clear().should.equal('\033[0m');
      });
      
      it('charAt refers to the correct indices', ()=>{
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         const theString = 'a string I am testing';
         const theStyledString = 'a \033[1;31mstring I am \033[1;34mtesting';
         theString.split('').forEach((char, index)=>{
            ansi.charAt(theStyledString, index).should.equal(char);
         });
      });
   }
    
   describe('tests a 4bit context', ()=>{
      testContext('4bit');
   });
    
   describe('tests an 8bit context', ()=>{
      testContext('8bit');
   });
   
   describe('tests a 32bit context', ()=>{
      testContext('32bit');
   });
   
   describe('grid works correctly', ()=>{
      it('builds and modifies a grid', ()=>{
         const startState = 
` | | 
-+-+-
 | | 
-+-+-
 | | `;
         const bitDepth = '4bit';
         const ansi = new Ansi(new AnsiColor.Color(bitDepth));
         const grid = new Grid(startState, {bitDepth});
         grid.setValue(0, 0, 'X');
         grid.setValue(2, 2, 'O');
         grid.setValue(4, 4, 'X');
         grid.setValue(4, 0, 'O');
         grid.setValue(0, 4, 'X');
         grid.setValue(0, 2, 'O');
         grid.setValue(2, 4, 'X');
         grid.setValue(2, 4, 'X̶'+ansi.clear(), ['red']);
         grid.setValue(0, 4, 'X̶'+ansi.clear(), ['red']);
         grid.setValue(4, 4, 'X̶'+ansi.clear(), ['red']);
         grid.toString().should.equal(
            'X| |O\033[0m\n'+
            '-+-+-\033[0m\n'+
            'O|O| \033[0m\n'+
            '-+-+-\033[0m\n'+
            '\033[31mX̶\033[0m|\033[31mX̶\033[0m|\033[31mX̶\033[0m\033[0m\n'
         );
      });
   });
});
