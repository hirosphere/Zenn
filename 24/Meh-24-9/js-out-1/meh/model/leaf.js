/* W/R 実体生成 */
export function leaf(value, branch) {
    return new leaf.Entity(value, branch);
}
(function (leaf) {
    leaf.str = (leaf);
    leaf.num = (leaf);
    leaf.bool = (leaf);
    leaf.get = (lol) => {
        return lol instanceof leaf.Source ? lol.value : lol;
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
    class Source {
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
    }
    leaf.Source = Source;
    /* 値実体クラス */
    class Entity extends Source {
        p_value;
        p_branch;
        constructor(p_value, p_branch) {
            super();
            this.p_value = p_value;
            this.p_branch = p_branch;
        }
        get value() {
            return this.p_value;
        }
        set value(new_v) { this.set(new_v); }
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
    /* 参照・変換クラス */
    class Converter extends Source {
        src;
        to_ref;
        constructor(src, to_ref, x) {
            super();
            this.src = src;
            this.to_ref = to_ref;
            src.add_ref(this);
        }
        get value() {
            return this.to_ref(this.src.value);
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
    leaf.Converter = Converter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxjQUFjO0FBRWQsTUFBTSxVQUFVLElBQUksQ0FBUyxLQUFTLEVBQUcsTUFBNEI7SUFFcEUsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0FBQzVDLENBQUM7QUFFRCxXQUFpQixJQUFJO0lBRVAsUUFBRyxJQUFHLElBQWUsQ0FBQSxDQUFFO0lBQ3ZCLFFBQUcsSUFBRyxJQUFlLENBQUEsQ0FBRTtJQUN2QixTQUFJLElBQUcsSUFBZ0IsQ0FBQSxDQUFFO0lBRXpCLFFBQUcsR0FBRyxDQUFRLEdBQWMsRUFBRyxFQUFFO1FBRTdDLE9BQU8sR0FBRyxZQUFZLEtBQUEsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUU7SUFDakQsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQVZnQixJQUFJLEtBQUosSUFBSSxRQVVwQjtBQUVELGFBQWE7QUFFYixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUU7QUE2Qm5DLGNBQWM7QUFFZCxXQUFpQixJQUFJO0lBRXBCLFlBQVk7SUFFWixTQUFnQixDQUFDLENBQVMsS0FBUyxFQUFHLE1BQTRCO1FBRWpFLE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFHLEtBQUssRUFBRyxNQUFNLENBQUUsQ0FBRTtJQUM1QyxDQUFDO0lBSGUsTUFBQyxJQUdoQixDQUFBO0lBRUQsV0FBaUIsQ0FBQztRQUVKLEtBQUcsSUFBRyxDQUFZLENBQUEsQ0FBRTtRQUNwQixLQUFHLElBQUcsQ0FBWSxDQUFBLENBQUU7UUFDcEIsTUFBSSxJQUFHLENBQWEsQ0FBQSxDQUFFO0lBQ3BDLENBQUMsRUFMZ0IsQ0FBQyxHQUFELE1BQUMsS0FBRCxNQUFDLFFB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