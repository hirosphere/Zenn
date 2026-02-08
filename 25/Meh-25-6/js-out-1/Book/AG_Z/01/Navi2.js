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
        peer_focused = Live(false);
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
    /*  */
    class Focus {
        constructor(container) {
            ;
        }
    }
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
        return ef.div({ class: "PEER_FRAME" }, pl.key(vm.curr_peer.key, index => index && Peer(index, vm.peer_focused)));
    };
    const Peer = (vm, focused) => {
        const display = Live.trans_r(vm.navi_match, s => s ? "" : "none");
        vm.make_dyn_parts();
        // const radioname = `RG ${ Live.ru ( vm ) }` ;
        const radioname = `PEER_RADIO_GROUP`;
        return ef.section({ class: "PEER", style: { display } }, ef.div({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.label({
            class: "_HEAD _TITLE",
            passive: { click: () => vm.select() }
        }, ef.div({ style: lettertrim(vm.title.$, 9) }, vm.title)), vm.com && ef.span({ class: "_THUMB", passive: { click: () => vm.exit() } }, ef.span({ class: "_MK" }, "^"))), ef.ul(pl.each(vm.parts, vm => PeerIndex(vm, focused))));
    };
    const PeerIndex = (vm, focused) => {
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
        return ef.li({ class: ["INDEX", { _SELECTED: vm.page_match }] }, ef.label({
            class: "_TITLE",
            passive: { click: () => vm.select(), keydown },
            hook
        }, ef.div({ style: lettertrim(vm.title.$, 10) }, vm.title)), ef.span({ class: "_THUMB", passive: { click: () => vm.enter() } }, ef.span({ class: "_MK" }, "v")));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2aTIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi90cy1zcmMvQm9vay9BR19aLzAxL05hdmkyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUcsSUFBSSxFQUFVLElBQUksRUFBRyxHQUFHLEVBQVEsRUFBRSxFQUFHLEVBQUUsRUFBRyxLQUFLLEVBQUcsR0FBRyxFQUFFLE1BQU0scUJBQXFCLENBQUU7QUFDcEcsT0FBTyxLQUFLLE1BQU0sTUFBTSxpQkFBaUIsQ0FBRTtBQUMzQyxPQUFPLEtBQUssR0FBRyxNQUFNLDBCQUEwQixDQUFFO0FBRWpELElBQVUsRUFBRSxDQU1YO0FBTkQsV0FBVSxFQUFFO0lBRVgsTUFBTSxHQUFHO1FBRVIsQ0FBQztLQUNEO0FBQ0YsQ0FBQyxFQU5TLEVBQUUsS0FBRixFQUFFLFFBTVg7QUFFRCxJQUFVLEVBQUUsQ0FvS1g7QUFwS0QsV0FBVSxFQUFFO0lBRUUsYUFBVSxHQUFHLEdBQVUsRUFBRTtRQUVyQyxPQUFPLElBQUksSUFBSSxDQUFHLEdBQUcsQ0FBRSxDQUFFO0lBQzFCLENBQUMsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHLEdBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUV4RCxLQUFLLENBQUcsRUFBRSxFQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBRSxHQUFJLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRyxFQUFFLEtBQUssRUFBRyxRQUFTLENBQUMsR0FBRyxDQUFFLEVBQUUsRUFBRSxDQUFFLENBQUUsQ0FDcEUsQ0FBRTtJQUVILE1BQU0sYUFBYSxHQUFtQixLQUFLLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRyxDQUFFO0lBRWhFLE1BQU0sR0FBRyxHQUNUO1FBQ0MsS0FBSyxFQUFHLE1BQU07UUFDZCxLQUFLLEVBQUcsU0FBUyxFQUFHO0tBQ3BCLENBQUE7SUFFRCxTQUFTO0lBRUksV0FBUSxHQUFHLENBQUUsUUFBaUIs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