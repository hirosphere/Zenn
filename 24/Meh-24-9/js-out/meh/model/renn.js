import { _refs_, _set_value_, log } from "../common.js";
import { Leafr } from "./leaf.js";
export class Renn {
    constructor(items) {
        if (items)
            this.new(items);
    }
    orders = [];
    [_refs_] = new Set;
    add_ref(ref) {
        this[_refs_].add(ref);
        ref.add({
            src: this,
            start: 0,
            next: this.orders.length,
        });
    }
    new(srcs, start) {
        start = pos_trim(start, this.orders);
        this.orders.splice(start, 0, ...srcs.map(src => new Order(src)));
        this.update_orders(start, this.orders.length);
        const note = {
            src: this,
            start,
            next: start + srcs.length
        };
        log("new", note);
        this[_refs_].forEach(ref => ref.add(note));
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
export class Order extends Leafr {
    src;
    constructor(src, order = undefined) {
        super(order);
        this.src = src;
    }
    _count_;
    get count() {
        return this._count_ ??= new Leafr.Conv(this, to_count);
    }
}
const to_count = (pos) => (typeof pos == "number" ? pos + 1 : pos);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvcmVubi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssRUFBUSxNQUFNLFdBQVcsQ0FBQztBQUV4QyxNQUFNLE9BQU8sSUFBSTtJQUVoQixZQUFhLEtBQWM7UUFFMUIsSUFBSSxLQUFLO1lBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUMvQixDQUFDO0lBRWUsTUFBTSxHQUFvQixFQUFFLENBQUU7SUFDcEMsQ0FBRSxNQUFNLENBQUUsR0FBRyxJQUFJLEdBQXNCLENBQUU7SUFFM0MsT0FBTyxDQUFFLEdBQW9CO1FBRXBDLElBQUksQ0FBRyxNQUFNLENBQUUsQ0FBRSxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7UUFFOUIsR0FBRyxDQUFDLEdBQUcsQ0FFTjtZQUNDLEdBQUcsRUFBRyxJQUFJO1lBQ1YsS0FBSyxFQUFHLENBQUM7WUFDVCxJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1NBQ3pCLENBQ0QsQ0FBQztJQUNGLENBQUM7SUFFSyxHQUFHLENBRVQsSUFBVyxFQUNYLEtBQW1CO1FBSW5CLEtBQUssR0FBRyxRQUFRLENBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBRTtRQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FFakIsS0FBSyxFQUFFLENBQUMsRUFDUixHQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBRSxDQUN2QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUUsQ0FBRTtRQUVqRCxNQUFNLElBQUksR0FDVjtZQUNDLEdBQUcsRUFBRyxJQUFJO1lBQ1YsS0FBSztZQUNMLElBQUksRUFBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU07U0FDMUIsQ0FBRTtRQUVILEdBQUcsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUE7UUFFbEIsSUFBSSxDQUFHLE1BQU0sQ0FBRSxDQUFFLE9BQU8sQ0FFdkIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVTLGFBQWEsQ0FFdEIsS0FBYyxFQUNkLElBQWE7UUFHYixLQUVDLElBQUksR0FBRyxHQUFHLEtBQUssRUFDZixHQUFHLEdBQUcsSUFBSSxFQUNWLEdBQUcsRUFBRyxFQUVQO1lBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBRyxHQUFHLENBQUUsQ0FBRyxXQUFXLENBQUUsQ0FBRyxHQUFHLENBQUUsQ0FBQztTQUM1QztJQUNGLENBQUM7Q0FDRDtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUUsR0FBZSxFQUFFLEVBQWtCLEVBQUcsRUFBRTtJQUUxRCxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNO1FBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFFO0lBQy9ELElBQUksR0FBRyxHQUFHLENBQUM7UUFBSSxPQUFPLENBQUMsQ0FBRTtJQUN6QixPQUFPLEdBQUcsQ0FBRTtBQUNiLENBQUMsQ0FBQTtBQUVELFdBQWlCLElBQUk7SUFFcEIsTUFBYSxHQUFHO1FBRVIsR0FBRyxDQUFHLEtBQW1CLElBQUksQ0FBQztRQUM5QixNQUFNLENBQUcsS0FBbUIsSUFBSSxDQUFDO0tBQ3hDO0lBSlksUUFBRyxNQUlmLENBQUE7QUFRRixDQUFDLEVBZGdCLElBQUksS0FBSixJQUFJLFFBY3BCO0FBSUQsS0FBSztBQUVMLE1BQU0sT0FBTyxLQUFZLFNBQVEsS0FBbUI7SUFJbEM7SUFGakIsWUFFaUIsR0FBTyxFQUN2QixRQUFvQixTQUFTO1FBRzdCLEtBQUssQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUpDLFFBQUcsR0FBSCxHQUFHLENBQUk7SUFLeEIsQ0FBQztJQUVTLE9BQU8sQ0FBK0I7SUFFaEQsSUFBVyxLQUFLO1FBRWYsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FFckMsSUFBSSxFQUNKLFFBQVEsQ0FDUixDQUFBO0lBQ0YsQ0FBQztDQUNEO0FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBRSxHQUFlLEVBQWUsRUFBRSxDQUNuRCxDQUNDLE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUN0QyxDQUFDIn0=