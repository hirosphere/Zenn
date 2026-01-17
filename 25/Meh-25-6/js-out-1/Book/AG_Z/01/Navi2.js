import { Live, Renn, Key, ef, pl, times, log } from "../../../Meh/Meh.js";
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
        curr_page = new Key(Live(undefined));
        curr_peer = new Key(Live(undefined));
        path = new Path;
        root;
        constructor(i) {
            this.root = new Index(i, "", this, undefined);
            Live.add_ref(this.curr_peer.key, { vChan: () => { this.path.index = this.curr_peer.key.$?.com; } });
            this.curr_peer.key.$ = this.root;
            this.curr_page.key.$ = this.root;
        }
        peerSelect(index) {
            this.curr_peer.key.$ = index;
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
        page_match;
        navi_match;
        parts_maked = false;
        constructor(i, name, navi, com) {
            this.i = i;
            this.name = name;
            this.navi = navi;
            this.com = com;
            this.title = Live(i.title);
            this.page_match = navi.curr_page.match(this);
            this.navi_match = navi.curr_peer.match(this);
            if (i.parts && typeof i.parts != "function") {
                const parts = Object.entries(i.parts).map(([name, i]) => new Index(i, name, navi, this));
                this.parts.insert(parts);
            }
        }
        select() {
            this.page_match.select();
        }
        exit() {
            this.page_match.select();
            this.com?.navi_match.select();
        }
        move() {
            this.page_match.select();
            this.navi_match.select();
        }
        async make_dyn_parts() {
            if (this.parts_maked)
                return;
            if (typeof this.i.parts != "function")
                return;
            const parts = Object.entries(await this.i.parts()).map(([name, i]) => new Index(i, name, this.navi, this));
            this.parts.insert(parts);
            this.parts_maked = true;
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
        return ef.div({ shadow: [common.css, css] }, ef.div({ class: ["ROOT"] }, ef.aside({ class: "SIDE" }, Navi(navi)), pl.key(navi.curr_page.key, index => index && Content(index))));
    };
    const Content = (index) => {
        return ef.main({
            class: "CONTENT",
            style: {
                display: Live.trans_r(index.page_match, s => s ? "" : "none")
            }
        }, ef.p({ class: "TC", style: { fontSize: "24px", } }, index.title));
    };
    const Navi = (vm) => {
        return ef.nav({ class: "NAVI" }, Path(vm.path), PeerFrame(vm));
    };
    const Path = (vm) => {
        return ef.ul({ class: "PATH" }, pl.each(vm, vm => PathIndex(vm)));
    };
    const PathIndex = (vm) => ef.li({
        class: ["INDEX", { _SELECTED: vm.page_match ?? false }],
        passive: { click: () => vm.move() }
    }, ef.span({ class: "_TITLE" }, vm.title));
    const PeerFrame = (vm) => {
        return ef.div({ class: "PEER_FRAME" }, pl.key(vm.curr_peer.key, index => index && Peer(index)));
    };
    const Peer = (vm) => {
        const display = Live.trans_r(vm.navi_match, s => s ? "" : "none");
        vm.make_dyn_parts();
        return ef.section({ class: "PEER", style: { display } }, ef.div({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.h3({ class: "_TITLE", passive: { click: () => vm.select() } }, vm.title), vm.com && ef.span({ class: "_THUMB", passive: { click: () => vm.exit() } }, ef.span({ class: "_MK" }, "^"))), ef.ul(pl.each(vm.parts, vm => PeerIndex(vm))));
    };
    const PeerIndex = (vm) => {
        const hook = {
            init(el) {
                log("init", el.clientHeight);
            }
        };
        return ef.li({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.span({ class: "_TITLE", passive: { click: () => vm.select() }, hook }, vm.title), ef.span({ class: "_THUMB", passive: { click: () => vm.move() } }, ef.span({ class: "_MK" }, "v")));
    };
    /* Style */
    const css = /* CSS */ `

	:host
	{
		height : 100% ;
		color : hsl( 0  0%  10% ) ;

		font-family : Noto Sans JP ;
	}

	.ROOT
	{
		height : 100% ;
		display : grid ;
		grid-template-columns : auto  1fr ;

		overflow : hidden ;
		padding : 0ex ;
	}

	.SIDE
	{
		overflow : hidden ;

		height : 100% ;
		width : 250px ;
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

		display : grid ;
		grid-template-rows : auto  auto  1fr ;
		gap : 1ex ;
	}

	.PEER > hr { margin-block : 0.6ex ; }
	.PEER > h3 { overflow : hidden ; }
	.PEER > ul
	{
		overflow : auto ;
		scrollbar-width : none ;

		padding : 0 ;
		list-style : none ;
	}

	.INDEX._SELECTED
	{
		background : hsl( 0  0%  12% ) ;
		color : hsl( 0  0%  90% ) ;
	}

	.INDEX > ._TITLE
	{
		flex-grow : 1 ;

		white-space : nowrap ;
		overflow : hidden ;
	}

	.INDEX > ._THUMB
	{
		display : flex ;
		padding : 0.3ex  0.3ex ;
		align-items : stretch ;
	}

	.INDEX > ._THUMB > ._MK
	{
		background : hsl( 55  5%  95% / 80% ) ;
		padding-inline : 1.2ex ;

		display : flex ;
		align-items : center ;
		font-family : 'Consolas' , monospace ;
		color : hsl( 0  0%  40% ) ;

	}

	.PATH .INDEX
	{
		padding-block : 0.8ex ;
		text-align : center ;
	}

	.PATH ._TITLE
	{
		border-bottom : 1px  dotted  hsl( 0  0%  50% ) ;

		padding-block : 0.1ex ;
		padding-inline : 0.7ex ;
		text-align : center ;
	}

	.PATH ._TITLE > span
	{
	}

	.PEER .INDEX
	{
		border-bottom : 1px  dotted  hsl( 0  0%  50% ) ;

		display : flex ;
		gap : 0.1ex ;
	}

	.PEER ._TITLE
	{
		width : 6em ;

		padding-block : 1.10ex ;
		padding-inline : 1ex  0.7ex ;
		overflow : hidden ;
		
		white-space : nowrap ;
		text-overflow : ellipse ;
		text-align : center ;
	}

	.CONTENT
	{
		padding : 1ex ;
	}
	
	
	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL05hdmkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFHLEdBQUcsRUFBUSxFQUFFLEVBQUcsRUFBRSxFQUFHLEtBQUssRUFBRyxHQUFHLEVBQUUsTUFBTSxxQkFBcUIsQ0FBRTtBQUN0RixPQUFPLEtBQUssTUFBTSxNQUFNLGlCQUFpQixDQUFFO0FBQzNDLE9BQU8sS0FBSyxHQUFHLE1BQU0sMEJBQTBCLENBQUU7QUFFakQsSUFBVSxFQUFFLENBc0pYO0FBdEpELFdBQVUsRUFBRTtJQUVFLGFBQVUsR0FBRyxHQUFVLEVBQUU7UUFFckMsT0FBTyxJQUFJLElBQUksQ0FBRyxHQUFHLENBQUUsQ0FBRTtJQUMxQixDQUFDLENBQUE7SUFFRCxNQUFNLFNBQVMsR0FBRyxHQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FFeEQsS0FBSyxDQUFHLEVBQUUsRUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUUsR0FBSSxDQUFDLEdBQUcsQ0FBRSxFQUFFLEVBQUcsRUFBRSxLQUFLLEVBQUcsUUFBUyxDQUFDLEdBQUcsQ0FBRSxFQUFFLEVBQUUsQ0FBRSxDQUFFLENBQ3BFLENBQUU7SUFFSCxNQUFNLGFBQWEsR0FBbUIsS0FBSyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUcsQ0FBRTtJQUVoRSxNQUFNLEdBQUcsR0FDVDtRQUNDLEtBQUssRUFBRyxNQUFNO1FBQ2QsS0FBSyxFQUFHLFNBQVMsRUFBRztLQUNwQixDQUFBO0lBRUQsU0FBUztJQUVJLFdBQVEsR0FBRyxDQUFFLFFBQWlCLEVBQVUsRUFBRTtRQUV0RCxPQUFPLElBQUksSUFBSSxDQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBRyxRQUFRLENBQUUsQ0FBRSxDQUFFO0lBQ2hELENBQUMsQ0FBQTtJQUVELEtBQUs7SUFF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