import { models as Mehm, Leaf, ef, each, newhook } from "../meh/index.js";
import { Grazer } from "./grazer.js";
const log = console.log;
//const log = ( ... any : any ) => {};
const { div, span, p, ul, li, select, option } = ef;
//  //
export const TabSwitchApp = () => {
    const labels = ["Eins", "Zwei", "Drei", "Vier", "Fünf", "Sechs", "Sieben", "Acht", "Neun", "Zehn"];
    const sel = Mehm.Select.fromLabels(labels, "Nuuull");
    sel.root?.parts[3].select();
    return ef.article({ class: "applet" }, ef.h2("TabSwitch"), ef.section({ class: "col-2" }, div(ef.button({ acts: { click() { sel.default.select(); } } }, "Null")), ContentSwitch(sel.root.parts), Tabs(sel.root.parts), ef.section(ef.input({ attrs: { value: sel.current.cv(o => `${o?.value}`) } }))));
};
// Tab|Tab|Tab //
const Tabs = (opts) => {
    const gr = new Grazer({ buttons: 1 });
    const hook = newhook();
    hook.init = () => hook.e && gr.initTouch(hook.e);
    return ul({
        class: "tabs",
        actActs: {
            mousedown(ev) { gr.mousedown(ev); }
        },
        hook
    }, each(opts || [], opt => Tab(opt, gr)));
};
const Tab = (opt, gr) => {
    return li({
        class: ["tab", { selected: opt.selected }],
        actActs: {
            mousedown(ev) { gr.mousedown(ev) && opt.select(); },
            mouseenter(ev) { gr.mouseenter(ev) && opt.select(); },
        }
    }, opt.value);
};
//  //
const ContentSwitch = (options) => {
    return ef.div({ class: "switch" }, each(options, option => Content(option)));
};
const Content = (option) => {
    return ef.section({ class: ["switch-content", { active: option.selected }] }, ef.h2(option.value), ef.p(option.value, " を知らないか？"));
};
//  models  //
var models;
(function (models) {
    class PageContent {
        name;
        constructor(name) {
            this.name = new Leaf.String(name);
        }
    }
    models.PageContent = PageContent;
    class Option extends Mehm.Option {
    }
    models.Option = Option;
})(models || (models = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvdGFic3dpdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN4QixzQ0FBc0M7QUFFdEMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUVwRCxNQUFNO0FBRU4sTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUVoQyxNQUFNLE1BQU0sR0FBRyxDQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQ3JHLE1BQU0sR0FBRyxHQUE0QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBRSxNQUFNLEVBQUUsUUFBUSxDQUFFLENBQUM7SUFDaEYsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFOUIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUVwQyxFQUFFLENBQUMsRUFBRSxDQUFFLFdBQVcsQ0FBRSxFQUNwQixFQUFFLENBQUMsT0FBTyxDQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUU3QixHQUFHLENBQUUsRUFBRSxD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