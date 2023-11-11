/* 
	DOMエレメント1層分のchildNodesを管理。
	
	「LitParts」は リテラルなDOMノード定義データ( def : defs.Element | defs.Text )からDOMノードを生成。
	
	「FuncParts」は ( def : { source: Array, create: ( item ) => Element | Text } ) として与えられた定義から、DOMノード定義を生成。
	さらにアレイモデルがLianであった場合は、挿入・削除・移動などその構造変化を動的に反映。

	それぞれのPartsは正確には「PartsFragment 要素連の断片」で、next値で後方へ連結。

	これにより
		実値パーツフラグメントと関数パーツフラグメントの同居
		ArrayPartsが動的に要素を追加する時に必要な、後方ノードオブジェクトの提供
	などを実現。

	先頭Partsのdelete()ですべてのchildNodesを破棄・解放。

*/



import { defs } from "./defs.js";
import { Nodette } from "./nodette.js";
import { Lian } from "../model/lian.js";

const log = console.log;

//  //

export abstract class Parts
{
	public static create( nodet : Nodette, def : defs.Parts ) : Parts
	{
		return createParts( nodet, def, 0 );
	}

	protected readonly  partNodets = new Array < Nodette >;

	public abstract get firstnode() : Node | undefined ;
	public next ? : Parts;
	public abstract delete() : void ;
}

//  //

export const createParts = ( nodet : Nodette, def : defs.Parts, index : number ) : Parts =>
{
	let parts : Parts;

	//	partdef の内容により 即値フラグメント / 関数フラグメントのいずれかを作成し、 

		//	関数フラグメント作成

	const partdef = def[ index ];
	if( partdef instanceof defs.ArrayParts )
	{
		index ++;
		parts = new FuncParts( partdef, nodet );
	}
	
		//	即値フラグメント作成

	else
	{
		// 即値パート(Element|Text)定義の連続をflagdefとして取り出す。

		const flagdef : defs.Node[] = [];

		while( index < def.length )
		{
			const partdef = def[ index ];
			if( partdef instanceof defs.ArrayParts ) break;
			partdef != null && flagdef.push( partdef );
			index ++;
		}

		parts = new LitParts( nodet, flagdef, index );	// 
	}

	// .  後方フラグメントを作成。
	
	if( index < def.length ) {
		parts.next = createParts( nodet, def, index );
	}
	
	return parts;
};


class LitParts extends Parts
{
	constructor( private nodet : Nodette, def : defs.Node [], index : number )
	{
		super();
		def.forEach( def => this.createPartNodet( def ) );
		this._firstnodet = this.partNodets[ 0 ];
	}

	createPartNodet( def : defs.Node ) : void
	{
		const part = new Nodette( def, this.nodet.element );
		this.partNodets.push( part );
	}

	public get firstnode() : Node | undefined
	{
		return this._firstnodet?.node || this.next?.firstnode;
	}
	
	private _firstnodet ? : Nodette;

	delete()
	{
		this.next?.delete();
	}
}


class FuncParts extends Parts
{
	constructor( protected def : defs.ArrayParts < any >, private nodet : Nodette )
	{
		super();
		
		if( def.source instanceof Lian ) def.source.ref( this );
		else this.add( 0, def.source.length );
	}

	// Lian Ref オペレーション //

	add( start : number, count : number )
	{
		const partmodels = this.def.source.slice( start, start + count );
		const nextnode = this.partNodets[ start ]?.node || this.next?.firstnode;
		const nodets = partmodels.map
		(
			partmodel => this.createPart( partmodel, nextnode )
		);
		this.partNodets.splice( start, 0, ... nodets );
	}
	

	remove( start : number, count : number )
	{
		const rem = this.partNodets.splice( start, count );
		rem.forEach( nodet => nodet.delete() );
	}

	//  //

	protected createPart( model : any, nextNode ? : Node ) : Nodette
	{
		const partdef = this.def.create( model );
		return new Nodette( partdef, this.nodet.element, nextNode );
	}

	get firstnode() : Node | undefined
	{
		return this.partNodets.length && this.partNodets[ 0 ].node || this.next?.firstnode;
	}

	public delete()
	{
		this.next?.delete();
	}
}
