import { Live, Store, ef, pl, times, log } from "../../Meh/Meh.js";
import * as common from "./common.js";
log("Alt1App");
var VM;
(function (VM) {
    class App {
        navi_mode;
        counter_font;
        ss;
        constructor() {
            this.ss = new Store.Session("NAV_DEV_MAIN", app).value;
            this.navi_mode = Live.trans_r(this.ss.navi_mode_i, i => navi_mode[i]);
            this.counter_font = Live.trans_r(this.ss.counter_font_i, i => VM.fonts[i] ?? "");
        }
        toggle_nm() {
            const s = this.ss.navi_mode_i;
            s.$ = (s.$ + 1) >= navi_mode.length ? 0 : s.$ + 1;
        }
    }
    VM.App = App;
    class app {
        navi_mode_i;
        counter_font_i;
        counters;
        constructor(i) {
            this.navi_mode_i = i?.navi_mode_i ?? 0;
            this.counter_font_i = i?.counter_font_i ?? 0;
            this.counters = i?.counters?.map(i => new counter(i)) ??
                [100, 200, 300].map(v => new counter({ title: "カウンター", value: v }));
        }
    }
    const navi_mode = ["NM_BLOCK", "NM_INLINE"];
    class counter {
        title;
        value;
        constructor(i) {
            this.title = i?.title ?? "カウンタ";
            this.value = i?.value ?? 100;
        }
    }
    VM.fonts = [
        "",
        "'Courier New', Courier, monospace",
        "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        "'Times New Roman', Times, serif",
        "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
        "Arial, Helvetica, sans-serif",
        "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
        "Georgia, 'Times New Roman', Times, serif",
        "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
        "Verdana, Geneva, Tahoma, sans-serif",
        "cursive",
        "fantasy",
        "monospace",
        "sans-serif",
        "serif",
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    ];
})(VM || (VM = {}));
export var VC;
(function (VC) {
    VC.App = (body) => {
        const app = new VM.App;
        return ef.body({
            target: body,
            class: app.navi_mode,
            css: [common.css, css],
        }, ef.main({ class: "FC PM GM" }, ef.h1("Nav dev A"), ef.p(Store.Perm.sid), ef.p(new Date().toLocaleString()), ef.section({ class: "FR GX JC AC" }, ef.button({ passive: { click: () => app.toggle_nm() } }, app.navi_mode), ef.p(app.ss.navi_mode_i)), FontSelector(app.ss.counter_font_i), ef.p({ style: { height: "5em" } }, app.counter_font), pl.each(app.ss.counters.renn, m => Counter(m, app.counter_font))), Navi(app));
    };
    const FontSelector = (cur) => {
        const select = ef.select({
            hook: {
                init(el) {
                    Live.add_ref(cur, { vChan: () => el.selectedIndex = cur.$ });
                    el.oninput = () => cur.$ = el.selectedIndex;
                }
            },
        }, ...VM.fonts.map(v => ef.option(v)));
        return ef.label({ class: "FR GX  FONT_SEL" }, select, "", cur);
    };
    const Counter = (mo, font) => {
        return ef.section({ class: "FR GX JC AC  CONTER", style: { fontFamily: font } }, ef.button({ passive: { click: () => mo.value.$ -= 1, } }, "-1"), ef.button({ passive: { click: () => mo.value.$ += 1, } }, "+1"), ef.span({ style: { fontSize: "3em" } }, mo.value));
    };
    const Navi = (app) => {
        const list = times(10, n => `Item ${n + 1}`);
        return ef.section({}, ef.nav(ef.ul(...list.map(i => ef.li(i)))));
    };
    /* css */
    const css = /* css */ `
	
	* { color : hsl( 0  0%  30% ) ; }

	/* layout */

	:host {  }
	main { text-align : center ; }

	.NM_BLOCK > main { background : pink ; }

	.NM_INLINE > main { background : skyblue ; }

	/* Navi */

	nav ul
	{
		cursor : default ;
		list-style : none ;
	}

	nav li
	{
		padding : 0.2ex  1ex ;
	}

	nav li:hover { background : hsl( 0  0%  97% ) ; }

	.NM_INLINE nav ul
	{

	}
	

	/* parts */

	button
	{
		min-width : 4em ;
		padding : 1.2ex 1.2em ;
	}

	.CONTER
	{
		height : 5rem ;
	}

	.FONT_SEL
	{
	}

	.FONT_SEL select
	{
		max-width : 80vw ;
		font-size : 1.3em ;  color : hsl( 0  0%  10% ) ;
	}

	`;
})(VC || (VC = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWx0MUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL2FsdC9BbHQxQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxJQUFJLEVBQXVCLEtBQUssRUFBYyxFQUFFLEVBQUcsRUFBRSxFQUFHLEtBQUssRUFBRyxHQUFHLEVBQUUsTUFBTSxrQkFBa0IsQ0FBRTtBQUUvRyxPQUFPLEtBQUssTUFBTSxNQUFNLGFBQWEsQ0FBRTtBQUV2QyxHQUFHLENBQUcsU0FBUyxDQUFFLENBQUU7QUFHbkIsSUFBVSxFQUFFLENBK0VYO0FBL0VELFdBQVUsRUFBRTtJQUVYLE1BQWEsR0FBRztRQUVSLFNBQVMsQ0FBeUI7UUFDbEMsWUFBWSxDQUFlO1FBRWxDLEVBQUUsQ0FBaUI7UUFFbkI7WUFFQyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBRyxjQUFjLEVBQUcsR0FBRyxDQUFFLENBQUMsS0FBSyxDQUFFO1lBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFO1lBQzlFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUEsS0FBSyxDQUFHLENBQUMsQ0FBRSxJQUFJLEVBQUUsQ0FBRSxDQUFFO1FBQ3ZGLENBQUM7UUFFTSxTQUFTO1lBRWYsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUU7WUFDL0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFFLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxD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