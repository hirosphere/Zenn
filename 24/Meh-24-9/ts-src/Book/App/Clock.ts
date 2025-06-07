import { leaf , ef , df , log } from "../../meh/index.js" ;

class ClockModel
{
	datetime = leaf ( "" ) ;

	constructor ()
	{
		setInterval ( () => this.update () , 1000 ) ;
	}

	update ()
	{
		this.datetime.$ = df ( "Y-MM-DD (B) hh:mm:ss" ) ;
	}
}


export const Clock = () =>
{
	const vm = new ClockModel ;

	return ef.section
	(
		{
			class : "" ,
			style :
			{
				textAlign : "center" ,
				fontSize : "20px" ,
				fontFamily : "monospace" ,
			}
		},
		ef.span
		(
			vm.datetime
		)
	) ;
}
