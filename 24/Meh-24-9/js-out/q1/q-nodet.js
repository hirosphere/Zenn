import { dom, Leaf, ef, free } from "../meh/index.js";
export const main = () => {
    dom.add(view.Applet1(), "body");
};
var models;
(function (models) {
    class Applet1 {
        text = new Leaf.str("常磐線で行こう");
        clist = {
            selected: new Leaf.bool(true),
            shadowed: new Leaf.bool(false),
            green: new Leaf.bool(false),
            cyan: new Leaf.bool(true),
        };
        color = new HSL();
    }
    models.Applet1 = Applet1;
    const flex = { "align-items": "flex-start" };
    class HSL {
        hue = new Leaf.num(0, this);
        sat = new Leaf.num(0, this);
        light = new Leaf.num(0, this);
        css = new Leaf.str("");
        set value(lit) {
            this.hue.value = lit.hue;
            this.sat.value = lit.sat;
            this.light.value = lit.light;
        }
        get value() {
            const value = {
                hue: this.hue.value,
                sat: this.sat.value,
                light: this.light.value,
            };
            return value;
        }
        update() {
            const { hue, sat, light } = this.value;
            this.css.value = `hsl( ${hue}, ${sat}, ${light} )`;
        }
    }
    models.HSL = HSL;
})(models || (models = {}));
var view;
(function (view) {
    view.Applet1 = () => {
        const model = new models.Applet1();
        const fr = free();
        return ef.article({}, ef.h1("Meh Quest : Leaf"), ef.section({}, ef.p({ class: model.clist }, model.text)), ef.section({ class: "gap", }, v_button("v1", model.text, "日暮里 にっぽり"), v_button("v2", model.text, "三河島 みかわしま"), v_button("v3", model.text, "南千住 みなみせんじゅ"), v_button("v4", model.text, "北千住 きたせんじゅ"), v_button("v5", model.text, "綾瀬 あやせ")), ef.section({ class: "gap", style: {} }, check("Selected", model.clist.selected), check("Shadowed", model.clist.shadowed), check("Green", model.clist.green), check("Cyan", model.clist.cyan)), ef.p(ef.span("span")));
    };
    const s = { display: new Leaf.str("") };
    const v_button = (label, leaf, value) => ef.button({ acts: { click() { leaf.value = value; } } }, label);
    const check = (label, leaf) => ef.section(ef.label(label), ef.input({
        attrs: {
            type: "checkbox",
            checked: leaf.value,
        },
        props: { checked: leaf, },
        acts: {
            change(ev) {
                if (!(ev.target instanceof HTMLInputElement))
                    return;
                leaf.value = ev.target.checked;
            }
        }
    }));
})(view || (view = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicS1ub2RldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9xMS9xLW5vZGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFRLEVBQUUsRUFBUSxJQUFJLEVBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUU3RSxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO0lBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLElBQVUsTUFBTSxDQWtFZjtBQWxFRCxXQUFVLE1BQU07SUFFZixNQUFhLE9BQU87UUFFbkIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBRSxTQUFTLENBQUUsQ0FBQztRQUVqQyxLQUFLLEdBQ0w7WUFDQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRTtZQUMvQixRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRTtZQUNoQyxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLEtBQUssQ0FBRTtZQUM3QixJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRTtTQUMzQixDQUFDO1FBRUYsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7S0FDbEI7SUFiWSxjQUFPLFVBYW5CLENBQUE7SUFTRCxNQUFNLElBQUksR0FBYSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsQ0FBQztJQVN2RCxNQUFhLEdBQUc7UUFFZixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxJQUFJLENBQUUsQ0FBQztRQUM5QixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxJQUFJLENBQUUs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