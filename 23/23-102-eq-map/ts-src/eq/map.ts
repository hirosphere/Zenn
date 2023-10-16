import { Leaf, leaf, ef, Lian, defs } from "../meh/index.js";
import { sitepub } from "./sitepub_all_utf8.js";
import { Range } from "../range.js";
const log = console.log;

const clip = ( value : number, min : number, max : number ) => Math.max( min, Math.min( max, value ) );

type LatLong = { lat : number, long : number };
const pxRatio = 100;

// Model //

namespace Model
{
	export class Map
	{
		// パラメータ //

		current = new Leaf < Site | null > ( null );
		zoom : Leaf.Number;
		center : Leaf < LatLong >;

		//  //
		
		hover = new Leaf < Site | null > ( null );
		hoverInfo = new Leaf.String( "" );
		currentInfo = new Leaf.String( "" );

		hoverList = new Lian < Site > ;
		currentList = new Lian < Site > ;
		
		scrollCSS = leaf.string( "" );
		zoomCSS = leaf.string( "" );
		
		// 固定値 //

		lat = { max: 45.5132, min: 24.3413 };
		long = { max: 145.8026, min: 123.7798 };


		//  //
	
		constructor()
		{
			const rel = () => this.update();
	
			this.zoom  = new Leaf.Number( 5, { rel } );
			this.center = new Leaf < LatLong > ( { lat: 36.0, long: 139.0 }, { rel } );
			
			this.hover.ref( () => this.updateHover() );
			this.current.ref( ( newItem, oldItem ) => this.updateCurrent( newItem, oldItem ) );

			this.hoverList.add( Site.list[ 555 ] );
			this.hoverList.add( Site.list[ 777 ] );
			
			rel();
		}
	
		update()
		{
			const scale = this.zoomScale;
			const tlx = - this.longToPx( this.center.value.long ) + "px";
			const tly = - this.latToPx( this.center.value.lat ) + "px";
	
			this.scrollCSS.value = `translate( ${ tlx }, ${ tly } )`;
			this.zoomCSS.value = `scale( ${ scale }, ${ scale } )`;
		}

		updateHover()
		{
			const site = this.hover.value;
			this.hoverInfo.value = Site.info( site );
			site && this.hoverList.add( site );
		}
	
		updateCurrent( newItem : Site | null, oldItem ? : Site | null )
		{
			this.currentInfo.value = Site.info( newItem );

			oldItem && ( oldItem.selected.value = false );
			newItem && ( newItem.selected.value = true );
		}
	
		cssPos( site : Site )
		{
			const left = this.longToPx( site.long ) + "px";
			const top = this.latToPx( site.lat ) + "px";
			return { left, top };
		}
	
		latToPx( lat : number ) { return ( this.lat.max - lat ) * pxRatio; }
		longToPx( long : number ) { return ( long - this.long.min ) * pxRatio; }
	
		get zoomScale() { return 0.1 * Math.pow( 10, this.zoom.value / 5 ); }
	}

	//

	export class Site
	{
		src : string[];
		selected = leaf.boolean( false );

		constructor( src : string )
		{
			this.src = src.split( "," );
		}

		get code() : string { return this.src[ 0 ]; }
		get name() : string { return this.src[ 1 ]; }
		get nameR() : string { return this.src[ 2 ]; }
		get lat() : number { return Number( this.src[ 3 ] ); }
		get long() : number { return Number( this.src[ 4 ] ); }
		get elev() : number { return Number( this.src[ 5 ] ); }
		get depth() : number { return Number( this.src[ 6 ] ); }

		static info( site : Site | null ) : string
		{
			return site &&  `${ site.code } ${ site.name } ${ site.nameR }`  || "-"
		}

		static list = sitepub.split( "\n" ).map( csv => new Site( csv ) );
	};

	log( "sitecount", Site.list.length )
}


// UI //

// . site . //
const { div, h2, h3, textarea, p, span } = ef;

const Site = ( site : Model.Site, map : Model.Map ) =>
{
	const { left, top } = map.cssPos( site );

	return div
	(
		{
			class: [ "map-site", { selected: site.selected } ],
			style: { left, top },
			attrs: { selected: site.selected },
			acts:
			{
				mouseover() { map.hover.value = site; },
				mousedown() { map.current.value = site; },
			},
			actActs:
			{
				touchstart( ev ) { map.current.value = site;  ev.preventDefault(); }
			}
		}
	);
};

// . frame . //

// .. zoom scroll work .. //

type ScrMode = "none" | "mouse" | "touch";

class ScrollWork
{
	// scroll //

	recx ? : number ;
	recy ? : number ;
	srcmode : ScrMode = "none" ;

	touchMon = new Leaf.String( "" );
	mousemon = new Leaf.String( "" );
	docmousemon = new Leaf.String( "" );

	constructor( protected map : Model.Map )
	{
		this.wheelzoom = map.zoom.value;

		document.addEventListener
		(
			"mousemove",
			ev =>
			{
				this.docmousemove( ev );
				this.docmousemon.value = `move ${ ev.screenX } ${ ev.screenY } ${ ev.buttons }`
			}
		);
	}

	mon( name : string, x : number, y : number )
	{
		this.mousemon.value = `${ name } ${ x } ${ y }`;
	}

