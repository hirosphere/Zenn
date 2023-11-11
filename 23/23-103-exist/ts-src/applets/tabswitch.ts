import { models as Mehm, Leaf, ef, each } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;
const { div, span, p, ul, li, select, option } = ef;

//  //

class PageContent
{
	readonly name;
	constructor( name : string )
	{
		this.name = new Leaf.String( name );
	}
}

//  //

export const TabSwitchApp = () =>
{
	const labels = [ "Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn" ];
	const sel : Mehm.Select < string > = Mehm.Select.fromLabels( labels );

	return Applet({
		title: "TabSwitch",
		content: [ Sel( sel, sel.root?.parts ),  Tabs( sel.root?.parts ) ]
	});
}

//  //

class Grazer
{
	public get isActive() { return this._isActive; }

	constructor()
	{
		document.addEventListener( "mouseup", () => { this._isActive = false; } );
	}

	protected _isActive = false;

	public start(){ this._isActive = true; }
}

// Tab|Tab|Tab //

const Tabs = ( opts ? : Mehm.Option < string > [] ) =>
{
	const gr = new Grazer();
	return ul( { class: "tabs" }, each( opts || [], opt => Tab( opt, gr ) ), );
}

const Tab = ( opt : Mehm.Option < string >, gr : Grazer ) =>
{
	return li( {
			class: [ "tab", { selected: opt.selected } ],
			actActs: {
				mousedown() { opt.select(); gr.start(); },
				mouseenter() { gr.isActive && opt.select(); },
				touchstart() { opt.select(); gr.start(); },
				touchmove() { gr.isActive && opt.select(); },
			}
		},
		opt.value
	);
};

// <select/> //

const Sel = ( sel : Mehm.Select, opts ? : Mehm.Option < string > [] ) =>
{
	const optio = ( i : Mehm.Option < string > ) => option( { attrs: { selected: i.selected }, }, i.value );

	return ef.select({
			acts: { input: ev => selectOption( sel, opts, ev ) }
		},
		ef.option( { attrs: { selected: true } }, "Null" ),
		each( opts || [], i => optio( i ) )
	);
}

const selectOption = ( sel : Mehm.Select, opts : Mehm.Option < any > [] | undefined, ev : Event ) : void =>
{
	if( ! ( ev.target instanceof HTMLSelectElement ) ) return;

	const i = ev.target.selectedIndex;
	
	i > 0 ?
		opts?.[ i - 1 ]?.select() :
		sel.setCurrent( null )
	;
};

//  //

const Contents = () =>
{
	;
}

