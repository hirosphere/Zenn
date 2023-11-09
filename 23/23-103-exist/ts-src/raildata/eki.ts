import { lines as src1 } from "./data1.js";
const log = console.log;
type tsv = string;

export class Line
{
	public readonly stations : Station[];

	constructor( public readonly name : string )
	{
		this.stations = ( src1[ name ] ?? [] )
			.split( "\n" )
			.map( ( stat_tsv, pos ) => new Station( name, pos, stat_tsv ) )
		;
	}
}

export class Station
{
	private src;

	constructor(
		public readonly line : string,
		public readonly pos : number,
		protected tsv : string )
	{
		this.src = tsv.split( "\t" );
	}

	public get name() { return this.src[ 0 ] }
	public get long() { return this.src[ 1 ] }
	public get lat() { return this.src[ 2 ] }
	public get postal() { return this.src[ 3 ] }
}

//  //

export const lines : Record < string, Line > = {};

const cv = ( [ name, src ] : [ name : string, src : tsv ] ) =>
{
	lines[ name ] = new Line( name );
}

Object.entries( src1 ).forEach( cv );
