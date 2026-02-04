import { Life, Live, Renn, Key, ef, pl, times, log } from "../../../Meh/Meh.js";
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
    class Index extends Life {
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
            super();
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
    new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" });
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
        const radioname = `RG ${Live.ru(vm)}`;
        return ef.section({ class: "PEER", style: { display } }, ef.div({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.label({
            class: "_HEAD _TITLE",
            passive: { click: () => vm.select() }
        }, radio(vm, radioname), ef.div({ style: lettertrim(vm.title.$, 9) }, vm.title)), vm.com && ef.span({ class: "_THUMB", passive: { click: () => vm.exit() } }, ef.span({ class: "_MK" }, "^"))), ef.ul(pl.each(vm.parts, vm => PeerIndex(vm, radioname))));
    };
    const PeerIndex = (vm, radioname) => {
        const hook = {
            connect(el) {
                log(vm.title.$, el.clientHeight);
            }
        };
        const keydown = (ev) => {
            // log ( ev.key ) ;
            if (ev.key == "Enter") {
                ev.shiftKey ? vm.com?.exit() : vm.enter();
            }
        };
        return ef.li({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.label({ class: "_TITLE", passive: { click: () => vm.select(), keydown }, hook }, radio(vm, radioname), ef.div({ style: lettertrim(vm.title.$, 10) }, vm.title)), ef.span({ class: "_THUMB", passive: { click: () => vm.enter() } }, ef.span({ class: "_MK" }, "v")));
    };
    const radio = (vm, radioname) => {
        return ef.input({
            attrs: { type: "radio", name: radioname, title: radioname },
            props: { checked: vm.page_match },
            style: { width: "0" },
        });
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
		width : 240px ;
		background-color : hsl( 215  65%  90% ) ;

		display : flex ;
		flex-direction : column ;

		padding-block : 0.8ex ;
		padding-inline : 0.8ex  ;
	}

	.NAVI
	{
		overflow : hidden ;

		flex-grow : 1 ;
		cursor : default ;

		display : flex ;
		flex-direction : column ;

		gap : 0.8ex ;

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
		padding-inline : 0px ;
		gap : 0.8ex ;
	}

	.PEER ._HEAD
	{
		overflow : hidden ;
		margin-block : 0.2ex ;
		font-size : 1.08em ;
		font-weight : bold ;
	}

	.PEER > ul
	{
		background : white ;

		overflow : auto ;
		scrollbar-width : none ;

		padding-block : 0.5ex ;
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

		padding-block : 1.3ex ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL05hdmkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFVLElBQUksRUFBRyxHQUFHLEVBQVEsRUFBRSxFQUFHLEVBQUUsRUFBRyxLQUFLLEVBQUcsR0FBRyxFQUFFLE1BQU0scUJBQXFCLENBQUU7QUFDcEcsT0FBTyxLQUFLLE1BQU0sTUFBTSxpQkFBaUIsQ0FBRTtBQUMzQyxPQUFPLEtBQUssR0FBRyxNQUFNLDBCQUEwQixDQUFFO0FBRWpELElBQVUsRUFBRSxDQU1YO0FBTkQsV0FBVSxFQUFFO0lBRVgsTUFBTSxHQUFHO1FBRVIsQ0FBQztLQUNEO0FBQ0YsQ0FBQyxFQU5TLEVBQUUsS0FBRixFQUFFLFFBTVg7QUFFRCxJQUFVLEVBQUUsQ0EwSlg7QUExSkQsV0FBVSxFQUFFO0lBRUUsYUFBVSxHQUFHLEdBQVUsRUFBRTtRQUVyQyxPQUFPLElBQUksSUFBSSxDQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQzFCLENBQUMsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLEdBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUV4RCxLQUFLLENBQUcsRUFBRSxFQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRSxHQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRyxFQUFFLEtBQUssRUFBRyxRQUFTLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRSxDQUFFLENBQUUsQ0FDcEUsQ0FBRTtJQUVILE1BQU0sYUFBYSxHQUFtQixLQUFLLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxDQUFFO0lBRWhFLE1BQU0sR0FBRyxHQUNUO1FBQ0MsS0FBSyxFQUFHLE1BQU07UUFDZCxLQUFLLEVBQUcsU0FBUyxFQUFHO0tBQ3BCLENBQUE7SUFFRCxTQUFTO0lBRUksV0FBUSxHQUFHLENBQUUsUUFBaUIs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