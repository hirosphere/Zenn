import { _value_, _set_value_, _on_value_change_, _add_ref_, _remove_ref_ } from "../common.js";
/* */
export class SproutR {
    refs = new Set;
    [_add_ref_](ref, old_value) {
        this.refs.add(ref);
        ref[_on_value_change_](this.value, old_value);
    }
    [_remove_ref_](ref) {
        this.refs.delete(ref);
    }
}
(function (SproutR) {
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
    SproutR.Ref = Ref;
})(SproutR || (SproutR = {}));
export class Leafr extends SproutR {
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
    class Conv extends SproutR {
        toref;
        src_ref;
        constructor(src, toref) {
            super();
            this.toref = toref;
            const ref = this.src_ref = new SproutR.Ref(src, (new_value, old_value) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFPLE1BQU0sY0FBYyxDQUFDO0FBRXJHLEtBQUs7QUFFTCxNQUFNLE9BQWdCLE9BQU87SUFHbEIsSUFBSSxHQUFHLElBQUksR0FBeUIsQ0FBRTtJQUV6QyxDQUFFLFNBQVMsQ0FBRSxDQUVuQixHQUF1QixFQUN2QixTQUFlO1FBSWYsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLENBQUM7UUFDckIsR0FBRyxDQUFHLGlCQUFpQixDQUFFLENBRXhCLElBQUksQ0FBQyxLQUFLLEVBQ1YsU0FBUyxDQUNULENBQUU7SUFDSixDQUFDO0lBQ00sQ0FBRSxZQUFZLENBQUUsQ0FBRyxHQUF1QjtRQUVoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0Q7QUFFRCxXQUFpQixPQUFPO0lBRXZCLE1BQWEsR0FBRztRQUlFO1FBQ047UUFIWCxZQUVpQixHQUFtQixFQUN6QixlQUEwQjtZQURwQixRQUFHLEdBQUgsR0FBRyxDQUFnQjtZQUN6QixvQkFBZSxHQUFmLGVBQWUsQ0FBVztRQUVwQyxDQUFDO1FBRUssQ0FBRSxpQkFBaUIsQ0FBRSxDQUUzQixTQUFhLEVBQ2IsU0FBZTtZQUdmLElBQUksQ0FBQyxlQUFlLENBRW5CLFNBQVMsRUFDVCxTQUFTLENBQ1QsQ0FBQztRQUNILENBQUM7UUFFTSxJQUFJLEtBQUksQ0FBQztLQUNoQjtJQXZCWSxXQUFHLE1BdUJmLENBQUE7QUFHRixDQUFDLEVBNUJnQixPQUFPLEtBQVAsT0FBTyxRQTRCdkI7QUFFRCxNQUFNLE9BQU8sS0FBWSxTQUFRLE9BQWE7SUFPbEM7SUFM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