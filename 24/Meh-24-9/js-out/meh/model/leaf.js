import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
/* */
export class Srcr {
    refs = new Set;
    [_add_ref_](ref, old_value) {
        this.refs.add(ref);
        ref[_on_value_change_](this.value, old_value);
    }
    [_remove_ref_](ref) {
        this.refs.delete(ref);
    }
}
(function (Srcr) {
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
    Srcr.Ref = Ref;
})(Srcr || (Srcr = {}));
export class Leafr extends Srcr {
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
(function (Leafr) {
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
    class Conv extends Srcr {
        toref;
        src_ref;
        constructor(src, toref) {
            super();
            this.toref = toref;
            const ref = this.src_ref = new Srcr.Ref(src, (new_value, old_value) => {
                this.notify(new_value, old_value);
            });
            src[_add_ref_](ref);
        }
        get value() {
            return this.toref(this.src_ref.src.value);
        }
        notify(new_value, old_value) {
            this.refs.forEach(ref => ref[_on_value_change_](this.toref(new_value), old_value !== undefined ? this.toref(old_value) : undefined));
        }
    }
    Leafr.Conv = Conv;
})(Leafr || (Leafr = {}));
/* Leaf W/R */
export class Leaf extends Leafr {
    set value(new_value) { this[_set_value_](new_value); }
    get value() { return this[_value_]; }
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
})(Leaf || (Leaf = {}));
new Leaf.str("").value = "1";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFPLE1BQU0sY0FBYyxDQUFDO0FBRXJHLEtBQUs7QUFFTCxNQUFNLE9BQWdCLElBQUk7SUFHZixJQUFJLEdBQUcsSUFBSSxHQUFzQixDQUFFO0lBRXRDLENBQUUsU0FBUyxDQUFFLENBRW5CLEdBQW9CLEVBQ3BCLFNBQWU7UUFJZixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUNyQixHQUFHLENBQUcsaUJBQWlCLENBQUUsQ0FFeEIsSUFBSSxDQUFDLEtBQUssRUFDVixTQUFTLENBQ1QsQ0FBRTtJQUNKLENBQUM7SUFDTSxDQUFFLFlBQVksQ0FBRSxDQUFHLEdBQW9CO1FBRTdDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ3pCLENBQUM7Q0FDRDtBQUVELFdBQWlCLElBQUk7SUFFcEIsTUFBYSxHQUFHO1FBSUU7UUFDTjtRQUhYLFlBRWlCLEdBQWdCLEVBQ3RCLGVBQTBCO1lBRHBCLFFBQUcsR0FBSCxHQUFHLENBQWE7WUFDdEIsb0JBQWUsR0FBZixlQUFlLENBQVc7UUFFcEMsQ0FBQztRQUVLLENBQUUsaUJBQWlCLENBQUUsQ0FFM0IsU0FBYSxFQUNiLFNBQWU7WUFHZixJQUFJLENBQUMsZUFBZSxDQUVuQixTQUFTLEVBQ1QsU0FBUyxDQUNULENBQUM7UUFDSCxDQUFDO1FBRU0sSUFBSSxLQUFJLENBQUM7S0FDaEI7SUF2QlksUUFBRyxNQXVCZixDQUFBO0FBR0YsQ0FBQyxFQTVCZ0IsSUFBSSxLQUFKLElBQUksUUE0QnBCO0FBRUQsTUFBTSxPQUFPLEtBQVksU0FBUSxJQUFVO0lBTy9CO0lBTEQs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