/* Read Only 実体生成 */
export function leafr(value, branch) {
    return new leafr.Entity(value, branch);
}
(function (leafr) {
    leafr.str = (leafr);
    leafr.num = (leafr);
    leafr.bool = (leafr);
    leafr.get = (ll) => {
        return ll instanceof leafr.Src ? ll.value : ll;
    };
    leafr.mk_str = (ll) => {
        // log ( ll instanceof Source , get ( ll ) )
        return (ll instanceof leafr.Src) ? ll.mk_str() : String(ll);
    };
})(leafr || (leafr = {}));
/* W/R 型定義 */
export const set_value = Symbol();
(function (leafr) {
    function ll(ll) {
        return ll instanceof leafr.Src ? ll : leafr(ll);
    }
    leafr.ll = ll;
    (function (ll_1) {
        function make(ll) {
            return ll instanceof leafr.Src ? ll : leafr(ll);
        }
        ll_1.make = make;
    })(ll = leafr.ll || (leafr.ll = {}));
})(leafr || (leafr = {}));
/* 実装 */
(function (leafr) {
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
        /* */
        mk_str(to_cv = (def_to_str)) {
            return new Conv(this, to_cv);
        }
        conv(to_ref, to_src) {
            return new Conv(this, to_ref, to_src);
        }
    }
    leafr.Src = Src;
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
        [set_value](new_v, changer) {
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
    leafr.Entity = Entity;
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
        [set_value](new_v, changer) {
            this.to_src && this.p_src[set_value](this.to_src(new_v), changer);
        }
        /* */
        src_value_change(new_v, old_v) {
            const new_rv = this.to_ref(new_v);
            const old_rv = old_v === undefined ? undefined : this.to_ref(old_v);
            this.refs.forEach(ref => ref.src_value_change(new_rv, old_rv));
        }
    }
    leafr.Conv = Conv;
})(leafr || (leafr = {}));
(function (leafr) {
    /* */
    leafr.ref = (src, src_value_change) => new Ref(src, src_value_change);
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
    leafr.Ref = Ref;
})(leafr || (leafr = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL2xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLG9CQUFvQjtBQUVwQixNQUFNLFVBQVUsS0FBSyxDQUFTLEtBQVMsRUFBRyxNQUE2QjtJQUV0RSxPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBRyxLQUFLLEVBQUcsTUFBTSxDQUFFLENBQUU7QUFDN0MsQ0FBQztBQUlELFdBQWlCLEtBQUs7SUFFUixTQUFHLElBQUcsS0FBZ0IsQ0FBQSxDQUFFO0lBQ3hCLFNBQUcsSUFBRyxLQUFnQixDQUFBLENBQUU7SUFDeEIsVUFBSSxJQUFHLEtBQWlCLENBQUEsQ0FBRTtJQUUxQixTQUFHLEdBQUcsQ0FBUSxFQUFhLEVBQUcsRUFBRTtRQUU1QyxPQUFPLEVBQUUsWUFBWSxNQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFO0lBQzNDLENBQUMsQ0FBQTtJQUVZLFlBQU0sR0FBRyxDQUFRLEVBQWEsRUFBRyxFQUFFO1FBRS9DLDRDQUE0QztRQUU1QyxPQUFPLENBQUUsRUFBRSxZQUFZLE1BQUEsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFFLEVBQUUsQ0FBRSxDQUFFO0lBQzVELENBQUMsQ0FBQTtBQUNGLENBQUMsRUFqQmdCLEtBQUssS0FBTCxLQUFLLFFBaUJyQjtBQUVELGFBQWE7QUFFYixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUU7QUFTbkMsV0FBaUIsS0FBSztJQUVyQixTQUFnQixFQUFFLENBQVMsRUFBYTtRQUV2QyxPQUFPLEVBQUUsWUFBWSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBRyxFQUFFLENB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