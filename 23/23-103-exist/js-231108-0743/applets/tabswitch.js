import { models as Mehm, Leaf, ef, each } from "../meh/index.js";
import { Applet } from "./applet.js";
const log = console.log;
const { div, span, p, ul, li, select, option } = ef;
//  //
class PageContent {
    name;
    constructor(name) {
        this.name = new Leaf.String(name);
    }
}
//  //
export const TabSwitchApp = () => {
    const labels = ["Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn"];
    const sel = Mehm.Select.fromLabels(labels);
    return Applet({
        title: "TabSwitch",
        content: [Sel(sel, sel.root?.parts), Tabs(sel.root?.parts)]
    });
};
//  //
class Grazer {
    get isActive() { return this._isActive; }
    constructor() {
        document.addEventListener("mouseup", () => { this._isActive = false; });
    }
    _isActive = false;
    start() { this._isActive = true; }
}
// Tab|Tab|Tab //
const Tabs = (opts) => {
    const gr = new Grazer();
    return ul({ class: "tabs" }, each(opts || [], opt => Tab(opt, gr)));
};
const Tab = (opt, gr) => {
    return li({
        class: ["tab", { selected: opt.selected }],
        actActs: {
            mousedown() { opt.select(); gr.start(); },
            mouseenter() { gr.isActive && opt.select(); },
            touchstart() { opt.select(); gr.start(); },
            touchmove() { gr.isActive && opt.select(); },
        }
    }, opt.value);
};
// <select/> //
const Sel = (sel, opts) => {
    const optio = (i) => option({ attrs: { selected: i.selected }, }, i.value);
    return ef.select({
        acts: { input: ev => selectOption(sel, opts, ev) }
    }, ef.option({ attrs: { selected: true } }, "Null"), each(opts || [], i => optio(i)));
};
const selectOption = (sel, opts, ev) => {
    if (!(ev.target instanceof HTMLSelectElement))
        return;
    const i = ev.target.selectedIndex;
    i > 0 ?
        opts?.[i - 1]?.select() :
        sel.setCurrent(null);
};
//  //
const Contents = () => {
    ;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvdGFic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFcEQsTUFBTTtBQUVOLE1BQU0sV0FBVztJQUVQLElBQUksQ0FBQztJQUNkLFlBQWEsSUFBYTtRQUV6QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0Q7QUFFRCxNQUFNO0FBRU4sTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUVoQyxNQUFNLE1BQU0sR0FBRyxDQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQ3JHLE1BQU0sR0FBRyxHQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBRSxNQUFNLENBQUUsQ0FBQztJQUV0RSxPQUFPLE1BQU0sQ0FBQztRQUNiLEtBQUssRUFBRSxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFFLEdBQUcsQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUUsRUFBRyxJQUFJLENBQUUs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