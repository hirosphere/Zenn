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
            src?.add_ref(this);
        }
        terminate() {
            this.src?.remove_ref(this);
            this.src = undefined;
        }
    }
    Leafr.Ref = Ref;
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
        [set_value](new_v, is_permeating) {
            if (new_v === this.p_value)
                return;
            const old_v = this.p_value;
            this.p_value = new_v;
            (!is_permeating) && this.p_rel?.update();
            this.p_refs.forEach(ref => {
                ref.value_change(new_v, old_v);
            });
        }
    }
    Leafr.Entity = Entity;
})(Leafr || (Leafr = {}));
(function (Leafr) {
    class Converter extends Leafr {
        src;
        to_ref;
        constructor(src, to_ref) {
            super();
            this.src = src;
            this.to_ref = to_ref;
            new Leafr.Ref(src, (new_v, old_v) => this.notify(new_v, old_v));
        }
        get value() {
            return this.to_ref(this.src.value);
        }
        notify(new_sv, old_sv) {
            const new_rv = this.to_ref(new_sv);
            const old_rv = old_sv !== undefined ? this.to_ref(old_sv) : undefined;
            this.p_refs.forEach(ref => ref.value_change(new_rv, old_rv));
        }
    }
    Leafr.Converter = Converter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL2xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBRTtBQUVuQyxNQUFNLE9BQWdCLEtBQUs7SUFFaEIsTUFBTSxHQUFHLElBQUksR0FBdUIsQ0FBRTtJQUV6QyxPQUFPLENBQUcsR0FBb0I7UUFFcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUM7UUFDeEIsR0FBRyxDQUFDLFlBQVksQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUU7SUFDbEMsQ0FBQztJQUVNLFVBQVUsQ0FBRyxHQUFxQjtRQUV4QyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUMzQixDQUFDO0NBR0Q7QUFVRCxXQUFpQixLQUFLO0lBRXJCLE1BQWEsR0FBRztRQUlKO1FBQ007UUFIakIsWUFFVyxHQUE2QixFQUN2QixZQUEyQjtZQURqQyxRQUFHLEdBQUgsR0FBRyxDQUEwQjtZQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBZTtZQUczQyxHQUFHLEVBQUUsT0FBTyxDQUFHLElBQUksQ0FBRSxDQUFFO1FBQ3hCLENBQUM7UUFFTSxTQUFTO1lBRWYsSUFBSSxDQUFDLEdBQUksRUFBRSxVQUFVLENBQUcsSUFBSSxDQUFFLENBQUU7WUFDaEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUU7UUFDdkIsQ0FBQztLQUNEO0lBaEJZLFNBQUcsTUFnQmYsQ0FBQTtBQUNGLENBQUMsRUFuQmdCLEtBQUssS0FBTCxLQUFLLFFBbUJyQjtBQUVELFdBQWlCLEtBQUs7SUFFckIsTUFBYSxNQUFhLFNBQVEsS0FBVztRQUlqQztRQUNBO1FBSFgsWUFFVyxPQUFXLEVBQ1gsS0FBYTtZQUV0QixLQUFLLEVBQUUsQ0FBQztZQUhDLFlBQU8s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