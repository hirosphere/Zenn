import * as meh from "../js-a/meh/index.js";
const log = console.log;

meh.Leaf.String;

const arswap = ( ar, x, y ) =>
{
	const t = ar[ x ];
	ar[ x ] = ar[ y ];
	ar[ y ] = t;
} 

const arrand = ar => Math.floor( Math.random() * ar.length );

const rsort = ( ar ) =>
{
	ar.forEach( ( i, o ) => arswap( ar, o, arrand( ar ) ) );
}

const ar = [];
ar.copyWithin

log( "js-app" )
