import { Live, Renn, Key, ef, pl, times, log } from "../../../Meh/Meh.js";
import * as common from "../../Common.js";
import * as eki from "../../../API/EkiIndex.js";
var PM;
(function (PM) {
    class app {
        ;
    }
})(PM || (PM = {}));
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
        enter() {
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
        }, ef.section({ class: "CARD" }, ef.p({
            class: "TC",
            style: { fontSize: "24px", ...lettertrim(index.title.$, 12) }
        }, index.title)));
    };
    const Navi = (vm) => {
        return ef.nav({ class: "NAVI" }, Path(vm.path), PeerFrame(vm));
    };
    const Path = (vm) => {
        return ef.ul({ class: "PATH" }, pl.each(vm, vm => PathIndex(vm)));
    };
    const PathIndex = (vm) => ef.li({
        class: ["INDEX", { _SELECTED: vm.page_match ?? false }],
        passive: { click: () => vm.enter() }
    }, ef.span({ class: "_TITLE" }, vm.title));
    const PeerFrame = (vm) => {
        return ef.div({ class: "PEER_FRAME" }, pl.key(vm.curr_peer.key, index => index && Peer(index)));
    };
    const Peer = (vm) => {
        const display = Live.trans_r(vm.navi_match, s => s ? "" : "none");
        vm.make_dyn_parts();
        return ef.section({ class: "PEER", style: { display } }, ef.div({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.h3({
            class: "_TITLE",
            passive: { click: () => vm.select() }
        }, ef.div({ style: lettertrim(vm.title.$, 9) }, vm.title)), vm.com && ef.span({ class: "_THUMB", passive: { click: () => vm.exit() } }, ef.span({ class: "_MK" }, "^"))), ef.ul(pl.each(vm.parts, vm => PeerIndex(vm))));
    };
    const PeerIndex = (vm) => {
        const hook = {
            connect(el) {
                log(vm.title.$, el.clientHeight);
            }
        };
        return ef.li({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.div({ class: "_TITLE", passive: { click: () => vm.select() }, hook }, ef.div({ style: lettertrim(vm.title.$, 10) }, vm.title)), ef.span({ class: "_THUMB", passive: { click: () => vm.enter() } }, ef.span({ class: "_MK" }, "v")));
    };
    function lettertrim(letter, limit) {
        const len = letter.length;
        const scale = len > limit ?
            {
                transform: `scale(${limit / len} , ${1} )`,
            } : undefined;
        const rt = {
            whiteSpace: "nowrap",
            textAlignLast: "justify",
            ...trimtable[letter.length],
            ...scale,
        };
        return rt;
    }
    const trimtable = {
        2: { width: "2.05em", },
        3: { width: "3.05em", },
        4: { width: "4.05em", },
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
		background-color : hsl( 215  65%  90% ) ;

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
		gap : 1ex ;

		color : hsl( 0  0%  25% ) ;
	}

	.PATH:not(:empty)
	{
		border-radius : 0.7ex ;
		background-color : hsl( 0  0%  100% ) ;

		display : flex ;
		flex-direction : column ;

		list-style : none ;
		padding : 1ex ;
	}

	.PEER_FRAME
	{
		overflow : hidden ;
		flex-grow : 1 ;
	}

	.PEER
	{
		border-radius : 0.7ex ;
		overflow : clip ;

		background-color : white ;
		height : 100% ;

		display : grid ;
		grid-template-rows : auto  1fr ;
		padding-block : 0em  0.6ex ;
		padding-inline : 1px ;
		gap : 1.0ex ;
	}

	.PEER h3
	{
		overflow : hidden ;
		margin-block : 0.2ex ;
		font-size : 1.15em ;
	}

	.PEER > ul
	{
		background : white ;

		overflow : auto ;
		scrollbar-width : none ;

		padding-block : 0.6ex ;
		padding-inline : 1px ;
		list-style : none ;
	}

	.INDEX
	{
		border-radius : 0.2ex ;
	}

	.INDEX._SELECTED
	{
		background : hsl( 0  0%  12% ) ;
		color : hsl( 0  0%  90% ) ;
	}

	.INDEX > ._TITLE
	{
		flex-grow : 1 ;
		border-radius : 0.5ex ;
		overflow : hidden ;
	}

	.INDEX > ._THUMB
	{
		display : flex ;
		padding : 0.3ex  0.4ex ;
		align-items : stretch ;
	}

	.INDEX > ._THUMB > ._MK
	{
		border-radius : 0.5ex ;

		background : hsl( 55  5%  93% / 90% ) ;
		padding-inline : 1.2ex ;

		display : flex ;
		align-items : center ;
		font-family : 'Consolas' , monospace ;
		color : hsl( 0  0%  50% ) ;

	}

	.PATH .INDEX
	{
		padding-block : 0.4ex ;
		text-align : center ;
	}

	.PATH ._TITLE
	{
		display : inline-block ;
		
		border-bottom : 1px  dotted  hsl( 0  0%  50% ) ;
		min-width : 7em ;

		padding-block : 0  0.6ex ;
		padding-inline : 0.5ex ;
		text-align : center ;
	}

	.PEER .INDEX
	{
		border-bottom : 1px  dotted  hsl( 0  0%  60% ) ;

		display : flex ;
		gap : 0.1ex ;
	}

	.PEER ._TITLE
	{
		width : 6em ;

		display : flex ;
		justify-content : center ;

		padding-block : 1.15ex ;
		padding-inline : 1ex  0.7ex ;
		overflow : hidden ;
		
		white-space : nowrap ;
	}

	.CONTENT
	{
		padding : 1ex ;

		display : flex ;
		flex-wrap : wrap ;

		justify-content : center ;
		align-items : center ;

		gap : 1ex ;
	}

	.CONTENT .CARD
	{
		background : hsl( 95  45%  45% ) ;
		color : white ;

		flex : 0  1  350px ;
		height : 250px ;

		display : flex ;
		justify-content : center ;
		align-items : center ;
	}
	
	
	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL05hdmkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQVUsSUFBSSxFQUFHLEdBQUcsRUFBUSxFQUFFLEVBQUcsRUFBRSxFQUFHLEtBQUssRUFBRyxHQUFHLEVBQUUsTUFBTSxxQkFBcUIsQ0FBRTtBQUM3RixPQUFPLEtBQUssTUFBTSxNQUFNLGlCQUFpQixDQUFFO0FBQzNDLE9BQU8sS0FBSyxHQUFHLE1BQU0sMEJBQTBCLENBQUU7QUFFakQsSUFBVSxFQUFFLENBTVg7QUFORCxXQUFVLEVBQUU7SUFFWCxNQUFNLEdBQUc7UUFFUixDQUFDO0tBQ0Q7QUFDRixDQUFDLEVBTlMsRUFBRSxLQUFGLEVBQUUsUUFNWDtBQUVELElBQVUsRUFBRSxDQXNKWDtBQXRKRCxXQUFVLEVBQUU7SUFFRSxhQUFVLEdBQUcsR0FBVSxFQUFFO1FBRXJDLE9BQU8sSUFBSSxJQUFJLENBQUcsR0FBRyxDQUFFLENBQUU7SUFDMUIsQ0FBQyxDQUFBO0lBRUQsTUFBTSxTQUFTLEdBQUcsR0FBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBRXhELEtBQUssQ0FBRyxFQUFFLEVBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFFLEdBQUksQ0FBQyxHQUFHLENBQUUsRUFBRSxFQUFHLEVBQUUsS0FBSyxFQUFHLFFBQVMsQ0FBQyxHQUFHLENBQUUsRUFBRSxFQUFFLENBQUUsQ0FBRSxDQUNwRSxDQUFFO0lBRUgsTUFBTSxhQUFhLEdBQW1CLEtBQUssSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFHLENBQUU7SUFFaEUsTUFBTSxHQUFHLEdBQ1Q7UUFDQyxLQUFLLEVBQUcsTUFBTTtRQUNkLEtBQUssRUFBRyxTQUFTLEVBQUc7S0FDcEIsQ0FBQTtJQUVELFNBQVM7SUFFSSxXQUFRLEdBQUcsQ0FBRSxRQUFpQixFQUFVLEVBQUU7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