	mousedown = ( ev : MouseEvent ) =>
	{
		if( ev.buttons & 1 )
		{
			this.recpos( ev.screenX, ev.screenY, ev );
			this.srcmode = "mouse";
		}
		this.mon( "down", ev.screenX, ev.screenY );
	};

	docmousemove = ( ev : MouseEvent ) =>
	{
		this.mon( "move", ev.screenX, ev.screenY );
		if( ! ( ev.buttons & 1 ) ) this.srcmode = "none";
		if( this.srcmode == "mouse" && ev.buttons & 1 )  this.scroll( ev.screenX, ev.screenY, ev );
	};

	mouseup = ( ev : MouseEvent ) =>
	{
		this.mon( "up  ", ev.screenX, ev.screenY );
	};

	touchstart = ( ev : TouchEvent ) =>
	{
		const t0 = ev.touches[ 0 ];
		this.recpos( t0.screenX, t0.screenY, ev );
		this.touchMon.value = `start ${ ev.touches.length } ${ t0.screenX } ${ t0.screenY } }`;
	};

	touchmove = ( ev : TouchEvent ) =>
	{
		const t0 = ev.touches[ 0 ];
		this.scroll( t0.screenX, t0.screenY, ev );
		this.touchMon.value = `move  ${ ev.touches.length } ${ t0.screenX } ${ t0.screenY } }`;
	};

	touchend = ( ev : TouchEvent ) =>
	{
		const t0 = ev.touches[ 0 ];
		this.touchMon.value = `end   ${ ev.touches.length } }`;
	};

	//  //

	recpos( screenX : number, screenY : number, ev : UIEvent )
	{
		this.recx = screenX;
		this.recy = screenY;
		ev.preventDefault();
	}

	scroll( screenX : number, screenY : number, ev : UIEvent )
	{
		const center = this.map.center.value;
		const scale = 0.01 / this.map.zoomScale;

		const deltaX = this.delta( screenX, this.recx );		
		const deltaY = this.delta( screenY, this.recy );

		this.recpos( screenX, screenY, ev );

		const long = clip
		(
			center.long - deltaX * scale,
			this.map.long.min,
			this.map.long.max
		);
		
		const lat = clip
		(
			center.lat + deltaY * scale,
			this.map.lat.min,
			this.map.lat.max
		);

		this.map.center.value = { lat, long };
	}

	delta( mouse : number, rec ? : number ) : number
	{
		return rec != null ? ( mouse - rec ) : 0;
	}

	// zoom //

	wheelzoom : number ;

	wheelMon = new Leaf.String( "" );

	wheel = ( ev : WheelEvent ) =>
	{
		this.wheelMon.value = `${ ev.deltaX } ${ ev.deltaY }`;

		const zoom = this.wheelzoom + ev.deltaY * -0.05;
		this.wheelzoom = Math.min( 10, Math.max( 0, zoom ) );
		this.map.zoom.value = Math.round( this.wheelzoom );

		ev.preventDefault();
	};
}

// .. ui .. //

const MapFrame = ( model : Model.Map, scrzoom : ScrollWork ) =>
{
	const content = div
	(
		{
			class: "map-content",
			style: { transform: model.scrollCSS }
		},

		... Model.Site.list.map( siteInfo => Site( siteInfo, model ) )
	);

	const zoomFrame = div
	(
		{
			class: "map-zoom",
			style: { transform: model.zoomCSS }
		},
		
		content
	);


	const { mousedown, mouseup, touchstart, touchmove, touchend, wheel } = scrzoom;

	return div
	(
		{
			class: "map-frame",
			acts: { mouseup, touchmove, touchend },
			actActs: { wheel, mousedown, touchstart, },
		},

		div(),
		div(),
		div(),
		zoomFrame
	);
};


// main ui //

export const Map = () =>
{
	const model = new Model.Map;
	const lianMon = new Leaf.String( "" );
	const scrzoom = new ScrollWork( model );

	model.hoverList.ref
	(
		() =>
		{
			const lian = model.hoverList;
			const list = lian.slice( -130 ).map( site => `${ site.name }` );
			lianMon.value = "" + lian.length + " " + list.join( " ")
		}
	);

	return div
	(
		{ class: "map applet" },

		h2( "EQ Site Map" ),
		
		div
		(
			div( { class: "map-cur-site" }, model.currentInfo ),
			MapFrame( model, scrzoom ),
			div( { class: "hover-info" }, model.hoverInfo ),
			div( Range.UI( { title: "拡大", value: model.zoom, max: 10 } ) ),
		),

		div
		(
			div( "d.mouse", " ", scrzoom.docmousemon ),
			div( "mouse", " ", scrzoom.mousemon ),
			div( "touch", " ", scrzoom.touchMon ),
			div( "wheel", " ", scrzoom.wheelMon ),
		),

		div
		(
			h3( "ホバー履歴" ),
			div
			(
				//defs.ap( model.hoverList, item => { log( item.code ); return span( "span" ) } ),
				defs.ap( model.hoverList, item => item.name + " " ),
				defs.ap( [ 1, 2, 3 ], item => span( item ) ),
			),
			textarea
			(
				{ props: { value: lianMon }, style: { width: "100%", height: "20em", lineHeight: "1.4em" } }
			),
		),
	);
}
