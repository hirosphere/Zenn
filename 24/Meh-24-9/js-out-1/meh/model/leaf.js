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