import { leaf as l, ef } from "./meh/index.js";
import { Range } from "./range.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMtc3JjL2hzbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBYSxFQUFFLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRW5DLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFJUCxNQUFNLE9BQU8sTUFBTTtJQUVsQixHQUFHLENBQUM7SUFBQyxHQUFHLENBQUM7SUFBQyxHQUFHLENBQUM7SUFDZCxHQUFHLENBQUM7SUFFSixZQUFhLElBQVUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtRQUV4RCxNQUFNLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFBQSxDQUFDO0lBRUYsTUFBTTtRQUVMLE1BQU0sR0FBRyxHQUFHLFFBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFNLEtBQU0sQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFHLEtBQU0sQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFHLElBQUksQ0FBQztRQUM3RixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7SUFDdEIsQ0FBQztDQUNEO0FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBRSxDQUFVLEVBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFFLEdBQUcsS0FBSyxDQUFFLEdBQUcsR0FBRyxDQUFDO0FBRWxGLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxDQUFFLElBQWEsRUFBRyxFQUFFO0lBRTNDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFbkIsTUFBTSxJQUFJLEdBQUcsQ0FBRSxLQUFjLEVBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLEtBQUssR0FBRyxHQUFHLENBQUUsQ0FBRSxDQUFDO0lBRXZFLE9BQU8sR0FBRyxDQUVULEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUN0QixLQUFLLENBQUMsRUFBRSxDQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUUsRUFDdkQsS0FBSyxDQUFDLEVBQUUsQ0FBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUUsRUFDbEYsS0FBSyxDQUFDLEVBQUUsQ0FBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FDcEYsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxDQUFFLFFBQWlCLElBQUksTUFBTSxFQUFHLEVBQUU7SUFFMUQsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBRTdCLE9BQU8sR0FBRyxDQUVULEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUNuQixFQUFFLENBQUUsV0FBVyxDQUFFLEVBQ2pCLEdBQUcsQ0FFRixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsRUFDeEIsUUFBUSxDQUFFLEtBQUssQ0FBRSxFQUNqQixHQUFHLENBRUY7UUFDQyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLO1lBQ3BFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFO0tBQ3ZFLEVBQ0QsSUFBSSxDQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUUsRUFDNUUsSUFBSSxDQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FDOUUsQ0FDRCxDQUNELENBQUM7QUFDSCxDQUFDLENBQUEifQ==