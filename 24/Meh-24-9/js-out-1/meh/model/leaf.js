import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
export function leaf(value, rel) {
    return new leaf.Entity(value, rel);
}
/* */
(function (leaf) {
    function r(value, rel) {
        return new r.Entity(value, rel);
    }
    leaf.r = r;
})(leaf || (leaf = {}));
(function (leaf) {
    var r;
    (function (r) {
        class Leaf {
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
        r.Leaf = Leaf;
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var r;
    (function (r) {
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
        r.Ref = Ref;
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var r;
    (function (r) {
        class Conv extends r.Leaf {
            toref;
            src_ref;
            constructor(src, toref) {
                super();
                this.toref = toref;
                const ref = this.src_ref = new r.Ref(src, (new_value, old_value) => {
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
        r.Conv = Conv;
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var r;
    (function (r) {
        /*  Entity  */
        class Entity extends r.Leaf {
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
        r.Entity = Entity;
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var r;
    (function (r) {
        r.str = (r);
        r.num = (r);
        r.bool = (r);
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
/* Leaf W/R */
(function (leaf) {
    class Leaf extends leaf.r.Leaf {
    }
    leaf.Leaf = Leaf;
    class Entity extends leaf.r.Entity {
        set value(new_value) { this[_set_value_](new_value); }
        get value() { return this[_value_]; }
    }
    leaf.Entity = Entity;
    /* */
    leaf.str = (leaf);
    leaf.num = (leaf);
    leaf.bool = (leaf);
})(leaf || (leaf = {}));
class Leaf extends leaf.Leaf {
}
const x = leaf("");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFPLE1BQU0sY0FBYyxDQUFDO0FBRXJHLE1BQU0sVUFBVSxJQUFJLENBRW5CLEtBQVMsRUFDVCxHQUFrQjtJQUdsQixPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRyxLQUFLLEVBQUUsR0FBRyxDQUFFLENBQUU7QUFDeEMsQ0FBQztBQUVELEtBQUs7QUFFTCxXQUFpQixJQUFJO0lBRXBCLFNBQWdCLENBQUMsQ0FFaEIsS0FBUyxFQUNULEdBQWtCO1FBR2xCLE9BQU8sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFHLEtBQUssRUFBRSxHQUFHLENBQUUsQ0FBRTtJQUNyQyxDQUFDO0lBUGUsTUFBQyxJQU9oQixDQUFBO0FBQ0YsQ0FBQyxFQVZnQixJQUFJLEtBQUosSUFBSSxRQVVwQjtBQUVELFdBQWlCLElBQUk7SUFBQyxJQUFBLENBQUMsQ0FnRHRCO0lBaERxQixXQUFBLENBQUM7UUFFdEIsTUFBc0IsSUFBSTtZQUtmLElBQUksR0FBRyxJQUFJLEdBQWlCLENBQUU7WUFFeEMsT0FBTztZQUVBLENBQUUsU0FBUyxDQUFFLENBRW5CLEdBQWUsRUFDZixTQUFlO2dCQUlmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxDQUFDO2dCQUNyQixHQUFHLENBQUcsaUJBQWlCLENBQUUsQ0FFeEIsSUFBSSxDQUFDLEtBQUssRUFDVixTQUFTLENBQ1QsQ0FBQztZQUNILENBQUM7WUFHTSxDQUFFLFlBQVksQ0FBRSxDQUFHLEdBQWU7Z0JBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBRSxDQUFDO1lBQ3pCLENBQUM7U0FDRDtRQTdCcUIs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