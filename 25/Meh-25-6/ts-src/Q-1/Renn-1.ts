import { Leaf , leaf , Renn , ef , DOM , DD , pl , log } from "../Meh/Meh.js" ;


namespace VM
{
	export type Quest =
	{
		opers : Oper [] ;
		refMon : Leaf < string > ;
		ordersMon : Leaf < string > ;
	}

	export type Oper = { title : string , exec : () => void } ;
}

namespace VM.Quest1
{
	export const refMon = leaf ( "ref" ) ;
	export const ordersMon = leaf ( "orders" ) ;
	export const contentPlace = pl.free () ;

	export const opers : VM.Oper [] =
	[
		{ title : "先頭に追加", exec : () => renn.insert ( [ "上野" , "日暮里" , "三河島" , "南千住" , "北千住" ] , 0 ) } ,
		{ title : "[10<15]に追加", exec : () => renn.insert ( [ "秋葉原" , "浅草橋" , "両国" , "錦糸町" , "亀戸" ] , 10 ) } ,
		{ title : "末尾に追加", exec : () => renn.insert ( [ "品川" , "大崎" , "五反田" , "目黒" , "恵比寿" ] ) } ,
		{ title : "先頭を削除" , exec : () => renn.delete ( 0 ) } ,
		{ title : "[10<15]を削除" , exec : () => renn.delete ( 10 , 15 ) } ,
		{ title : "[20<10]を削除" , exec : () => renn.delete ( 20 , 10 ) } ,
		{ title : "末尾を削除" , exec : () => renn.delete () } ,
		{ title : "すべて削除" , exec : () => renn.clear () } ,
	] ;

	const renn = new Renn < string > ;

	renn.addRef
	({
		insert( { start , next , orders } )
		{
			const ords = ostos ( orders ) ;
			refMon.$ = `insert ${ start }<${ next } , ${ ords }`;

			updateOrdersMon () ;
		},
		delete ( { start , next , orders } )
		{
			refMon.$ = `delete ${ start }<${ next }`;

			updateOrdersMon () ;
		}
	}) ;

	const ostos = ( os : Renn.Order < string > [] ) : string => os.map ( o => otos ( o ) ) .join ( " / " )
	const otos = ( o : Renn.Order < string > ) : string =>  `${ o.$ } ${ o.target }` ;

	const updateOrdersMon = () =>
	{
		ordersMon.$ = ostos ( renn .orders ) ;
		contentPlace.contents = renn.orders.map
		(
			o => ef.span ( o.target )
		) ;
	}
}

namespace VC
{
	export const Monitors = () =>
	[
		Quest ( VM.Quest1 ) ,
	]

	export const Quest = ( vm : VM.Quest ) =>
	{
		const fr = DOM ;

		const buttons : DD.Part [] =	vm.opers.map
		(
			q => ef.button
			(
				{ passive : { click () { q.exec () } } } ,
				q.title
			)
		) ;


		return ef.article
		(
			{ class : "FV PGXX" } ,
			ef.h2 ( "Monitor" ) ,
			ef.section ( { class : "FH JC PX GX FWR" } , ... buttons ) ,
			ef.section ( { class : "PX" } , vm.refMon ) ,
			ef.section ( { class : "PX" } , vm.ordersMon ) ,
		)
	}
}

DOM.add ( VC.Monitors () , "#Monitors" )
