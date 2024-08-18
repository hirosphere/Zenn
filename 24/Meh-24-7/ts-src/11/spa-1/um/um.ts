import { Exist, Leaf, root, log } from "../../../meh/index.js";
import * as types from "../m/types.js";
import sampledata from "../m/sample-data.js";

export class Application extends Exist
{
	constructor
	(
		com : Exist,
	)
	{
		super( com );
		this.初期データを設定( sampledata );
	}

	車両注文リスト : 車両注文 [] = [];

	初期データを設定( iv : types.車両注文 [] )
	{
		this.車両注文リスト = iv.map( iv => new 車両注文( this, iv ) );
	}

	号機工程情報を取得()
	{
		;
	}
}


export class 車両注文 extends Exist
{
	constructor
	(
		com : Exist,
		public readonly iv : types.車両注文,
	)
	{
		super( com );
		log( iv );
	}
}



export class 号機ビュー extends Exist
{
	constructor
	(
		com : Exist,
		protected readonly app : Application,
		public readonly 号機Id : types.号機Id,
	)
	{
		super( com );
	}
}

export class Tmpl extends Exist
{
	constructor
	(
		com : Exist,
	)
	{
		super( com );
	}
}
