import { _refs_, _set_value_, log } from "../common.js";
import { Leafr } from "./leaf.js";
export class Renn {
    constructor(items) {
        if (items)
            this.new(items);
    }
    length = Leafr.new(0);
    orders = [];
    [_refs_] = new Set;
    add_ref(ref) {
        this[_refs_].add(ref);
        ref.add({
            src: this,
            start: 0,
            next: this.orders.length,
            orders: this.orders,
        });
    }
    clear() {
        this.remove(0, this.orders.length);
    }
    new(srcs, start) {
        start = pos_trim(start, this.orders);
        const orders = srcs.map(src => new Order(this, src));
        this.orders.splice(start, 0, ...orders);
        this.update_orders(start, this.orders.length);
        const note = {
            src: this,
            start,
            next: start + srcs.length,
            orders,
        };
        this[_refs_].forEach(ref => ref.add(note));
        this.length[_set_value_](this.orders.length);
    }
    remove(start, count) {
        const next = pos_trim(start + count, this.orders);
        start = pos_trim(start, this.orders);
        const orders = this.orders.splice(start, next - start);
        orders.forEach(order => order[_set_renn_]());
        this.update_orders(start, this.orders.length);
        const note = {
            src: this,
            start,
            next,
            orders,
        };
        log(start, next);
        this[_refs_].forEach(ref => ref.remove(note));
        this.length[_set_value_](this.orders.length);
    }
    update_orders(start, next) {
        for (let pos = start; pos < next; pos++) {
            this.orders[pos][_set_value_](pos);
        }
    }
}
const pos_trim = (pos, ar) => {
    if (pos === undefined || pos >= ar.length)
        return ar.length;
    if (pos < 0)
        return 0;
    return pos;
};
(function (Renn) {
    class Ref {
        add(range) { }
        remove(range) { }
    }
    Renn.Ref = Ref;
})(Renn || (Renn = {}));
/* */
export const _set_renn_ = Symbol();
export class Order extends Leafr.Entity {
    renn;
    src;
    constructor(renn, src) {
        super(undefined);
        this.renn = renn;
        this.src = src;
    }
    _count_;
    get count() {
        return this._count_ ??= new Leafr.Conv(this, to_count);
    }
    [_set_renn_](renn) {
        this.renn = renn;
    }
    remove() {
        this.value !== undefined &&
            (this.renn?.remove(this.value, 1));
    }
    term() {
        this.renn = undefined;
    }
}
const to_count = (pos) => (typeof pos == "number" ? pos + 1 : pos);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvcmVubi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLE9BQU8sSUFBSTtJQUVoQixZQUFhLEtBQWM7UUFFMUIsSUFBSSxLQUFLO1lBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUMvQixDQUFDO0lBRWUsTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFFLENBQUM7SUFDekIsTUFBTSxHQUFvQixFQUFFLENBQUU7SUFDcEMsQ0FBRSxNQUFNLENBQUUsR0FBRyxJQUFJLEdBQXNCLENBQUU7SUFFM0MsT0FBTyxDQUFFLEdBQW9CO1FBRXBDLElBQUksQ0FBRyxNQUFNLENBQUUsQ0FBRSxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7UUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FFTjtZQUNDLEdBQUcsRUFBRyxJQUFJO1lBQ1YsS0FBSyxFQUFHLENBQUM7WUFDVCxJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQ3pCLE1BQU0sRUFBRyxJQUFJLENBQUMsTUFBTTtTQUNwQixDQUNELENBQUM7SUFDSCxDQUFDO0lBRU0sS0FBSztRQUVYLElBQUksQ0FBQyxNQUFNLENBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUU7SUFDeEMsQ0FBQztJQUVNLEdBQUcsQ0FFVCxJQUFXLEVBQ1gsS0FBbUI7UUFJbkIsS0FBSyxHQUFHLFFBQVEsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFFO1FBRXhDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFH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