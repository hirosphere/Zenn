import { _value_, _set_, _on_value_change_, _refs_ } from "../common.js";
export class Src {
    [_refs_] = new Set;
}
export class Leaf extends Src {
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
    set value(new_value) {
        this.set(new_value);
    }
    [_set_](new_value) {
        this.set(new_value);
    }
    set(new_value) {
        if (new_value === this.value)
            return;
        const old_value = this[_value_];
        this[_value_] = new_value;
        this.rel?.update();
        this[_refs_].forEach(ref => ref[_on_value_change_](new_value, old_value));
    }
}
(function (Leaf) {
    class Ref {
        set src(new_src) {
            if (new_src == this._src_)
                return;
            const old_src = this._src_;
            old_src?.[_refs_].delete(this);
            this._src_ = new_src;
            new_src?.[_refs_].add(this);
            this.on_value_change(new_src?.value, old_src?.value);
        }
        _src_;
        [_on_value_change_](new_value, old_value) {
            this.on_value_change(new_value, old_value);
        }
        on_value_change(new_value, old_value) { }
        term() { }
    }
    Leaf.Ref = Ref;
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
export class Leafr extends Leaf {
    get value() {
        return this[_value_];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQU8sTUFBTSxjQUFjLENBQUM7QUFFOUUsTUFBTSxPQUFnQixHQUFHO0lBRWpCLENBQUUsTUFBTSxDQUFFLEdBQUcsSUFBSSxHQUFzQixDQUFDO0NBRS9DO0FBRUQsTUFBTSxPQUFPLElBQVcsU0FBUSxHQUFTO0lBTzdCO0lBTEQsQ0FBRSxPQUFPLENBQUUsQ0FBTTtJQUUzQixZQUVDLEtBQVMsRUFDQyxHQUFnQjtRQUcxQixLQUFLLEVBQUUsQ0FBQztRQUhFLFFBQUcsR0FBSCxHQUFHLENBQWE7UUFJMUIsSUFBSSxDQUFFLE9BQU8sQ0FBRSxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBR0QsSUFBVyxLQUFLO1FBRWYsT0FBTyxJQUFJLENBQUcsT0FBTyxDQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFFLFNBQWE7UUFFOUIsSUFBSSxDQUFDLEdBQUcsQ0FBRSxTQUFTLENBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sQ0FBRSxLQUFLLENBQUUsQ0FBRyxTQUFhO1FBRS9CLElBQUksQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVNLEdBQUcsQ0FBRSxTQUFhO1FBRXhCLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLO1lBQUksT0FBTztRQUV2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUcsT0FBTyxDQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFHLE9BQU8sQ0FBRSxHQUFHLFNBQVMsQ0FBQztRQUU3QixJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQyxPQUFPLENBRXJCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFFLGlCQUFpQixDQUFFLENBRTlCLFNBQVMsRUFDVCxTQUFTLENBQ1QsQ0FDRCxDQUFDO0lBQ0gsQ0FBQztDQUNEO0FBRUQsV0FBaUIsSUFBSTtJQUVwQixNQUFhLEdBQUc7UUFFZixJQUFXLEdBQUcsQ0FBRSxPQUErQjtZQUU5QyxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSztnQkFBSSxPQUFPO1lBRXBDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsT0FBTyxFQUFFLENBQUUsTUFBTSxDQUFFLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxDQUFFLE1BQU0sQ0FBRSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUUsQ0FBQztZQUVoQyxJQUFJLENBQUMsZUFBZSxDQUVuQixPQUFPLEVBQUUsS0FBSyxFQUNkLE9BQU8sRUFBRSxLQUFLLENBQ2QsQ0FBQztRQUNILENBQUM7UUFFUyxLQUFLLENBQWU7UUFFdkIsQ0FBRSxpQkFBaUIsQ0FBRSxDQUUzQixTQUFlLEVBQ2YsU0FBZTtZQUdmLElBQUksQ0FBQyxlQUFlLENBRW5CLFNBQVMsRUFDVCxTQUFTLENBQ1QsQ0FBQztRQUNILENBQUM7UUFFTSxlQUFlLENBRXJCLFNBQWUsRUFDZixTQUFlLElBQ2IsQ0FBQztRQUVHLElBQUksS0FBSSxDQUFDO0tBQ2hCO0lBekNZLFFBQUcsTUF5Q2YsQ0FBQTtJQU9ELE1BQWEsR0FBSSxTQUFRLElBQWU7S0FBRztJQUE5QixRQUFHLE1BQTJCLENBQUE7SUFDM0MsTUFBYSxHQUFJLFNBQVEsSUFBZTtLQUFHO0lBQTlCLFFBQUcsTUFBMkIsQ0FBQTtJQUMzQyxNQUFhLElBQUssU0FBUSxJQUFnQjtLQUFHO0lBQWhDLFNBQUksT0FBNEIsQ0FBQTtBQUM5QyxDQUFDLEVBckRnQixJQUFJLEtBQUosSUFBSSxRQXFEcEI7QUFXRCxNQUFNLE9BQU8sS0FBWSxTQUFRLElBQVU7SUFFMUMsSUFBb0IsS0FBSztRQUV4QixPQUFPLElBQUksQ0FBRSxPQUFPLENBQUUsQ0FBQztJQUN4QixDQUFDO0NBQ0QifQ==