import { Exist, log } from "../../meh/index.js";
import * as navi from "./um.navi.js";
import mapsrc from "../map/danchi.js";

export class App extends Exist
{
	constructor( con : Exist.Container )
	{
		super( con );
		
		const danchi = new navi.Danchi( this, mapsrc );
	
		const index = this.make_index( danchi );
		navi.browser.index.value = index;
	}

	make_index( danchi : navi.Danchi ) : navi.Room
	{
		const params = new URLSearchParams( location.search );
	
		const roompath = params.get( "room" ) ?? "";
		const room = danchi.rooms[ roompath ];
	
		log( "room", roompath, room?.title.v );

		return room ?? danchi ;

	
	};
}
