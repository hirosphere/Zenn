import { Live, Store, DOM, ef, log } from "../../Meh/Meh.js";
import * as common from "./common.js";
log("Alt1App");
var VM;
(function (VM) {
    class App {
        navi_mode;
        ss;
        constructor() {
            this.ss = new Store.Session("NAV_DEV_MAIN", app).value;
            this.navi_mode = Live.trans_r(this.ss.navi_mode_i, i => navi_mode[i]);
        }
        toggle_nm() {
            const s = this.ss.navi_mode_i;
            s.$ = (s.$ + 1) >= navi_mode.length ? 0 : s.$ + 1;
        }
    }
    VM.App = App;
    class app {
        navi_mode_i;
        constructor(i) {
            this.navi_mode_i = i?.navi_mode_i ?? 0;
        }
    }
    const navi_mode = ["NM_BLOCK", "MN_INLINE"];
    VM.fonts = [
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
var VC;
(function (VC) {
    VC.App = () => {
        const app = new VM.App;
        return ef.div({
            shadow: [common.css, css],
        }, ef.main({ class: "FC PX GX" }, ef.h1("Nav dev "), ef.p(new Date().toLocaleString()), ef.section({ class: "FR GX JC AC" }, ef.button({ passive: { click: () => app.toggle_nm() } }, app.navi_mode), ef.p(app.ss.navi_mode_i)), FontSelector(), Counter(), Counter(), Counter()));
    };
    const FontSelector = () => {
        return ef.select({}, ...VM.fonts.map(v => ef.option(v)));
    };
    const Counter = () => {
        const count = Live(100);
        return ef.section({ class: "FR GX JC AC" }, ef.button({ passive: { click: () => count.$ -= 1, } }, "-1"), ef.button({ passive: { click: () => count.$ += 1, } }, "+1"), ef.span({ style: { fontSize: "3em" } }, count));
    };
    /* css */
    const css = /* css */ `
	
	* { color : hsl( 0  0%  60% ) ; }

	main
	{
		text-align : center ;
	}

	button
	{
		min-width : 4em ;
		padding : 1.2ex 1.2em ;
	}

	select { font-size : 1.3em ;  color : hsl( 0  0%  10% ) ; }
	
	`;
})(VC || (VC = {}));
export const main = (ce) => {
    DOM.add(VC.App(), ce);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWx0MUFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL2FsdC9BbHQxQXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxJQUFJLEVBQXVCLEtBQUssRUFBRyxHQUFHLEVBQVEsRUFBRSxFQUFRLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFFO0FBRXZHLE9BQU8sS0FBSyxNQUFNLE1BQU0sYUFBYSxDQUFFO0FBRXZDLEdBQUcsQ0FBRyxTQUFTLENBQUUsQ0FBRTtBQUduQixJQUFVLEVBQUUsQ0F1RFg7QUF2REQsV0FBVSxFQUFFO0lBRVgsTUFBYSxHQUFHO1FBRVIsU0FBUyxDQUF5QjtRQUV6QyxFQUFFLENBQWlCO1FBRW5CO1lBRUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUcsY0FBYyxFQUFHLEdBQUcsQ0FBRSxDQUFDLEtBQUssQ0FBRTtZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBRTtRQUMvRSxDQUFDO1FBRU0sU0FBUztZQUVmLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFFO1lBQy9CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUU7UUFDdEQsQ0FBQztLQUNEO0lBakJZLE1BQUcsTUFpQmYsQ0FBQTtJQUVELE1BQU0sR0FBRztRQUVSLFdBQVcsQ0FBVztRQUV0QixZQUFjLENBQXFCO1lBRWxDLElBQUksQ0FBQyxXQUFXLEdB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