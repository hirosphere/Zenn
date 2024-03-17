import { Branch, ef, Leafr, Leaf, _setvalue } from "../meh/index.js";
const mkleaf = (lol, owner) => {
    return lol instanceof Leaf ? lol : new Leaf(owner, lol);
};
const deftol = (v) => String(v);
export class VM extends Branch {
    title;
    value;
    unit;
    min;
    max;
    step;
    tol;
    labelvalue = new Leafr.String(this, "lvvvv");
    constructor(owner, a) {
        super(owner);
        Leafr.make;
        Leaf.make;
        this.title = mkleaf(a.title ?? "", this);
        this.value = mkleaf(a.value ?? 0, this);
        this.unit = mkleaf(a.unit ?? "", this);
        this.min = mkleaf(a.min ?? 0, this);
        this.max = mkleaf(a.max ?? 100, this);
        this.step = mkleaf(a.step ?? 1, this);
        this.tol = Leaf.make(this, a.tol ?? deftol);
        this.update();
    }
    update() {
        this.labelvalue[_setvalue](this.tol.val(this.value.val));
    }
}
export const UI = (vm) => {
    const { value, min, max, step } = vm;
    const inputact = (ev) => {
        if (!(ev.target instanceof HTMLInputElement))
            return;
        value.set(Number(ev.target.value));
    };
    return ef.section({ class: "range" }, ef.span({ class: "_title" }, vm.title), ef.input({
        class: "_input",
        attrs: { type: "range" },
        props: { value, min, max, step },
        acts: { input: inputact }
    }), ef.span({ class: "_valueunit" }, ef.span({ class: "_value" }, vm.labelvalue), ef.span({ class: "_unit" }, vm.unit)));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy1zcmMvaHNsLXF1ZXN0L3VpLXJhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBUyxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFZNUUsTUFBTSxNQUFNLEdBQUcsQ0FBUSxHQUFvQixFQUFFLEtBQXVCLEVBQUcsRUFBRTtJQUV4RSxPQUFPLEdBQUcsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQVMsS0FBSyxFQUFFLEdBQUcsQ0FBRSxDQUFDO0FBQ2xFLENBQUMsQ0FBQztBQWtCRixNQUFNLE1BQU0sR0FBRyxDQUFFLENBQVUsRUFBRyxFQUFFLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFDO0FBRTdDLE1BQU0sT0FBTyxFQUFHLFNBQVEsTUFBTTtJQUU3QixLQUFLLENBQUU7SUFBQyxLQUFLLENBQUU7SUFBQyxJQUFJLENBQUU7SUFBQyxHQUFHLENBQUU7SUFBQyxHQUFHLENBQUU7SUFBQyxJQUFJLENBQUU7SUFBQyxHQUFHLENBQUM7SUFFOUMsVUFBVSxHQUFHLElBQUssS0FBSyxDQUFDLE1BQU0sQ0FBRSxJQUFJLEVBQUUsT0FBTyxDQUFFLENBQUM7SUFFaEQsWUFBYSxLQUF1QixFQUFFLENBQW9CO1FBRXpELEtBQUssQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUVmLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRVYsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFZSxNQUFNO1FBRXJCLElBQUksQ0FBQyxVQUFVLENBQUUsU0FBUyxDQUFFLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBRSxDQUFDO0lBQ2hFLENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFFLEVBQU8sRUFBRyxFQUFFO0lBRS9CLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFFckMsTUFBTSxRQUFRLEdBQUcsQ0FBRSxFQUFVLEVBQUcsRUFBRTtRQUVqQyxJQUFJLENBQUUsQ0FBRSxFQUFFLENBQUMsTUFBTSxZQUFZLGdCQUFnQixDQUFFO1lBQUksT0FBTztRQUUxRCxLQUFLLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBRSxDQUFFLENBQUM7SUFDeEMsQ0FBQyxDQUFBO0lBRUQsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFFbEIsRUFBRSxDQUFDLElBQUksQ0FBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFFLEVBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBRVA7UUFDQyxLQUFLLEVBQUUsUUFBUTtRQUNmLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7UUFDeEIsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO1FBQ2hDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7S0FDekIsQ0FDRCxFQUNELEVBQUUsQ0FBQyxJQUFJLENBRU4sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEVBRXZCLEVBQUUsQ0FBQyxJQUFJLENBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBRSxFQUM3QyxFQUFFLENBQUMsSUFBSSxDQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FDdEMsQ0FDRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=