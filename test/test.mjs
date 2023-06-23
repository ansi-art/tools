/* global describe, it */
import { chai } from 'environment-safe-chai';
const should = chai.should();
import { Ansi, Grid } from '../tools.mjs';
import { Color } from '@ansi-art/color/color.mjs';

describe('tools', ()=>{
    describe('static tools', ()=>{
        it('tests for foreground colors', ()=>{
            Ansi.is.it.foregroundColor('foo').should.equal(false);
            Ansi.is.it.foregroundColor('38;5;57m ').should.equal(true);
            Ansi.is.it.foregroundColor('31;42m').should.equal(true);
            Ansi.is.it.foregroundColor('3m').should.equal(false);
        });
     
        it('tests for background colors', ()=>{
            Ansi.is.it.backgroundColor('foo').should.equal(false);
            Ansi.is.it.backgroundColor('48;5;57m ').should.equal(true);
            Ansi.is.it.backgroundColor('41;42m').should.equal(true);
            Ansi.is.it.backgroundColor('4m').should.equal(false);
        });
       
    });
    const testContext = function(bitDepth){
        const instance = new Ansi(new Color(bitDepth));
        const code = (theCode)=> instance.codeRender([theCode]);
        it('tests for correct lengths', ()=>{
            const ansi = new Ansi(new Color(bitDepth));
            should.exist(ansi);
            ansi.length('a non-ansi string').should.equal(17);
            ansi.length(`an ${code('1;31')}ansi string`).should.equal(14);
        });
       
        it('maps correctly', ()=>{
            const ansi = new Ansi(new Color(bitDepth));
            const theString = 'a string I am testing';
            const theStyledString = `a ${code('1;31')}string I am ${code('1;34')}testing`;
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
            const ansi = new Ansi(new Color(bitDepth));
            const theString = 'a string I am testing';
            const theStyledString = `a ${code('1;31')}string I am ${code('1;34')}testing`;
            ansi.strip(theStyledString).should.equal(theString);
        });
      
        it('splits into array', ()=>{
            const ansi = new Ansi(new Color(bitDepth));
            const theString = 'a string I am testing';
            const theStyledString = `a ${code('1;31')}string I am ${code('1;34')}testing`;
            ansi.toArray(theStyledString).join('').should.equal(theString);
        });
      
        it('clear resolves correctly', ()=>{
            const ansi = new Ansi(new Color(bitDepth));
            ansi.clear().should.equal(`${code('0')}`);
        });
      
        it('charAt refers to the correct indices', ()=>{
            const ansi = new Ansi(new Color(bitDepth));
            const theString = 'a string I am testing';
            const theStyledString = `a ${code('1;31')}string I am ${code('1;34')}testing`;
            theString.split('').forEach((char, index)=>{
                ansi.charAt(theStyledString, index).should.equal(char);
            });
        });
    };
    
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
            const ansi = new Ansi(new Color(bitDepth));
            const code = (theCode)=> ansi.codeRender([theCode]);
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
            const gridLines = grid.toString().split('\n');
            const solvedLines = (
                `X| |O${code('0')}\n`+
                `-+-+-${code('0')}\n`+
                `O|O| ${code('0')}\n`+
                `-+-+-${code('0')}\n`+
                `${code('31')}X̶${code('0')}|${code('31')}X̶${code('0')}|${code('31')}X̶${code('0')}${code('0')}\n`
            ).split('\n');
            gridLines.forEach((line, index)=>{
                gridLines[index].should.equal(solvedLines[index]);
            });
        });
    });
});
