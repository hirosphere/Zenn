import { leaf , ksel , dom , ef , log } from "../meh/index.js"

namespace VM
{
	export class App
	{
		phase = ksel ( 0 ) ;
		iid = 0 ;

		clk ()
		{
			const l = this.phase.current ;
			l.value = ( l.value + 1 ) % 10 ;
		}

		play ()
		{
			if ( ! this.iid )
			{
				this.iid = setInterval ( () => this.clk () , 1000 / 8 );
			}
			else
			{
				clearInterval ( this.iid ) ;
				this.iid = 0 ;
			}
		}
	}
}

namespace VC
{
	export const App = ( vm : VM.App ) =>
	{
		const lamps = [] ;

		for ( let i = 0 ; i < 10 ; i ++ )  lamps.push ( Lamp ( vm.phase , i ) )

		return ef.article
		(
			ef.h1 ( "4017" ),
			ef.section
			(
				{ class : "fl-bar" } ,
				ef.button ( { acts : { click () { vm.clk () ; } } } , "CLK" ) ,
				ef.button ( { acts : { click () { vm.play () ; } } } , "Play" ) ,
			) ,
			ef.section ( { class : "fl-bar" } , ... lamps ) ,
		);
	}

	const Lamp = ( current : ksel < number > , key : number ) =>
	{
		const active = current.make_item ( key ) ;
		return ef.span ( { class : [ "lamp" , { active } ] } , "●" )
	}
}


export const main = () =>
{
	dom.add ( VC.App ( new VM.App ) , "body" ) ;
}
