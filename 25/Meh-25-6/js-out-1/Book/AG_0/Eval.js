import { Live, Renn, Key, ef, pl } from "../../Meh/Meh.js";
const log = console.log;
const ud = undefined;
const times = (t, fn) => {
    const rt = [];
    for (let i = 0; i < t; i++)
        rt[i] = fn(i);
    return rt;
};
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
                this.output.$ = eval(this.code.$);
            }
            catch (exc) {
                this.output.$ = String(exc);
            }
        }
    }
    DM.Eval = Eval;
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
		display : grid ;
		grid-template-rows : auto  1fr ;
		padding : 1px ;
	}

	.BAR
	{
		width : 100% ;
		display : flex ;
		gap : 0.5ex ;
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
		flex-grow : 1 ;
		border-bottom : 2px solid hsl( 0  0%  60% ) ;

		cursor : default ;
		display : flex ;

		overflow : auto ;
		align-items : end ;
		list-style : none ;
		gap : 0.3ex ;
	}

	.TAB
	{
		border-radius : 1.0em  1.0em  0.1ex  0.1ex ;
		border : 1px solid hsl( 50  3%  55% ) ;
		border-bottom : 0.4ex solid  hsl( 345  6%  80% ) ;
		padding : 0.3ex  1.5em ;
	}

	.TAB._SELECTED
	{
		border-bottom : 0.4ex  solid  hsl( 90  60%  45% ) ;
		background-color : hsl( 90  0%  96% ) ;
	}

	.EVAL
	{
		height : 100% ;
		display : none ;
		grid-template-columns : 60%  40% ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0FHXzAvRXZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFHLElBQUksRUFBRyxHQUFHLEVBQWMsRUFBRSxFQUFHLEVBQUUsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBRTNFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUU7QUFDekIsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFFO0FBR3RCLE1BQU0sS0FBSyxHQUFHLENBQVEsQ0FBVSxFQUFHLEVBQXdCLEVBQVUsRUFBRTtJQUV0RSxNQUFNLEVBQUUsR0FBVSxFQUFFLENBQUU7SUFDdEIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUksQ0FBQyxHQUFHLENBQUMsRUFBSSxDQUFDLEVBQUc7UUFBSSxFQUFFLENBQUcsQ0FBQyxDQUFFLEdBQUcsRUFBRSxDQUFHLENBQUMsQ0FBRSxDQUFFO0lBQ3pELE9BQU8sRUFBRSxDQUFFO0FBQ1osQ0FBQyxDQUFBO0FBSUQsS0FBSztBQUVMLE1BQU0sS0FBVyxFQUFFLENBc0RsQjtBQXRERCxXQUFpQixFQUFFO0lBUWxCLE1BQWEsSUFBSTtRQUVULEtBQUssR0FBRyxJQUFJLENBQUcsTUFBTSxDQUFFLENBQUU7UUFFekIsSUFBSSxHQUFHLElBQUksQ0FBRyxFQUFFLENBQUUsQ0FBRTtRQUNwQixNQUFNLEdBQUcsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFFO1FBQ3RCLEtBQUssR0FBRyxJQUFJLENBQUcsRUFBRSxDQUFFLENBQUU7UUFFckIsT0FBTyxDQUFrQjtRQUVoQyxZQUFjLEVBQVM7WUFFdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBRTtR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