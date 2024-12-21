import { leaf , dom , ef , log } from "../meh/index.js"

namespace VM
{
	export class App
	{
		list = leaf ( "" ) ;
		json = leaf ( "" ) ;

		async init ()
		{
			this.load () ;
			return this ;
		}

		async load ()
		{
			const res = await fetch( "https://www.jma.go.jp/bosai/quake/data/list.json" );
			if( res.status == 200 )
			{
				const data = await res.json();
	
				const list = data.map( ( i : any, n : number ) =>
				[
					String( n + 1 ),
					i.at.slice( 0, 19 ).replace( "T", " " ),
					i.anm,
					i.mag,
					i.maxi,
					i.cod
				]
				.join( "\t" ) ).join( "\n" );

				this.list.value = list ;
				this.json.value = JSON.stringify ( data , null , "  " )
			}
		}	
	}
}

namespace VC
{
	export const App = ( vm : VM.App ) =>
	{
		return ef.article
		(
			ef.h1 ( "地震リスト" ),
			ef.section
			(
				ef.textarea ( { props : { value : vm.list } } ) ,
				ef.textarea ( { props : { value : vm.json } } ) ,
			)
		);
	}
}


export const main = async () =>
{
	const vm = new VM.App ;
	dom.add ( VC.App ( await vm.init () ) , "body" ) ;
}
