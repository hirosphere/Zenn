import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
export function leaf(value, rel) {
    return new leaf.Entity(value, rel);
}
/* */
(function (leaf) {
    function leafr(value, rel) {
        return new leafr.Entity(value, rel);
    }
    leaf.leafr = leafr;
})(leaf || (leaf = {}));
(function (leaf) {
    var leafr;
    (function (leafr) {
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
        leafr.Leaf = Leaf;
    })(leafr = leaf.leafr || (leaf.leafr = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var leafr;
    (function (leafr) {
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
        leafr.Ref = Ref;
    })(leafr = leaf.leafr || (leaf.leafr = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var leafr;
    (function (leafr) {
        class Conv extends leafr.Leaf {
            toref;
            src_ref;
            constructor(src, toref) {
                super();
                this.toref = toref;
                const ref = this.src_ref = new leafr.Ref(src, (new_value, old_value) => {
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
        leafr.Conv = Conv;
    })(leafr = leaf.leafr || (leaf.leafr = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var leafr;
    (function (leafr) {
        /*  Entity  */
        class Entity extends leafr.Leaf {
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
        leafr.Entity = Entity;
    })(leafr = leaf.leafr || (leaf.leafr = {}));
})(leaf || (leaf = {}));
(function (leaf) {
    var leafr;
    (function (leafr) {
        leafr.str = (leafr);
        leafr.num = (leafr);
        leafr.bool = (leafr);
    })(leafr = leaf.leafr || (leaf.leafr = {}));
})(leaf || (leaf = {}));
/* Leaf W/R */
(function (leaf) {
    class Leaf extends leaf.leafr.Leaf {
    }
    leaf.Leaf = Leaf;
    class Entity extends leaf.leafr.Entity {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZl8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL2xlYWZfLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQU8sTUFBTSxjQUFjLENBQUM7QUFFckcsTUFBTSxVQUFVLElBQUksQ0FFbkIsS0FBUyxFQUNULEdBQXNCO0lBR3RCLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFHLEtBQUssRUFBRSxHQUFHLENBQUUsQ0FBRTtBQUN4QyxDQUFDO0FBRUQsS0FBSztBQUVMLFdBQWlCLElBQUk7SUFFcEIsU0FBZ0IsS0FBSyxDQUVwQixLQUFTLEVBQ1QsR0FBc0I7UUFHdEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBRSxDQUFFO0lBQ3pDLENBQUM7SUFQZSxVQUFLLFFBT3BCLENBQUE7QUFDRixDQUFDLEVBVmdCLElBQUksS0FBSixJQUFJLFFBVXBCO0FBRUQsV0FBaUIsSUFBSTtJQUFDLElBQUEsS0FBSyxDQWdEMUI7SUFoRHFCLFdBQUEsS0FBSztRQUUxQixNQUFzQixJQUFJO1lBS2YsSUFBSSxHQUFHLElBQUksR0FBaUIsQ0FBRTtZQUV4QyxPQUFPO1lBRUEsQ0FBRSxTQUFTLENBQUUsQ0FFbkIsR0FBZSxFQUNmLFNBQWU7Z0JBSWYsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBRyxpQkFBaUIsQ0FBRSxDQUV4QixJQUFJLENBQUMsS0FBSyxFQUNWLFNBQVMsQ0FDVCxDQUFDO1lBQ0gsQ0FBQztZQUdNLENBQUUsWUFBWSxDQUFFLENBQUcsR0FBZTtnQkFFeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7WUFDekIsQ0FBQztTQUNEO1FBN0Jx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