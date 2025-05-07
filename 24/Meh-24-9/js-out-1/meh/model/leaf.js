/* W/R 実体生成 */
export function leaf(value, branch) {
    return new leaf.Entity(value, branch);
}
(function (leaf) {
    leaf.str = (leaf);
    leaf.num = (leaf);
    leaf.bool = (leaf);
    leaf.get = (ll) => {
        return ll instanceof leaf.Src ? ll.value : ll;
    };
    leaf.mk_str = (ll) => {
        // log ( ll instanceof Source , get ( ll ) )
        return (ll instanceof leaf.Src) ? ll.mk_str() : String(ll);
    };
})(leaf || (leaf = {}));
/* W/R 型定義 */
export const set_value = Symbol();
(function (leaf) {
    function ll(ll) {
        return ll instanceof leaf.Src ? ll : leaf(ll);
    }
    leaf.ll = ll;
    (function (ll_1) {
        function make(ll) {
            return ll instanceof leaf.Src ? ll : leaf(ll);
        }
        ll_1.make = make;
    })(ll = leaf.ll || (leaf.ll = {}));
})(leaf || (leaf = {}));
/* 実装 */
(function (leaf) {
    /* 基底抽象クラス */
    class Src {
        /* ref */
        refs = new Set;
        add_ref(ref, old_v) {
            this.refs.add(ref);
            ref.src_value_change(this.value, old_v);
        }
        remove_ref(ref) {
            this.refs.delete(ref);
        }
        /* value */
        get $() { return this.value; }
        set $(value) { this.value = value; }
        [set_value](new_v, changer) {
            this.set(new_v, changer);
        }
        /* */
        mk_str(to_cv = (def_to_str)) {
            return new Conv(this, to_cv);
        }
        conv(to_ref, to_src) {
            return new Conv(this, to_ref, to_src);
        }
    }
    leaf.Src = Src;
    /* 値実体クラス */
    class Entity extends Src {
        p_value;
        p_branch;
        constructor(p_value, p_branch) {
            super();
            this.p_value = p_value;
            this.p_branch = p_branch;
        }
        /* value */
        get value() {
            return this.p_value;
        }
        set value(new_v) {
            this.set(new_v);
        }
        set(new_v, changer) {
            if (new_v === this.p_value)
                return;
            const old_v = this.p_value;
            this.p_value = new_v;
            if (changer != this.p_branch) {
                this.p_branch?.update(new_v, old_v);
            }
            this.refs.forEach(ref => ref != changer &&
                (ref.src_value_change(new_v, old_v)));
        }
    }
    leaf.Entity = Entity;
    const def_to_str = (src) => String(src);
    /* 参照・変換クラス */
    class Conv extends Src {
        to_ref;
        to_src;
        p_src;
        constructor(src, to_ref, to_src) {
            super();
            this.to_ref = to_ref;
            this.to_src = to_src;
            this.p_src = src;
            src.add_ref(this);
        }
        /* source */
        set src(new_s) {
            if (new_s == this.p_src)
                return;
            const old_s = this.p_src;
            this.p_src = new_s;
            old_s?.remove_ref(this);
            new_s?.add_ref(this, old_s?.value);
        }
        /* value */
        get value() {
            return this.to_ref(this.p_src.value);
        }
        set value(new_v) { }
        set(value, changer) {
            /* 未実装 */ ;
        }
        /* */
        src_value_change(new_v, old_v) {
            const new_rv = this.to_ref(new_v);
            const old_rv = old_v === undefined ? undefined : this.to_ref(old_v);
            this.refs.forEach(ref => ref.src_value_change(new_rv, old_rv));
        }
    }
    leaf.Conv = Conv;
})(leaf || (leaf = {}));
(function (leaf) {
    /* */
    leaf.ref = (src, src_value_change) => new Ref(src, src_value_change);
    class Ref {
        src;
        src_value_change;
        constructor(src, src_value_change) {
            this.src = src;
            this.src_value_change = src_value_change;
            src?.add_ref(this);
        }
        term() {
            this.src?.remove_ref(this);
        }
    }
    leaf.Ref = Ref;
})(leaf || (leaf = {}));
/* readonly */
(function (leaf) {
    /* R 実体生成 */
    function r(value, branch) {
        return new leaf.Entity(value, branch);
    }
    leaf.r = r;
})(leaf || (leaf = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjO0FBRWQsTUFBTSxVQUFVLElBQUksQ0FBUyxLQUFTLEVBQUcsTUFBNEI7SUFFcEUsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0FBQzVDLENBQUM7QUFJRCxXQUFpQixJQUFJO0lBRVAsUUFBRyxJQUFHLElBQWUsQ0FBQSxDQUFFO0lBQ3ZCLFFBQUcsSUFBRyxJQUFlLENBQUEsQ0FBRTtJQUN2QixTQUFJLElBQUcsSUFBZ0IsQ0FBQSxDQUFFO0lBRXpCLFFBQUcsR0FBRyxDQUFRLEVBQWEsRUFBRyxFQUFFO1FBRTVDLE9BQU8sRUFBRSxZQUFZLEtBQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUU7SUFDM0MsQ0FBQyxDQUFBO0lBRVksV0FBTSxHQUFHLENBQVEsRUFBYSxFQUFHLEVBQUU7UUFFL0MsNENBQTRDO1FBRTVDLE9BQU8sQ0FBRSxFQUFFLFlBQVksS0FBQSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUU7SUFDNUQsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQWpCZ0IsSUFBSSxLQUFKLElBQUksUUFpQnBCO0FBRUQsYUFBYTtBQUViLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBRTtBQVNuQyxXQUFpQixJQUFJO0lBRXBCLFNBQWdCLEVBQUUsQ0FBUyxFQUFhO1FBRXZDLE9BQU8sRUFBRSxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFHLEVBQUUsQ0FBRSxDQUFF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