import { leaf, ef ,df, each, dom, log } from "../../meh/index.js";
import * as link from "./link.js";
import { links } from "./link-data.js";

const App = () =>
{
	const clock = new ClockModel();

	return ef.main
	(
		ef.h1( clock.time ),
		ef.p ( clock.delay ) ,
		
		...links.map( i => link.Block( i ) ),
	);
};

class ClockModel
{
	time = leaf.str ( "" );
	iid = leaf.num ( 0 );
	delay = leaf.num ( 0 ) ;

	constructor()
	{
		this.update();

		const rem = new Date ().getTime () % 1000 ;
		setTimeout ( () => this.start (), 1000 - rem );
	}

	start ()
	{
		this.iid.value = setInterval ( () => this.update () , 1000 ) ;
		this.update () ;
	}

	update()
	{
		const date = new Date() ;
		this.time.value = df ( "Y/M/D (B) hh:mm:ss" , date ) ;
		this.delay.value = date.getMilliseconds() % 1000 ;
	}
}

namespace models
{
}

dom.add( App(), "body" )
