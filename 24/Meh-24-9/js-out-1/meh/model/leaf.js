import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
/* */
export class Leafr {
    /*   */
    static new(value, rel) {
        return new Leafr.Entity(value, rel);
    }
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
    class str extends Leafr {
    }
    Leafr.str = str;
    class num extends Leafr {
    }
    Leafr.num = num;
    class bool extends Leafr {
    }
    Leafr.bool = bool;
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
export var leafr;
(function (leafr) {
    class str extends Leafr.Entity {
    }
    leafr.str = str;
    ;
    class num extends Leafr.Entity {
    }
    leafr.num = num;
    ;
    class bool extends Leafr.Entity {
    }
    leafr.bool = bool;
    ;
})(leafr || (leafr = {}));
/* Leaf W/R */
export class Leaf extends Leafr {
    static new(value, rel) {
        return new this.Entity(value, rel);
    }
}
(function (Leaf) {
    class str extends Leaf {
    }
    Leaf.str = str;
    class num extends Leaf {
    }
    Leaf.num = num;
    class bool extends Leaf {
    }
    Leaf.bool = bool;
    class Entity extends Leafr.Entity {
        set value(new_value) { this[_set_value_](new_value); }
        get value() { return this[_value_]; }
    }
    Leaf.Entity = Entity;
})(Leaf || (Leaf = {}));
Leaf.str.new("").value = "";
export var leaf;
(function (leaf) {
    class str extends Leaf.Entity {
    }
    leaf.str = str;
    ;
    class num extends Leaf.Entity {
    }
    leaf.num = num;
    ;
    class bool extends Leaf.Entity {
    }
    leaf.bool = bool;
    ;
})(leaf || (leaf = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFPLE1BQU0sY0FBYyxDQUFDO0FBRXJHLEtBQUs7QUFFTCxNQUFNLE9BQWdCLEtBQUs7SUFFMUIsT0FBTztJQUVBLE1BQU0sQ0FBQyxHQUFHLENBQVMsS0FBUyxFQUFHLEdBQWlCO1FBRXRELE9BQU8sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFHLEtBQUssRUFBRyxHQUFHLENBQUUsQ0FBRTtJQUMxQyxDQUFDO0lBS1MsSUFBSSxHQUFHLElBQUksR0FBdUIsQ0FBRTtJQUU5QyxPQUFPO0lBRUEsQ0FBRSxTQUFTLENBQUUsQ0FFbkIsR0FBcUIsRUFDckIsU0FBZTtRQUlmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBRyxpQkFBaUIsQ0FBRSxDQUV4QixJQUFJLENBQUMsS0FBSyxFQUNWLFNBQVMsQ0FDVCxDQUFFO0lBQ0osQ0FBQztJQUdNLENBQUUsWUFBWSxDQUFFLENBQUcsR0FBcUI7UUFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekIsQ0FBQztDQUNEO0FBRUQsV0FBaUIsS0FBSztJQUVyQixNQUFhLEdBQUc7UUFJRTtRQUNOO1FBSFgsWUFFaUIsR0FBaUIsRUFDdkIsZUFBMEI7WUFEcEIsUUFBRyxHQUFILEdBQUcsQ0FBYztZQUN2QixvQkFBZSxHQUFmLGVBQWUsQ0FBVztRQUVwQyxDQUFDO1FBRUssQ0FBRSxpQkFBaUIsQ0FBRSxDQUUzQixTQUFhLEVBQ2IsU0FBZTtZQUdmLElBQUksQ0FBQyxlQUFlLENBRW5CLFNBQVMsRUFDVCxTQUFTLENBQ1QsQ0FBQztRQUNI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