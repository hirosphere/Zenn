import { Live, Renn, Key, ef, pl, times } from "../../../Meh/Meh.js";
import * as common from "../../Common.js";
import * as eki from "../../../API/EkiIndex.js";
var VM;
(function (VM) {
    VM.create_qst = () => {
        return new Navi(qst);
    };
    const qst_parts = () => Object.fromEntries(times(10, n => [`${n + 1}`, { title: `Item ${n + 1}` }]));
    const qst_dyn_parts = async () => qst_parts();
    const qst = {
        title: "Root",
        parts: qst_parts(),
    };
    /* Eki */
    VM.eki_navi = (datapath) => {
        return new Navi(new eki.root(datapath));
    };
    /* */
    class Navi {
        page = new Key(Live(undefined));
        navi = new Key(Live(undefined));
        path = new Path;
        root;
        constructor(i) {
            this.root = new Index(i, "", this, undefined);
            Live.add_ref(this.navi.key, { vChan: () => { this.path.index = this.navi.key.$; } });
            this.navi.key.$ = this.root;
            this.page.key.$ = this.root;
        }
        peerSelect(index) {
            this.navi.key.$ = index;
        }
    }
    VM.Navi = Navi;
    class Path extends Renn {
        set index(index) {
            this.clear();
            index && this.insert(index.path);
        }
    }
    VM.Path = Path;
    /* */
    class Index {
        i;
        name;
        navi;
        com;
        title;
        parts = new Renn;
        page_selected;
        navi_selected;
        partsmaked = false;
        constructor(i, name, navi, com) {
            this.i = i;
            this.name = name;
            this.navi = navi;
            this.com = com;
            this.title = Live(i.title);
            this.page_selected = navi.page.match(this);
            this.navi_selected = navi.navi.match(this);
            if (i.parts && typeof i.parts != "function") {
                const parts = Object.entries(i.parts).map(([name, i]) => new Index(i, name, navi, this));
                this.parts.insert(parts);
            }
        }
        part_select() {
            this.page_selected.select();
            this.navi_selected.select();
        }
        async make_dyn_parts() {
            if (this.partsmaked)
                return;
            if (typeof this.i.parts != "function")
                return;
            const parts = Object.entries(await this.i.parts()).map(([name, i]) => new Index(i, name, this.navi, this));
            this.parts.insert(parts);
            this.partsmaked = true;
        }
        /* */
        get path() {
            const rt = [];
            for (let i = this; i; i = i.com)
                rt.unshift(i);
            return rt;
        }
    }
    VM.Index = Index;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    VC.App = (datapath) => {
        //	const navi = VM.create_qst () ;
        const navi = VM.eki_navi(datapath);
        return ef.div({ shadow: [common.css, css] }, ef.div({ class: ["ROOT"] }, ef.aside({ class: "SIDE" }, Navi(navi)), pl.key(navi.page.key, index => index && Content(index))));
    };
    const Content = (index) => {
        return ef.main({
            class: "CONTENT",
            style: {
                display: Live.trans_r(index.page_selected, s => s ? "" : "none")
            }
        }, ef.h1({ class: "TC" }, index.title));
    };
    const Navi = (vm) => {
        return ef.nav({ class: "NAVI" }, Path(vm.path), Peers(vm));
    };
    const Path = (vm) => {
        return ef.ul({ class: "PATH" }, pl.each(vm, vm => ef.li(Index(vm, "path"))));
    };
    const Peers = (vm) => {
        return ef.div({ class: "PEER_FRAME" }, pl.key(vm.navi.key, index => index && Peer(index)));
    };
    const Peer = (vm) => {
        const display = Live.trans_r(vm.navi_selected, s => s ? "" : "none");
        vm.make_dyn_parts();
        return ef.div({ class: "PEER", style: { display } }, ef.ul(pl.each(vm.parts, vm => ef.li(Index(vm, "peer")))));
    };
    const Index = (vm, radioname) => {
        const click = (ev) => {
            vm.page_selected.select();
        };
        const keydown = (ev) => {
            switch (ev.key) {
                case " ":
                    vm.page_selected.select();
                    break;
                case "Enter":
                    vm.navi_selected.select();
                    break;
            }
        };
        return ef.section({ class: ["INDEX", { _SELECTED: vm.page_selected }] }, ef.div({ class: "_TITLE", passive: { click } }, vm.title), ef.div({ class: "_THUMB", passive: { click: () => vm.part_select() } }, ">"));
    };
    const css = /* CSS */ `

	.Q { border-left : 1ex solid black ; }

	:host
	{
		height : 100% ;
		color : hsl( 0  0%  30% ) ;
	}

	.ROOT
	{
		height : 100% ;
		display : grid ;
		grid-template-columns : auto  1fr ;

		overflow : hidden ;
		padding : 1ex ;
	}

	.SIDE
	{
		overflow : hidden ;

		height : 100% ;
		width : 245px ;
		background-color : hsl( 215  65%  100% ) ;

		display : flex ;
		flex-direction : column ;
	}

	.NAVI
	{
		overflow : hidden ;

		flex-grow : 1 ;
		cursor : default ;

		display : flex ;
		flex-direction : column ;

		padding-block : 1ex ;
		padding-inline : 1.0em  ;
		gap : 1em ;
	}

	.PATH
	{
		background : hsl( 210  60%  94% ) ;

		display : flex ;
		flex-direction : column ;

		list-style : none ;
		padding-left : 0 ;
	}

	.PEER_FRAME
	{
		overflow : hidden ;
		flex-grow : 1 ;
	}

	.PEER
	{
		height : 100% ;
		overflow : auto ;
		scrollbar-width : none ;
	}

	.PEER > ul
	{
		background : hsl( 180  60%  94% ) ;

		list-style : none ;
		padding-left : 0 ;
	}

	.INDEX
	{
		display : flex ;
		padding-inline : 0.5ex  0.5ex ;
		gap : 0.8ex ;
	}

	.INDEX._SELECTED
	{
		background : hsl( 0  0%  12% ) ;
		color : hsl( 0  0%  90% ) ;
	}

	.INDEX > ._TITLE
	{
		flex-grow : 1 ;
		padding-block : 1.2ex ;
		padding-inline : 1ex ;

		white-space : nowrap ;
		overflow : hidden ;
	}

	.NAVI  .INDEX > ._THUMB
	{
		font-family : monospace ;
		padding : 1.3ex 1.3ex ;
	}

	.INDEX > ._THUMB:hover
	{
		background : hsl( 0  0%  50% / 10% ) ;
	}

	.CONTENT
	{
		padding : 1ex ;
	}
	
	
	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL05hdmkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEdBQUcsRUFBUSxFQUFFLEVBQUcsRUFBRSxFQUFHLEtBQUssRUFBUSxNQUFNLHFCQUFxQixDQUFFO0FBQ3RGLE9BQU8sS0FBSyxNQUFNLE1BQU0saUJBQWlCLENBQUU7QUFDM0MsT0FBTyxLQUFLLEdBQUcsTUFBTSwwQkFBMEIsQ0FBRTtBQUVqRCxJQUFVLEVBQUUsQ0EySVg7QUEzSUQsV0FBVSxFQUFFO0lBRUUsYUFBVSxHQUFHLEdBQVUsRUFBRTtRQUVyQyxPQUFPLElBQUksSUFBSSxDQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQzFCLENBQUMsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLEdBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUV4RCxLQUFLLENBQUcsRUFBRSxFQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRSxHQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRyxFQUFFLEtBQUssRUFBRyxRQUFTLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRSxDQUFFLENBQUUsQ0FDcEUsQ0FBRTtJQUVILE1BQU0sYUFBYSxHQUFtQixLQUFLLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxDQUFFO0lBRWhFLE1BQU0sR0FBRyxHQUNUO1FBQ0MsS0FBSyxFQUFHLE1BQU07UUFDZCxLQUFLLEVBQUcsU0FBUyxFQUFHO0tBQ3BCLENBQUE7SUFFRCxTQUFTO0lBRUksV0FBUSxHQUFHLENBQUUsUUFBaUIsRUFBVSxFQUFFO1FBRXRELE9BQU8sSUFBSSxJQUFJLENBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFHLFFBQVEsQ0FBRSxDQUFFLENBQUU7SUFDaEQsQ0FBQyxDQUFBO0lBRUQsS0FBSztJQUVMLE1BQWEsSUFB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