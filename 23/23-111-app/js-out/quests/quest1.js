import { Exist, root, Leaf, Branch } from "../meh/index.js";
const log = console.log;
export const main = () => {
    branch2.quest();
    // leaf1();
    // exist1();
};
var branch2;
(function (branch2) {
    branch2.quest = () => {
        const hsl = new HSLBranch(root);
        hsl.value = { hue: 90, sat: 0.5, light: 0.1 };
    };
    class HSLBranch extends Branch {
        hue;
        sat;
        light;
        css = new Leaf.String(this, "");
        constructor(owner, initv = { hue: 9, sat: 0.8, light: 0.9 }) {
            super(owner);
            this.hue = new Leaf.Number(this, initv.hue);
            this.sat = new Leaf.Number(this, initv.sat);
            this.light = new Leaf.Number(this, initv.light);
            this.update();
        }
        set value(newv) {
            this.hue.set(newv.hue, this);
            this.sat.set(newv.sat, this);
            this.light.set(newv.light, this);
            this.update();
        }
        update() {
            const css = `hsl( ${this.hue.v}, ${this.sat.v * 100}%, ${this.light.v * 100}% )`;
            this.css.v = css;
            log("HSL update", css);
        }
    }
})(branch2 || (branch2 = {}));
var branch1;
(function (branch1) {
    branch1.quest = () => {
        const hsl = new HSLBranch(root);
        hsl.hue.v = 60;
        hsl.sat.v = 0.8;
        hsl.light.v = 0.9;
    };
    class HSLBranch extends Branch {
        hue;
        sat;
        light;
        constructor(owner) {
            super(owner);
            this.hue = new Leaf.Number(this, 0);
            this.sat = new Leaf.Number(this, 0);
            this.light = new Leaf.Number(this, 0);
        }
        update() {
            log("HSL update");
        }
    }
})(branch1 || (branch1 = {}));
const leaf1 = () => {
    const branch = new Exist(root);
    const leaf1 = new Leaf.String(branch, "埼京線");
    const leaf2 = new Leaf.String(branch, "川越線");
    const ref1 = new Leaf.String.Ref();
    log(ref1.v);
    ref1.source = leaf2;
    ref1.v = "武蔵野線";
    ref1.v = "高崎線";
    ref1.v = "宇都宮線";
    log(ref1.v);
    branch.terminate();
};
const exist2 = () => {
    const exist1 = new Exist(root);
    const exist2 = new Exist(root);
    const ref1 = new Exist.Ref();
    ref1.source = exist1;
    ref1.source = exist2;
    ref1.source = undefined;
    const ref2 = new Exist.Ref();
    ref2.source = exist1;
    ref2.source = undefined;
    ref2.source = exist2;
    root.terminate();
};
const exist1 = () => {
    const exist1 = new Exist(root);
    const ref1 = new Exist.Ref();
    ref1.source = exist1;
    ref1.source = undefined;
    root.terminate();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3QxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMtc3JjL3F1ZXN0cy9xdWVzdDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRzNFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFeEIsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUV4QixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFaEIsV0FBVztJQUNYLFlBQVk7QUFDYixDQUFDLENBQUM7QUFFRixJQUFVLE9BQU8sQ0E0Q2hCO0FBNUNELFdBQVUsT0FBTztJQUVILGFBQUssR0FBRyxHQUFHLEVBQUU7UUFFekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUUsSUFBSSxDQUFFLENBQUM7UUFFbEMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBSUYsTUFBTSxTQUFVLFNBQVEsTUFBTTtRQUV0QixHQUFHLENBQUM7UUFDSixHQUFHLENBQUM7UUFDSixLQUFLLENBQUM7UUFFTixHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxFQUFFLENBQUUsQ0FBQztRQUV6QyxZQUFhLEtBQWEsRUFBRSxRQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFFekUsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUUs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