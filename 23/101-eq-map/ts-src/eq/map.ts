import { Leaf, leaf, ef } from "../meh/index.js";
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
		current = new Leaf < Site | null > ( null );
		zoom : Leaf.Number;
		center : Leaf < LatLong >;
		lat = { max: 45.5132, min: 24.3413 };
		long = { max: 145.8026, min: 123.7798 };
	
		scrollCSS = leaf.string( "" );
		zoomCSS = leaf.string( "" );
	
		//
	
		hover = new Leaf < Site | null > ( null );
		hoverInfo = new Leaf.String( "" );
	
		constructor()
		{
			const rel = () => this.update();
	
			this.zoom  = new Leaf.Number( 5, { rel } );
			this.center = new Leaf < LatLong > ( { lat: 36.0, long: 139.0 }, { rel } );
			this.current.ref( ( newItem, oldItem ) => this.updateCurrent( newItem, oldItem ) );			
			rel();
	
			this.hover.ref( ( site ) => this.hoverInfo.value = site ? `${ site.code } ${ site.name } ${ site.nameR }` : "" );
		}
	
		update()
		{
			const scale = this.zoomScale;
			const tlx = - this.longToPx( this.center.value.long ) + "px";
			const tly = - this.latToPx( this.center.value.lat ) + "px";
	
			this.scrollCSS.value = `translate( ${ tlx }, ${ tly } )`;
			this.zoomCSS.value = `scale( ${ scale }, ${ scale } )`;
		}
	
		updateCurrent( newItem : Site | null, oldItem ? : Site | null )
		{
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

		static list = sitepub.split( "\n" ).map( csv => new Site( csv ) );
	};

	log( "sitecount", Site.list.length )
}


// UI //

namespace UI
{
	const { div, h2, h3, } = ef;

	const Site = ( site : Model.Site, map : Model.Map ) =>
	{
		const { left, top } = map.cssPos( site );

		const props =
		{
			class: [ "map-site", { selected: site.selected } ],
			style: { left, top },
			onmouseover( ev : MouseEvent )
			{
				map.hover.value = site;
			},
			onclick()
			{
				map.current.value = site;
			},
		};

		return div( props );
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
			this.wheelMon.value = `${ mode } ${ ev.deltaX } ${ ev.deltaY }`;
	
			if( mode == "zoom" )
			{
				const zoom = this.wheelZoom + ev.deltaY * -0.1;
				this.wheelZoom = Math.min( 10, Math.max( 0, zoom ) );
				this.map.zoom.value = Math.round( this.wheelZoom );
			}
	
			else // mode == "scroll"
			{
				const center = this.map.center.value;
				const scale = 0.01 / this.map.zoomScale;
	
				const long = clip
				(
					center.long + ev.deltaX * scale,
					this.map.long.min,
					this.map.long.max
				);
				
				const lat = clip
				(
					center.lat - ev.deltaY * scale,
					this.map.lat.min,
					this.map.lat.max
				);
	
				this.map.center.value = { lat, long };
			}
			ev.preventDefault();
		}
	
		putTouchEvent( ev : TouchEvent )
		{
			this.touchMon.value = `${ ev.touches.length } ${ ev.touches[ 0 ]?.clientX }`;

			if( ev.cancelable ) ev.preventDefault();
		}
	}

	const MapFrame = ( model : Model.Map, zoom_wk : ZoomWork ) =>
	{
		const onwheel = ( ev : WheelEvent ) => zoom_wk.putWheelEvent( ev );
		const ontouchmove = ( ev : TouchEvent ) => zoom_wk.putTouchEvent( ev );
	
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
	
		return div
		(
			{ class: "map-frame", onwheel, ontouchmove },

			div(),
			div(),
			div(),
			zoomFrame
		);
	};
	
	export const Map = () =>
	{
		const model = new Model.Map;
		const zoom_wk = new ZoomWork( model );

		const curtext = model.current.tostr
		(
			site => site && `${ site.code } ${ site.name } ${ site.nameR }` || ""
		);

		return div( { class: "map applet" },
			
			h2( "EQ Site Map" ),

			div( { class: "map-cur-site" }, curtext ),
			MapFrame( model, zoom_wk ),
			div( { class: "hover-info" }, model.hoverInfo ),
			div( Range.UI( { title: "拡大", value: model.zoom, max: 10 } ) ),
			
			div( "Wheel", " ", zoom_wk.wheelMon ),
			div( "Touch", " ", zoom_wk.touchMon ),
		
		);
	}
}

export const Map = UI.Map;
