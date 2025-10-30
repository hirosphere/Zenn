import { Live, Renn, Key, DOM, ef, pl, times } from "../../Meh/Meh.js";
const log = console.log;
const ud = undefined;
/* */
export var DM;
(function (DM) {
    class Eval {
        title = Live("Eval");
        code = Live("");
        output = Live("");
        input = Live("");
        display;
        constructor(iv) {
            this.title.$ = iv.title;
            this.code.$ = iv.code ?? "";
        }
        execute() {
            let input = this.input.$;
            let d = this.display;
            try {
                this.output.$ = String(eval(this.code.$));
            }
            catch (exc) {
                this.output.$ = String(exc);
            }
        }
    }
    DM.Eval = Eval;
    const dom = DOM;
    /* */
    DM.samples = [
        "d.innerHTML = 'DISPLAY'",
        "4 * 9 / 7",
        "location",
        "[ 1 , 2 , 3 ] .map ( e => `* ${ e } *` )",
        "( 1 + Math.sqrt( 5 ) ) / 2",
    ]
        .map((code, i) => new Eval({ title: "Eval" + (1 + i), code }));
})(DM || (DM = {}));
export var VM;
(function (VM) {
    class App {
        curr = new Key(Live(undefined));
        evals = new Renn(DM.samples);
        constructor() {
            const evals = times(5, i => new DM.Eval({ title: "Eval " + (1 + i) }));
            this.curr.key.$ = this.evals.at(0)?.target;
        }
    }
    VM.App = App;
})(VM || (VM = {}));
export var VC;
(function (VC) {
    const css = /* css */ `

	* { box-sizing : border-box ;  margin : 0 ;  padding : 0 ; }

	:host { height : 100% ; }

	*:focus
	{
		box-shadow : 0.2ex  0.2ex  0.3ex  hsl( 0  0%  60% ) ;
	}

	main
	{
		height : 100% ;
		background : white ;
		display : flex ;
		flex-direction : column ;
		padding : 1px ;
	}

	.BAR
	{
		display : flex ;
		padding : 0.4ex 0.4ex  0.09ex ;
		gap : 1.0ex ;
	}

	.BUTTON_PAD
	{
		display : flex ;
		justify-content : center ;
		align-items : center ;
	}

	.BUTTON_PAD  button
	{
		border-radius : 0.4ex ;
		width : calc( 4em + 4vw ) ;
		height : 2.2em ;
	}

	.TABS
	{
		border-bottom : 2px solid hsl( 0  0%  60% ) ;

		cursor : default ;
		display : flex ;
		overflow : auto ;
		scrollbar-width : none ;

		align-items : end ;
		list-style : none ;
		gap : 0.3ex ;
	}

	.TAB
	{
		border-radius : 1.0em  1.0em  0.1ex  0.1ex ;
		border : 1px solid hsl( 50  3%  55% ) ;
		border-bottom : 0.4ex solid  hsl( 345  6%  80% ) ;
		padding : 0.6ex  min( 1.6em , 3vw ) ;
		text-align : center ;
	}

	.TAB._SELECTED
	{
		border-bottom : 0.4ex  solid  hsl( 90  60%  45% ) ;
		background-color : hsl( 90  0%  96% ) ;
	}

	.EVALS
	{
		height : 100% ;
	}

	.EVAL
	{
		height : 100% ;
		display : none ;
		grid-template-columns : 65fr  35fr ;
		overflow : auto ;
	}

	.EVAL._SELECTED
	{
		display : grid ;
	}

	.EDIT
	{
		display : flex ;
		flex-direction : column ;
		gap : 2px ;
	}

	.EDIT textarea
	{
		flex-grow : 1 ;

		background :  hsl( 200  65%  40% );
		resize : vertical ;

		padding : 0.4ex ;
		font-family : Consolas , monospace ;
		font-size: 1.10rem ;
		color : hsl( 0  0%  100% ) ;

		tab-size : 4ex ;
	}

	.EDIT textarea::selection
	{
		background : hsl( 28  70%  70% ) ;
		color : hsl( 0  0%  10% ) ;
	}

	.DISPLAY
	{
		background : white ;

		display : flex ;
		flex-direction : column ;
		justify-content : center ;
		align-items : center ;
	}


	`;
    /* */
    VC.EvalApp = () => {
        const app = new VM.App;
        return ef.div({ shadow: css }, ef.main(ef.section({ class: "BAR" }, ef.section({ class: "BUTTON_PAD" }, Button("実行", () => app.curr.key.$?.execute())), Tabs(app)), ef.section({ class: "EVALS" }, pl.key(app.curr.key, ev => ev ? Eval(ev, app.curr.match(ev)) : ud))));
    };
    const Button = (text, click) => ef.button({ passive: { click } }, text);
    const Eval = (dm, _SELECTED) => {
        return ef.article({ class: ["EVAL", { _SELECTED }] }, ef.section({ class: "EDIT" }, Editor(dm.code, dm), Editor(dm.output, dm), Editor(dm.input, dm)), ef.section({ class: "DISPLAY", hook: { init: el => dm.display = el } }));
    };
    const Editor = (text, ex) => {
        const keydown = (ev) => {
            if (ev.ctrlKey && ev.key == "Enter") {
                ex.execute();
                ev.preventDefault();
            }
            else if (ev.ctrlKey && ev.key == " ") {
                if (ev.target instanceof HTMLTextAreaElement) {
                    const el = ev.target;
                    const text = el.value;
                    const start = el.selectionStart;
                    const end = el.selectionEnd;
                    el.value =
                        (text.substring(0, start) +
                            "\t" +
                            text.substring(start));
                    el.selectionStart = start + 1;
                    el.selectionEnd = end + 1;
                }
            }
        };
        return ef.textarea({ biBind: { vInp: text }, active: { keydown } });
    };
    const Tabs = (app) => ef.ul({ class: "TABS" }, pl.each(app.evals, ev => Tab(ev, app.curr.match(ev))));
    const Tab = (ev, _SELECTED) => {
        const click = () => { _SELECTED.select(); };
        return ef.li({
            class: ["TAB", { _SELECTED }],
            passive: { click }
        }, ev.title);
    };
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzAvRXZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxHQUFHLEVBQVEsR0FBRyxFQUFHLEVBQUUsRUFBRyxFQUFFLEVBQVEsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLENBQUU7QUFFeEYsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBRTtBQUN6QixNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUU7QUFJdEIsS0FBSztBQUVMLE1BQU0sS0FBVyxFQUFFLENBd0RsQjtBQXhERCxXQUFpQixFQUFFO0lBUWxCLE1BQWEsSUFBSTtRQUVULEtBQUssR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFFekIsSUFBSSxHQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUNwQixNQUFNLEdBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFckIsT0FBTyxDQUFrQjtRQUVoQyxZQUFjLEVBQVM7WUFFdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBRTtRQUM5QixDQUFDO1FBRU0sT0FBTztZQUViLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFFO1lBQzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUU7WUFFdEIsSUFDQSxDQUFDO2dCQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBRyxJQUFJLENBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBRSxD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