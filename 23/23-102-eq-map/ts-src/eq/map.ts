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
			
			log( "hoverList", this.hoverList.length )
		}
	
		updateCurrent( newItem : Site | null, oldItem ? : Site | null )
		{
			this.currentInfo.value = Site.info( newItem );

			log( { new: newItem?.code, old: oldItem?.code } );
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

namespace UI
{
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
					mouseover()
					{
						map.hover.value = site;
					},
					click()
					{
						map.current.value = site;
					},	
				}	
			}
		);
	};

	//

	class ZoomWork
	{
		wheelMon = new Leaf.String( "" );
		wheelZoom : number;

		touchMon = new Leaf.String( "" );

		constructor( protected map : Model.Map )
		{
			this.wheelZoom = map.zoom.value;
		}

		putWheelEvent( ev : WheelEvent )
		{
			if( ! ev.cancelable ) return;

			const mode : "scroll" | "zoom" = ( ev.deltaY % 1  ? "zoom" : "scroll" )
			this.wheelMon.value = `${ mode } ${ ev.deltaX } ${ ev.deltaY } ${ ev.deltaY } ${ ev.deltaMode }`;
	
			if( mode == "zoom" )
			{
				const zoom = this.wheelZoom + ev.deltaY * -0.1;
				this.wheelZoom = Math.min( 10, Math.max( 0, zoom ) );
				this.map.zoom.value = Math.round( this.wheelZoom );
			}
	
			else // mode == "scroll"
				this.scroll( ev.deltaX, ev.deltaY );
			
			ev.preventDefault();
		}
	
		putTouchEvent( ev : TouchEvent )
		{
			const t0 = ev.touches[ 0 ];

			this.touchMon.value = `${ ev.touches.length } ${ t0.clientX } ${ t0.clientY }, ${ ev.target?.constructor.name } }`;

			if( ev.cancelable ) ev.preventDefault();
		}

		scroll( deltaX : number, deltaY : number )
		{
			const center = this.map.center.value;
			const scale = 0.01 / this.map.zoomScale;

			const long = clip
			(
				center.long + deltaX * scale,
				this.map.long.min,
				this.map.long.max
			);
			
			const lat = clip
			(
				center.lat - deltaY * scale,
				this.map.lat.min,
				this.map.lat.max
			);

			this.map.center.value = { lat, long };
		}
	}

	const MapFrame = ( model : Model.Map, zoom_wk : ZoomWork ) =>
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
	

		const wheel = ( ev : WheelEvent ) => zoom_wk.putWheelEvent( ev );
		const touchmove = ( ev : TouchEvent ) => zoom_wk.putTouchEvent( ev );
		const opt = { passive: false };
	
		return div
		(
			{
				class: "map-frame",
				optActs: { wheel: [ wheel, opt ], touchmove: [ touchmove, opt ] }
			},

			div(),
			div(),
			div(),
			zoomFrame
		);
	};
	
	export const Map = () =>
	{
		const model = new Model.Map;
		const lianMon = new Leaf.String( "" );
		const zoom_wk = new ZoomWork( model );

		model.hoverList.ref
		(
			() =>
			{
				const lian = model.hoverList;
				const list = lian.slice( -130 ).map( site => `${ site.name }` );
				lianMon.value = "" + lian.length + " " + list.join( " ")
			}
		);

		return div( { class: "map applet" },
			
			h2( "EQ Site Map" ),

			div( { class: "map-cur-site" }, model.currentInfo ),
			MapFrame( model, zoom_wk ),
			div( { class: "hover-info" }, model.hoverInfo ),
			div( Range.UI( { title: "拡大", value: model.zoom, max: 10 } ) ),
			
			div( "Wheel", " ", zoom_wk.wheelMon ),
			div( "Touch", " ", zoom_wk.touchMon ),
		
			h3( "ホバー履歴" ),
			div( defs.ap( model.hoverList, item => span( item.code, " " ) ) ),
			textarea( { props: { value: lianMon }, style: { width: "100%", height: "20em", lineHeight: "1.4em" } } ),
		);
	}
}

export const Map = UI.Map;
