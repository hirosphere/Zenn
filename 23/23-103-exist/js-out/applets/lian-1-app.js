import { Leaf, LianV, ef, each, } from "../meh/index.js";
import * as eki from "../raildata/eki.js";
const log = console.log;
// Model //
var Model;
(function (Model) {
    class App {
        lines = ["埼京線", "山手線", "京浜東北線", "総武線各駅停車", "中央線"].map(name => eki.lines[name]);
        history = new LianV();
        constructor() {
            for (let i = 0; i < 109; i++)
                this.history.addValue(this.randstat());
        }
        evmon = new Leaf.String("evmon");
        shuffle() {
        }
        randstat() {
            const line = arrnd(this.lines);
            return arrnd(line.stations);
        }
    }
    Model.App = App;
    const arrnd = (ar) => ar[Math.floor(ar.length * Math.random())];
})(Model || (Model = {}));
const arrnd = (ar) => Math.floor(Math.random() * ar.length);
// UI //
const { div, h2, h3, span, button, b, table, thead, tbody, tr, td, br, p } = ef;
export const Lian1Applet = (app = new Model.App) => {
    document.addEventListener("mouseup", () => app.evmon.set("mouseup"));
    return div({ class: "applet lian-1" }, h2("Lian-1 Applet"), div({ class: "applet-body " }, div({ class: "cols-3", actActs: { dblclick(ev) { app.evmon.set("dblclk"); } } }, div({ class: "stations" }, each(app.lines, line => Line(app, line)))), div(app.evmon), div({ class: "cols-3" }, h3("椅子取 history"), div(button({
        acts: {
            click() { app.history.clear(); },
            dragstart(ev) { log(ev); },
        },
        attrs: { draggable: "true" }
    }, "全消去"), " ", span(app.history.vlength, "駅")), div({ class: "stations" }, History(app)))));
};
const Line = (app, line) => {
    const stations = LianV.create(line.stations);
    const action = (station) => app.history.addValue(station, 0);
    return span({ class: "line" }, ef.b(line.name), each(stations, o => button({ acts: { click: () => action(o.val) } }, o.pos.cv(v => 1 + v + ""), " ", o.val.name)));
};
const History = (mo) => {
    return div({ class: "line" }, table(thead(tr(each(["", "郵便番号", "駅名", "路線名", "北緯・東経"], i => td(i)))), tbody(each(mo.history, o => HistoryRow(o)))));
};
const HistoryRow = (order) => {
    const st = order.v;
    const act = () => order.remove();
    return tr(td(order.pos), td(st.postal), td({ style: { minWidth: "5em" } }, st.name), td({ style: { minWidth: "9em" } }, st.line + " " + (st.pos + 1)), td(st.lat, " ", st.long), td(button({ acts: { click: act } }, "消")));
};
const HistoryButton = (o) => {
    const act = () => o.remove();
    return button({ acts: { mouseleave: act } }, o.pos, " ", span({ style: { color: "red" } }, o.val.line, " ", o.val.pos + 1, " ", o.val.name));
};
export const Lian1 = { UI: Lian1Applet };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlhbi0xLWFwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9hcHBsZXRzL2xpYW4tMS1hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQVUsRUFBRSxFQUFFLElBQUksR0FBRyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pFLE9BQU8sS0FBSyxHQUFHLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4QixXQUFXO0FBRVgsSUFBVSxLQUFLLENBMkJkO0FBM0JELFdBQVUsS0FBSztJQUVkLE1BQWEsR0FBRztRQUVmLEtBQUssR0FBRyxDQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUUsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7UUFDckUsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFtQixDQUFDO1FBRXZEO1lBRUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUc7Z0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUM7UUFDMUUsQ0FBQztRQUVELEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsT0FBTyxDQUFFLENBQUM7UUFFbkMsT0FBTztRQUVQLENBQUM7UUFFUyxRQUFRO1lBRWpCLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7WUFDakMsT0FBTyxLQUFLLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQy9CLENBQUM7S0FFRDtJQXRCWSxTQUFHLE1Bc0JmLENBQUE7SUFFRCxN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