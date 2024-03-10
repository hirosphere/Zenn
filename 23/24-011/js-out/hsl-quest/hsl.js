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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHNsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL2hzbC1xdWVzdC9oc2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFrQixLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVGLE9BQU8sS0FBSyxLQUFLLE1BQU0sZUFBZSxDQUFDO0FBV3ZDLE1BQU0sT0FBTyxLQUFNLFNBQVEsTUFBTTtJQUVoQyxHQUFHLENBQUU7SUFBQyxHQUFHLENBQUU7SUFBQyxLQUFLLENBQUU7SUFFbkIsWUFBYSxLQUFzQixFQUFFLENBQXFCO1FBRXpELEtBQUssQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUVmLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFZSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxFQUFFLENBQUUsQ0FBQztJQUVuQyxNQUFNO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUUsUUFBUyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUUsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFJLE1BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBSSxLQUFLLENBQUUsQ0FBQztJQUNyRyxDQUFDO0NBQ0Q7QUFHRCxNQUFNLEdBQUcsR0FBRyxDQUFFLENBQVUsRUFBRyxFQUFFLENBQUMsTUFBTSxDQUFFLENBQUMsR0FBRyxHQUFHLENBQUUsQ0FBQyxPQUFPLENBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBRSxDQUFDO0FBRXJFLE1BQU0sT0FBTyxFQUFHLFNBQVEsS0FBSztJQUVuQixHQUFHLENBQUU7SUFDTCxHQUFHLENBQUU7SUFDTCxLQUFLLENBQUU7SUFFaEIsWUFBYSxLQUFzQixFQUFFLENBQVM7UUFFN0MsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFDcEcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBRSxDQUFDO0lBQzNHLENBQUM7Q0FDRDtBQUVELE1BQU0sS0FBVyxFQUFFLENBYWxCO0FBYkQsV0FBaUIsRUFBRTtJQUVMLFdBQVEsR0FBRyxDQUFFLEVBQU8sRUFBRyxFQUFFO1FBRXJDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FFaEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBRXRCLEtBQUssQ0FBQyxFQUFFLENBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBRSxFQUNsQixLQUFLLENBQUMsRUFBRSxDQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUUsRUFDbEIsS0FBSyxDQUFDLEVBQUUsQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFFLENBQ3BCLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBYmdCLEVBQUUsS0FBRixFQUFFLFFBYWxCIn0=