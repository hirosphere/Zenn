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
/* readonly */
(function (leaf) {
    /* R 実体生成 */
    function r(value, branch) {
        return new leaf.Entity(value, branch);
    }
    leaf.r = r;
    (function (r) {
        r.str = (r);
        r.num = (r);
        r.bool = (r);
    })(r = leaf.r || (leaf.r = {}));
})(leaf || (leaf = {}));
/* */
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
        [set_value](new_v, changer) {
            this.set(new_v, changer);
        }
        /* */
        mk_str(to_cv = (def_to_str)) {
            return new Conv(this, to_cv);
        }
        cv(to_ref, to_src) {
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
        p_src;
        to_ref;
        to_src;
        constructor(p_src, to_ref, to_src) {
            super();
            this.p_src = p_src;
            this.to_ref = to_ref;
            this.to_src = to_src;
            p_src.add_ref(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjO0FBRWQsTUFBTSxVQUFVLElBQUksQ0FBUyxLQUFTLEVBQUcsTUFBNEI7SUFFcEUsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQVMsS0FBSyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0FBQ2xELENBQUM7QUFFRCxXQUFpQixJQUFJO0lBRVAsUUFBRyxJQUFHLElBQWUsQ0FBQSxDQUFFO0lBQ3ZCLFFBQUcsSUFBRyxJQUFlLENBQUEsQ0FBRTtJQUN2QixTQUFJLElBQUcsSUFBZ0IsQ0FBQSxDQUFFO0lBRXpCLFFBQUcsR0FBRyxDQUFRLEVBQWEsRUFBRyxFQUFFO1FBRTVDLE9BQU8sRUFBRSxZQUFZLEtBQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUU7SUFDM0MsQ0FBQyxDQUFBO0lBRVksV0FBTSxHQUFHLENBQVEsRUFBYSxFQUFHLEVBQUU7UUFFL0MsNENBQTRDO1FBRTVDLE9BQU8sQ0FBRSxFQUFFLFlBQVksS0FBQSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUUsRUFBRSxDQUFFLENBQUU7SUFDNUQsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQWpCZ0IsSUFBSSxLQUFKLElBQUksUUFpQnBCO0FBRUQsYUFBYTtBQUViLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBRTtBQW1DbkMsY0FBYztBQUVkLFdBQWlCLElBQUk7SUFFcEIsWUFBWTtJQUVaLFNBQWdCLENBQUMsQ0FBUyxLQUFTLEVBQUcsTUFBNEI7UUFFakUsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0lB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