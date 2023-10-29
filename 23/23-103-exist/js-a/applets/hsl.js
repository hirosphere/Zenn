import { leaf as l, ef } from "../meh/index.js";
import { Range } from "../gui/range.js";
l.bool;
export class Branch {
    hue;
    sat;
    lig;
    css;
    constructor(v = { hue: 210, sat: 0.65, lig: 0.65 }) {
        const rel = () => this.update();
        this.hue = l.num(v.hue, { rel });
        this.sat = l.num(v.sat, { rel });
        this.lig = l.num(v.lig, { rel });
        this.css = l.str("");
        this.update();
    }
    ;
    update() {
        const css = `hsl( ${this.hue.value}, ${r(this.sat.value)}, ${r(this.lig.value)} )`;
        this.css.value = css;
    }
}
const r = (v) => String(Math.round(v * 100 * 10000) / 10000) + "%";
export const HSLRange = (data) => {
    const { div } = ef;
    const conv = (value) => String(Math.round(value * 100));
    return div({ class: "hsl-range" }, Range.UI({ title: "Hue", value: data.hue, max: 360 }), Range.UI({ title: "Sat", value: data.sat, max: 1, step: 0.01, conv, unit: "%" }), Range.UI({ title: "Light", value: data.lig, max: 1, step: 0.01, conv, unit: "%" }));
};
export const HSLApplet = (value = new Branch) => {
    const { div, h2, span } = ef;
    return div({ class: "applet" }, h2("HSLApplet"), div({ class: "applet-body" }, HSLRange(value), div({
        style: { background: value.css, height: "300px", borderRadius: "1ex",
            display: "flex", alignItems: "center", justifyContent: "space-around" }
    }, span({ style: { color: "hsl( 0, 0%, 0% )", flexGrow: "1fr" } }, value.css), span({ style: { color: "hsl( 0, 0%, 100% )", flexGrow: "1fr" } }, value.css))));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvaHNsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxFQUFhLEVBQUUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBSVAsTUFBTSxPQUFPLE1BQU07SUFFbEIsR0FBRyxDQUFDO0lBQUMsR0FBRyxDQUFDO0lBQUMsR0FBRyxDQUFDO0lBQ2QsR0FBRyxDQUFDO0lBRUosWUFBYSxJQUFVLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7UUFFeEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQUEsQ0FBQztJQUVGLE1BQU07UUFFTCxNQUFNLEdBQUcsR0FBRyxRQUFTLElBQUksQ0FBQyxHQUFHLENB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