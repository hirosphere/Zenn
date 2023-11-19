import { ef, sf, each, Leaf, Lian, Order } from "../meh/index.js";
import { Range } from "../gui/range.js";
const log = console.log;
//  //
export const SVG1App = () => {
    const app = new models.App();
    const svg = sf.svg({
        attrs: { width: 400, height: 100, viewBox: "-200 -50 400 100" },
        style: { width: "100%", border: "3px solid hsl( 45, 4%, 94% )" },
    }, Colors(app.phase));
    return ef.article({ class: "applet" }, ef.h2("Color-1"), ef.div({ style: { display: "flex", flexDirection: "column", alignItems: "center" } }, svg, Control(app.phase)));
};
const Control = (mo) => {
    return ef.section(Range.UI({ title: "Arc", value: mo.arc, max: 72, step: 1 }), Range.UI({ title: "Start", value: mo.start, max: 360, step: 5 }), Range.UI({ title: "Span", value: mo.span, max: 360, step: 5 }));
};
const Colors = (mo) => {
    return sf.g(each(mo.shapes, shape => Circle(shape)));
};
const Circle = (model) => {
    log("Circle", model.color.css.val, model.posit.x.val);
    return sf.circle({
        attrs: { fill: model.color.css, cx: model.posit.x, cy: model.posit.y, r: 20 },
        acts: { click() { log(model.color.css.val); } }
    });
};
const Item = () => {
    ;
};
//  //
function loop(count, createItem) {
    const rt = new Array;
    for (let i = 0; i < count; i++)
        rt.push(createItem(i));
    return rt;
}
var models;
(function (models) {
    class App {
        phase = new Phase();
    }
    models.App = App;
    class Phase {
        arc = new Leaf.Number(6, { rel: () => this.update() });
        start = new Leaf.Number(120, { rel: () => this.update() });
        span = new Leaf.Number(60, { rel: () => this.update() });
        shapes = new Lian();
        constructor() {
            this.update();
        }
        update() {
            const nodect = this.arc.val + 1;
            const diffct = nodect - this.shapes.length;
            if (diffct > 0)
                this.shapes.insert(() => new Shape(), diffct);
            else
                this.shapes.removeOrders(nodect, -diffct);
            log("diffct", diffct, this.shapes.length);
            for (let i = 0; i <= this.arc.val; i++) {
                const arc = this.arc.v;
                const pos = arc ? (400 * i / arc) - 200 : 0;
                const hue = this.start.v + this.span.v * (arc ? i / arc : 0);
                log(i, hue);
                const shape = this.shapes[i];
                shape.color.h.v = hue;
                shape.posit.x.v = pos;
            }
        }
    }
    models.Phase = Phase;
    class Shape extends Order {
        color;
        posit;
        constructor(value) {
            super();
            this.color = new HSL(value?.color);
            this.posit = new Pos(value?.pos);
        }
    }
    models.Shape = Shape;
    class HSL {
        h;
        s;
        l;
        css;
        constructor(value = { h: 210, s: 0.65, l: 0.65 }) {
            const rel = () => this.update();
            this.h = new Leaf.Number(value.h, { rel });
            this.s = new Leaf.Number(value.s, { rel });
            this.l = new Leaf.Number(value.l, { rel });
            this.css = new Leaf.String("");
            this.update();
        }
        update() {
            this.css.v = `hsl( ${this.h.val}, ${this.s.val * 100}%, ${this.l.val * 100}%`;
        }
    }
    models.HSL = HSL;
    class Pos {
        x;
        y;
        constructor(value) {
            this.x = new Leaf.Number(value?.x ?? 0);
            this.y = new Leaf.Number(value?.y ?? 0);
        }
    }
    models.Pos = Pos;
})(models || (models = {}));
//  //
var Quest;
(function (Quest) {
    const createBranchClass = (srcproto) => {
        const newproto = {};
        return newproto;
    };
})(Quest || (Quest = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLTEtYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2FwcGxldHMvc3ZnLTEtYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBR3hCLE1BQU07QUFFTixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO0lBRTNCLE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTdCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDakIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRTtRQUMvRCxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSw4QkFBOEIsRUFBRTtLQUNoRSxFQUNELE1BQU0sQ0FBRSxHQUFHLENBQUMsS0FBSyxDQUFFLENBQ25CLENBQUM7SUFFRixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQ3JDLEVBQUUsQ0FBQyxFQUFFLENBQUUsU0FBUyxDQUFFLEVBQ2xCLEVBQUUsQ0FBQyxHQUFHLENBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQ3BGLEdBQUcsRUFDSCxPQUFPLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBRSxDQUNwQixDQUNELENB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QUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBRSxDQUFDO1FBRTNELE1BQU0sR0FBRyxJQUFJLElBQUksRUFBYSxDQUFDO1FBRS9DO1lBRUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU07WUFFTCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFHLENBQUM7Z0JBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUUsQ0FBQzs7Z0JBQzVELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFFLE1BQU0sRUFBRSxDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBR2xELEdBQUcsQ0FBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUM7WUFFNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRyxFQUN2QztnQkFDQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxH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