import { Exist } from "./exist.js";
import { Leafr } from "./leaf.js";
import { _composition, _setvalue, _refs } from "../shadow-props.js";
const log = console.log;
/** class Renn */
export class Renn extends Exist {
    /* static */
    static from(composition, sources) {
        return new Renn(composition, sources);
    }
    /* constructor */
    constructor(composition, sources) {
        super(composition);
        sources && this.new_orders(sources);
    }
    /* props */
    get orders() {
        return this.p_orders;
    }
    p_orders = new Array;
    /* */
    for_each(act) {
        this.p_orders.forEach(order => act(order));
    }
    /* */
    new_orders(sources, start) {
        const old_next = this.p_orders.length;
        const new_start = Math.min(Math.max(0, start ?? old_next), old_next);
        const new_count = sources.length;
        const new_next = new_start + new_count;
        const start_order = this.p_orders[new_start];
        let new_orders = sources.map((src, i) => new Order(this, new_start + i, src));
        this.p_orders.splice(new_start, 0, ...new_orders);
        this.update_orders(new_next);
        this.notify(ref => ref.on_new_order(start_order, new_orders));
        new_orders.length = 0;
    }
    move(order, dest) {
        if (order[_composition] != this)
            return;
    }
    delete(start, count = 1) {
        if (start >= this.p_orders.length)
            return;
        let dels = this.p_orders.splice(start, count);
        this.update_orders(start);
        this.notify(ref => ref.on_old_order(dels));
        dels.forEach(order => order.terminate());
        dels.length = 0;
    }
    clear() {
        this.delete(0, this.orders.length);
    }
    /* */
    update_orders(start = 0, next = this.p_orders.length) {
        log("update", start, next);
        for (let pos = start; pos < next; pos++) {
            this.p_orders[pos]?.[_setvalue](pos);
        }
    }
    notify(act) {
        this[_refs].forEach(ref => (ref instanceof Renn.Ref) && act(ref));
    }
}
(function (Renn) {
    class Ref extends Exist.Ref {
        constructor(owner, acts, source) {
            super(owner, acts, source);
            this.on_new_order(undefined, source.orders);
        }
        on_new_order(start, orders) {
            this.acts?.create?.(start, orders);
        }
        on_move_order() {
            ;
        }
        on_old_order(list) {
            this.acts?.delete?.(list);
        }
        get acts() {
            return this.p_acts;
        }
    }
    Renn.Ref = Ref;
})(Renn || (Renn = {}));
/** class Order */
export class Order extends Leafr.Number {
    source;
    constructor(p_renn, pos, source) {
        super(p_renn, pos);
        this.source = source;
    }
    move(pos) {
        ;
    }
    delete() {
        this.renn?.delete(this.value);
    }
    get renn() {
        return (this[_composition] instanceof Renn) && this[_composition] || null;
    }
    terminate() {
        super.terminate();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvcmVubi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQXlCLEtBQUssRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNGLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFHeEIsaUJBQWlCO0FBRWpCLE1BQU0sT0FBTyxJQUErQixTQUFRLEtBQUs7SUFFeEQsWUFBWTtJQUVMLE1BQU0sQ0FBQyxJQUFJLENBRWpCLFdBQW1CLEVBQ25CLE9BQWM7UUFJZCxPQUFPLElBQUksSUFBSSxDQUFTLFdBQVcsRUFBRSxPQUFPLENBQUUsQ0FBQztJQUNoRCxDQUFDO0lBR0QsaUJBQWlCO0lBRWpCLFlBQWEsV0FBbUIsRUFBRSxPQUFnQjtRQUVqRCxLQUFLLENBQUUsV0FBVyxDQUFFLENBQUM7UUFFckIsT0FBTyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUUsT0FBTyxDQUFFLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVc7SUFFWCxJQUFXLE1BQU07UUFFaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RCLENBQUM7SUFFUyxRQUFRLEdBQUcsSUFBSSxLQUFxQixDQUFFO0lBRWhELEtBQUs7SUFFRSxRQUFRLENBQUUsR0FBcUM7UUFFckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUUsQ0FBQztJQUNoRCxDQUFDO0lBR0QsS0FBSztJQUVFLFVBQVUsQ0FBRSxPQUFjLEVBQUUsS0FBZ0I7UUFFbEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEs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