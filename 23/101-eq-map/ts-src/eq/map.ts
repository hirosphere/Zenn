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
	
		wheelMon = new Leaf.String( "wheel" );
		wheelZoom : number;
		wheelCenter : LatLong;
	
		constructor()
		{
			const rel = () => this.update();
	
			this.zoom  = new Leaf.Number( 5, { rel } );
			this.center = new Leaf < LatLong > ( { lat: 36.0, long: 139.0 }, { rel } );
			this.current.ref( ( newItem, oldItem ) => this.updateCurrent( newItem, oldItem ) );
	
			rel();
	
			//
	
			this.hover.ref( ( site ) => this.hoverInfo.value = site ? `${ site.code } ${ site.name } ${ site.nameR }` : "" );
			this.wheelZoom = this.zoom.value;
			this.wheelCenter = this.center.value;
		}
	
		update()
		{
			const scale = this.scale;
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
	
		putWheelEvent( ev : WheelEvent )
		{
			const mode : "scroll" | "zoom" = ( ev.deltaY % 1  ? "zoom" : "scroll" )
			this.wheelMon.value = `${ ev.deltaX } ${ ev.deltaY } ${ mode }`;
	
			if( mode == "zoom" )
			{
				const zoom = this.wheelZoom + ev.deltaY * -0.1;
				this.wheelZoom = Math.min( 10, Math.max( 0, zoom ) );
				this.zoom.value = Math.round( this.wheelZoom );
			}
	
			else // mode == "scroll"
			{
				const center = this.center.value;
				const scale = 0.01 / this.scale;
	
				const long = clip
				(
					center.long + ev.deltaX * scale,
					this.long.min,
					this.long.max
				);
				
				const lat = clip
				(
					center.lat - ev.deltaY * scale,
					this.lat.min,
					this.lat.max
				);
	
				this.center.value = { lat, long };
			}
			ev.preventDefault();
		}
	
		cssPos( site : Site )
		{
			const left = this.longToPx( site.long ) + "px";
			const top = this.latToPx( site.lat ) + "px";
			return { left, top };
		}
	
		latToPx( lat : number ) { return ( this.lat.max - lat ) * pxRatio; }
		longToPx( long : number ) { return ( long - this.long.min ) * pxRatio; }
	
		get scale() { return 0.1 * Math.pow( 10, this.zoom.value / 5 ); }
	}

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
			styles: { left, top },
			onmouseover( ev : MouseEvent )
			{
				map.hover.value = site;
			},
			onclick()
			{
				map.current.value = site;
			}
		};

		return div( props );
	};

	const MapFrame = ( model : Model.Map ) =>
	{
		const onwheel = ( ev : WheelEvent ) => model.putWheelEvent( ev );
	
		const content = div
		(
			{ class: "map-content", styles: { transform: model.scrollCSS } },
			... Model.Site.list.map( siteInfo => Site( siteInfo, model ) )
		);
	
		const zoomFrame = div( { class: "map-zoom", styles: { transform: model.zoomCSS } }, content );
	
		return div( { class: "map-frame", onwheel }, div(), div(), div(), zoomFrame );
	};
	
	export const Map = () =>
	{
		const model = new Model.Map;
	
		return div( { class: "Map" },
			h2( "EQ Site Map" ),
			div( { class: "map-cur-site" }, model.current.str( { toref: site => site && `${ site.code } ${ site.name } ${ site.nameR }` || "" } ) ),
			MapFrame( model ),
			div( { class: "hover-info" }, model.hoverInfo ),
			div( Range.UI( { title: "拡大", value: model.zoom, max: 10 } ) ),
			div( model.wheelMon ),
		);
	}
}

export const Map = UI.Map;
