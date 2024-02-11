import { Exist, Branch, Leafr, _setvalue, Leaf, ef } from "../meh/index.js";
import * as Range from "./ui-range.js";
export class Model extends Branch {
    hue;
    sat;
    light;
    constructor(owner, a) {
        super(owner);
        this.hue = new Leaf.Number(this, a.hue);
        this.sat = new Leaf.Number(this, a.sat);
        this.light = new Leaf.Number(this, a.light);
        this.update();
    }
    css = new Leafr.String(this, "");
    update() {
        this.css[_setvalue](`hsl( ${this.hue.v}, ${this.sat.v * 100}%, ${this.light.v * 100}% )`);
    }
}
const tol = (v) => String(v * 100).replace(/\.d/, "");
export class VM extends Exist {
    hue;
    sat;
    light;
    constructor(owner, m) {
        super(owner);
        this.hue = new Range.VM(this, { title: "Hue", value: m.hue, max: 360 });
        this.sat = new Range.VM(this, { title: "Sat", value: m.sat, unit: "%", max: 1, step: 0.01, tol });
        this.light = new Range.VM(this, { title: "Light", value: m.light, unit: "%", max: 1, step: 0.01, tol });
    }
}
export var UI;
(function (UI) {
    UI.HSLRange = (vm) => {
        return ef.section({ class: "hsl-range" }, Range.UI(vm.hue), Range.UI(vm.sat), Range.UI(vm.light));
    };
})(UI || (UI = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2hzbC1xdWVzdC9oc2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkYsT0FBTyxLQUFLLEtBQUssTUFBTSxlQUFlLENBQUM7QUFXdkMsTUFBTSxPQUFPLEtBQU0sU0FBUSxNQUFNO0lBRWhDLEdBQUcsQ0FBRTtJQUFDLEdBQUcsQ0FBRTtJQUFDLEtBQUssQ0FBRTtJQUVuQixZQUFhLEtBQWEsRUFBRSxDQUFxQjtRQUVoRCxLQUFLLENBQUUsS0FBSyxDQUFFLENBQUM7UUFFZixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUU5QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRWUsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsRUFBRSxDQUFFLENBQUM7SUFFbkMsTUFBTTtRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFFLFNBQVMsQ0FBRSxDQUFFLFFBQVMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFFLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBSSxNQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUksS0FBSyxDQUFFLENBQUM7SUFDckcsQ0FBQztDQUNEO0FBR0QsTUFBTSxHQUFHLEdBQUcsQ0FBRSxDQUFVLEVBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBRSxDQUFDLEdBQUcsR0FBRyxDQUFFLENBQUMsT0FBTyxDQUFFLEtBQUssRUFBRSxFQUFFLENBQUUsQ0FBQztBQUVyRSxNQUFNLE9BQU8sRUFBRyxTQUFRLEtBQUs7SUFFbkIsR0FBRyxDQUFFO0lBQ0wsR0FBRyxDQUFFO0lBQ0wsS0FBSyxDQUFFO0lBRWhCLFlBQWEsS0FBYSxFQUFFLENBQVM7UUFFcEMsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFDcEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO0lBQzNHLENBQUM7Q0FDRDtBQUVELE1BQU0sS0FBVyxFQUFFLENBYWxCO0FBYkQsV0FBaUIsRUFBRTtJQUVMLFdBQVEsR0FBRyxDQUFFLEVBQU8sRUFBRyxFQUFFO1FBRXJDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FFaEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBRXRCLEtBQUssQ0FBQyxFQUFFLENBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBRSxFQUNsQixLQUFLLENBQUMsRUFBRSxDQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUUsRUFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFFLENBQ3BCLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBYmdCLEVBQUUsS0FBRixFQUFFLFFBYWxCIn0=