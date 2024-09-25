import { dom, Leaf, ef } from "../meh/index.js";
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
            cyan: new Leaf.bool(false),
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
        return ef.article({}, ef.h1("Meh Quest : Leaf"), ef.section({}, ef.p({ class: model.clist }, model.text)), ef.section({ class: "gap", }, v_button("v1", model.text, "日暮里 にっぽり"), v_button("v1", model.text, "三河島 みかわしま"), v_button("v1", model.text, "南千住 みなみせんじゅ")), ef.section({ class: "gap", style: { flexDirection: "" } }, check("Selected", model.clist.selected), check("Shadowed", model.clist.shadowed), check("Green", model.clist.green), check("Cyan", model.clist.cyan)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicS1ub2RldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9xMS9xLW5vZGV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBTyxNQUFNLGlCQUFpQixDQUFDO0FBRXJELE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFFeEIsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFFLENBQUM7QUFDbkMsQ0FBQyxDQUFDO0FBRUYsSUFBVSxNQUFNLENBa0VmO0FBbEVELFdBQVUsTUFBTTtJQUVmLE1BQWEsT0FBTztRQUVuQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFFLFNBQVMsQ0FBRSxDQUFDO1FBRWpDLEtBQUssR0FDTDtZQUNDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFO1lBQy9CLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFO1lBQ2hDLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFO1lBQzdCLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFO1NBQzVCLENBQUM7UUFFRixLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUNsQjtJQWJZLGNBQU8sVUFhbkIsQ0FBQTtJQVNELE1BQU0sSUFBSSxHQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxDQUFDO0lBU3ZELE1BQWEsR0FBRztRQUVmLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLElBQUksQ0FBRSxDQUFDO1FBQzlCLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLElBQUksQ0FBRSxDQUFDO1FBQzlC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