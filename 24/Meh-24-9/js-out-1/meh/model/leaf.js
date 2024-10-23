import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
/* */
class Leafr {
    static create = leafr;
    refs = new Set;
    /*   */
    [_add_ref_](ref, old_value) {
        this.refs.add(ref);
        ref[_on_value_change_](this.value, old_value);
    }
    [_remove_ref_](ref) {
        this.refs.delete(ref);
    }
}
export { Leafr };
(function (Leafr) {
    class Ref {
        src;
        on_value_change;
        constructor(src, on_value_change) {
            this.src = src;
            this.on_value_change = on_value_change;
        }
        [_on_value_change_](new_value, old_value) {
            this.on_value_change(new_value, old_value);
        }
        term() { }
    }
    Leafr.Ref = Ref;
    /* */
    class Conv extends Leafr {
        toref;
        src_ref;
        constructor(src, toref) {
            super();
            this.toref = toref;
            const ref = this.src_ref = new Leafr.Ref(src, (new_value, old_value) => {
                this.notify(new_value, old_value);
            });
            src[_add_ref_](ref);
        }
        get value() {
            return this.toref(this.src_ref.src.value);
        }
        notify(new_value, old_value) {
            const new_r = this.toref(new_value);
            const old_r = (old_value !== undefined ?
                this.toref(old_value)
                : undefined);
            this.refs.forEach(ref => ref[_on_value_change_](new_r, old_r));
        }
    }
    Leafr.Conv = Conv;
    /*  Entity  */
    class Entity extends Leafr {
        rel;
        [_value_];
        constructor(value, rel) {
            super();
            this.rel = rel;
            this[_value_] = value;
        }
        get value() {
            return this[_value_];
        }
        [_set_value_](new_value) {
            if (new_value === this.value)
                return;
            const old_value = this[_value_];
            this[_value_] = new_value;
            this.rel?.update();
            this.refs.forEach(ref => ref[_on_value_change_](new_value, old_value));
        }
    }
    Leafr.Entity = Entity;
})(Leafr || (Leafr = {}));
/* */
export function leafr(value, rel) {
    return new Leafr.Entity(value, rel);
}
(function (leafr) {
    leafr.str = (leafr);
    leafr.num = (leafr);
    leafr.bool = (leafr);
})(leafr || (leafr = {}));
/* Leaf W/R */
class Leaf extends Leafr {
    static create = leaf;
}
export { Leaf };
(function (Leaf) {
    class Entity extends Leafr.Entity {
        set value(new_value) { this[_set_value_](new_value); }
        get value() { return this[_value_]; }
    }
    Leaf.Entity = Entity;
})(Leaf || (Leaf = {}));
export function leaf(value, rel) {
    return new Leaf.Entity(value, rel);
}
(function (leaf) {
    leaf.str = (leaf);
    leaf.num = (leaf);
    leaf.bool = (leaf);
})(leaf || (leaf = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFPLE1BQU0sY0FBYyxDQUFDO0FBRXJHLEtBQUs7QUFFTCxNQUFzQixLQUFLO0lBRW5CLE1BQU0sQ0FBVSxNQUFNLEdBQUcsS0FBSyxDQUFFO0lBSzdCLElBQUksR0FBRyxJQUFJLEdBQXVCLENBQUU7SUFFOUMsT0FBTztJQUVBLENBQUUsU0FBUyxDQUFFLENBRW5CLEdBQXFCLEVBQ3JCLFNBQWU7UUFJZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUNyQixHQUFHLENBQUcsaUJBQWlCLENBQUUsQ0FFeEIsSUFBSSxDQUFDLEtBQUssRUFDVixTQUFTLENBQ1QsQ0FBRTtJQUNKLENBQUM7SUFHTSxDQUFFLFlBQVksQ0FBRSxDQUFHLEdBQXFCO1FBRTlDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ3pCLENBQUM7O1NBOUJvQixLQUFLO0FBaUMzQixXQUFpQixLQUFLO0lBRXJCLE1BQWEsR0FBRztRQUlFO1FBQ047UUFIWCxZQUVpQixHQUFpQixFQUN2QixlQUEwQjtZQURwQixRQUFHLEdBQUgsR0FBRyxDQUFjO1lBQ3ZCLG9CQUFlLEdBQWYsZUFBZSxDQUFXO1FBRXBDLENBQUM7UUFFSyxDQUFFLGlCQUFpQixDQUFFLENBRTNCLFNBQWEsRUFDYixTQUFlO1lBR2YsSUFBSSxDQUFDLGVBQWUsQ0FFbkIsU0FBUyxFQUNULFNBQVMsQ0FDVCxDQUFDO1FBQ0gsQ0FBQztRQUVNLElBQUksS0FBSSxDQUFDO0tBQ2hCO0lBdkJZLFNBQUcsTUF1QmYsQ0FBQTtJQWFELEtBQUs7SUFFTCxNQUFhLElBQWtCLFNB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