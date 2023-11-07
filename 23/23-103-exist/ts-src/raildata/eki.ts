import { Lian } from "../meh/model/index.js";
import { lines as src1 } from "./data1.js";
const log = console.log;
type tsv = string;

export class Line
{
	public readonly stations = new Lian < Station > ;

	constructor( public readonly name : string )
	{
		const stationlist : Station[] = ( src1[ name ] ?? [] )
			.split( "\n" )
			.map( stat_tsv => new Station( stat_tsv ) )
		;

		this.stations.addItems( stationlist );
	}
}

export class Station extends Lian.Item
{
	private src;

	constructor( protected tsv : string )
	{
		super();
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
