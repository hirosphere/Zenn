import { Life , State , Leaf , Branch , leaf , Renn , ef , pl , DD , DOM , log } from "../Meh/Meh.js" ;
import { Eki } from "../API/Eki.js" ;

namespace VM
{
	export class Applet
	{
		public root = new Node ( { title : "首都圏" , parts : lines } ) ;
	}

	const eki = Eki () ;

	const lines : node [] =
	[
		{ title : "西武池袋線" , parts : ["池袋","椎名町","東長崎","江古田","桜台","練馬","中村橋","富士見台","練馬高野台","石神井公園","大泉学園","保谷","ひばりヶ丘","東久留米","清瀬","秋津","所沢","西所沢","小手指","狭山ヶ丘","武蔵藤沢","稲荷山公園","入間市","仏子","元加治","飯能","東飯能","高麗","武蔵横手","東吾野","吾野"].map ( title => ({ title }) ) } ,
		{ title : "東武伊勢崎線" , parts : ["浅草","とうきょうスカイツリー","押上","曳舟","東向島","鐘ヶ淵","堀切","牛田","北千住","小菅","五反野","梅島","西新井","竹ノ塚","谷塚","草加","獨協大学前","新田","蒲生","新越谷","越谷","北越谷","大袋","せんげん台","武里","一ノ割","春日部","北春日部","姫宮","東武動物公園","和戸","久喜","鷲宮","花崎","加須","南羽生","羽生","川俣","茂林寺前","館林","多々良","県","福居","東武和泉","足利市","野州山辺","韮川","太田","細谷","木崎","世良田","境町","剛志","新伊勢崎","伊勢崎"].map ( title => ({ title }) ) } ,
		{ title : "Eki" , parts : [] }
	] ;

	export type node =
	{
		title : string ;
		parts ? : node [] ;
	}

	export class Node extends Life
	{
		public title : Leaf < string > ;
		public parts = new Nodes ;

		constructor ( iv : node )
		{
			super () ;
			this.title = leaf ( iv.title ) ;
			iv.parts && this.parts.insert ( iv.parts.map ( iv => new Node ( iv ) ) ) ;
		}
	}

	export class Nodes extends Renn < Node > {}
}




namespace VC
{
	export const Applet = ( vm : VM.Applet ) => ef.main
	(
		{ class : "FV PGMM" } ,
		ef.h1 ( "Renn-2" ) ,
		ef.p ( "動的更新の確認" ) ,
		Node ( vm.root ) ,
	) ;

	const Nodes = ( vm : VM.Nodes ) : DD.Node =>
	{
		return ef.ul
		(
			{ class : "NODES" } ,
			... vm.orders.map ( o => Node ( o.target ) )
		) ;
	}

	const Node = ( vm : VM.Node ) : DD.Node =>
	{
		const keydown = ( ev : KeyboardEvent ) =>
		{
			log ( "key" , ev.key , ev.shiftKey , ev.ctrlKey , ev.altKey ) ;

			switch ( ev.key )
			{
				case " " :  console.clear () ;  break ;
				default : return ;
			}
		} ;

		const click = ( ev : MouseEvent ) =>
		{
			log ( "click" , ev.buttons ) ;
		} ;

		return ef.li
		(
			{ class : "NODE" } ,
			ef.span
			(
				{ class : "items" } ,
				ef.button ( { active : { keydown , click } } , "+" ) ,
				vm.title
			) ,
			Nodes ( vm.parts ) ,
		)
	}
}

DOM.add ( VC.Applet ( new VM.Applet ) , "body" , "footer" )
