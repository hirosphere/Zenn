import { Leaf, Lian, ef, ap, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
const lp = ap;
// Model //
const lines = eki.lines;
var Model;
(function (Model) {
    class App {
        lines = ["埼京線", "京浜東北線", "総武線各駅停車", "中央線"].map(name => new eki.Line(name));
        history = new Lian();
        evmon = new Leaf.String("evmon");
        shuffle() {
        }
    }
    Model.App = App;
})(Model || (Model = {}));
const arrnd = (ar) => Math.floor(Math.random() * ar.length);
// UI //
const { div, h2, h3, span, button, b } = ef;
export const Lian1Applet = (app = new Model.App) => {
    const lp = ap;
    document.addEventListener("mouseup", () => app.evmon.set("mouseup"));
    return div({ class: "applet lian-1" }, h2("Lian-1 Applet"), div({ class: "applet-body " }, div({ class: "cols-3", actActs: { dblclick(ev) { app.evmon.set("dblclk"); } } }, div({ class: "stations" }, ap(app.lines, line => Line(app, line)))), div(app.evmon), div({ class: "cols-3" }, h3("椅子取 history"), div({ acts: { click() { app.history.clear(); } } }, button("全消去")), div({ class: "stations" }, History(app)))));
};
const Line = (app, line) => {
    const action = (station) => app.history.add(station, 0);
    return span({ class: "line" }, b(line.name), lp(line.stations, item => button({ acts: { mouseover: () => action(item) } }, item.name)));
};
const History = (mo) => {
    return span({ class: "line" }, lp(mo.history, item => {
        const act = () => mo.history.remove(item);
        return button({ acts: { mouseleave: act } }, item.name);
    }));
};
export const Lian1 = { UI: Lian1Applet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlhbjFhcHAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvYXBwbGV0cy9saWFuMWFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxLQUFLLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUVkLFdBQVc7QUFFWCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBRXhCLElBQVUsS0FBSyxDQWFkO0FBYkQsV0FBVSxLQUFLO0lBRWQsTUFBYSxHQUFHO1FBRWYsS0FBSyxHQUFHLENBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7UUFDakUsT0FBTyxHQUFHLElBQUksSUFBSSxFQUFtQixDQUFDO1FBRXRELEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsT0FBTyxDQUFFLENBQUM7UUFFbkMsT0FBTztRQUVQLENBQUM7S0FDRDtJQVZZLFNBQUcsTUFVZixDQUFBO0FBQ0YsQ0FBQyxFQWJTLEtBQUssS0FBTCxLQUFLLFFBYWQ7QUFJRCxNQUFNLEtBQUssR0FBRyxDQUFFLEVBQWtCLEVBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUUsQ0FBQztBQUVoRixRQUFRO0FBRVIsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxN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