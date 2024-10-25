export const set_value = Symbol();
export class Leafr {
    p_refs = new Set;
    add_ref(ref) {
        this.p_refs.add(ref);
        ref.value_change(this.value);
    }
    remove_ref(ref) {
        this.p_refs.delete(ref);
    }
}
(function (Leafr) {
    class Ref {
        src;
        value_change;
        constructor(src, value_change) {
            this.src = src;
            this.value_change = value_change;
        }
        terminate() {
            this.src?.remove_ref(this);
            this.src = undefined;
        }
    }
    Leafr.Ref = Ref;
})(Leafr || (Leafr = {}));
(function (Leafr) {
    class Conv extends Leafr {
        src;
        to_r;
        constructor(src, to_r) {
            super();
            this.src = src;
            this.to_r = to_r;
            new Leafr.Ref(src, (new_v, old_v) => this.notify(new_v, old_v));
        }
        get value() {
            return this.to_r(this.src.value);
        }
        notify(new_sv, old_sv) {
            const new_rv = this.to_r(new_sv);
            const old_rv = old_sv !== undefined ? this.to_r(old_sv) : undefined;
            this.p_refs.forEach(ref => ref.value_change(new_rv, old_rv));
        }
    }
    Leafr.Conv = Conv;
})(Leafr || (Leafr = {}));
(function (Leafr) {
    class Entity extends Leafr {
        p_value;
        p_rel;
        constructor(p_value, p_rel) {
            super();
            this.p_value = p_value;
            this.p_rel = p_rel;
        }
        get value() {
            return this.p_value;
        }
        [set_value](new_v, is_rooting) {
            if (new_v === this.p_value)
                return;
            const old_v = this.p_value;
            this.p_value = new_v;
            (!is_rooting) && this.p_rel?.update();
            this.p_refs.forEach(ref => ref.value_change(new_v, old_v));
        }
    }
    Leafr.Entity = Entity;
})(Leafr || (Leafr = {}));
export function leafr(value, rel) {
    return new Leafr.Entity(value, rel);
}
(function (leafr) {
    leafr.str = (leafr);
    leafr.num = (leafr);
    leafr.bool = (leafr);
    leafr.type = Leafr;
})(leafr || (leafr = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL2xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBRTtBQUVuQyxNQUFNLE9BQWdCLEtBQUs7SUFFaEIsTUFBTSxHQUFHLElBQUksR0FBdUIsQ0FBRTtJQUV6QyxPQUFPLENBQUcsR0FBb0I7UUFFcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLFlBQVksQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUU7SUFDbEMsQ0FBQztJQUVNLFVBQVUsQ0FBRyxHQUFxQjtRQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUMzQixDQUFDO0NBR0Q7QUFVRCxXQUFpQixLQUFLO0lBRXJCLE1BQWEsR0FBRztRQUlKO1FBQ007UUFIakIsWUFFVyxHQUE2QixFQUN2QixZQUEyQjtZQURqQyxRQUFHLEdBQUgsR0FBRyxDQUEwQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBZTtRQUUzQyxDQUFDO1FBRUssU0FBUztZQUVmLElBQUksQ0FBQyxHQUFJLEVBQUUsVUFBVSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFFO1FBQ3ZCLENBQUM7S0FDRDtJQWRZLFNBQUcsTUFjZixDQUFBO0FBQ0YsQ0FBQyxFQWpCZ0IsS0FBSyxLQUFMLEtBQUssUUFpQnJCO0FBRUQsV0FBaUIsS0FBSztJQUVyQixNQUFhLElBQW1CLFNBQVEsS0FBVztRQUl2QztRQUNBO1FBSFgsWUFFVyxHQUFpQixFQUNqQixJQUF5QjtZQUduQyxLQUFLLEVBQUUsQ0FBRTtZQUpDLFFBQUcsR0FBSCxHQUFHLENBQWM7WUFDakIsU0FBSSxHQUFKLElBQUksQ0FB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