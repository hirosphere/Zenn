import { Life } from "./Life.js";
export function Leafr(new_v, branch) {
    return new Leafr.Entity(new_v, branch);
}
(function (Leafr) {
    Leafr.setValue = Symbol();
    Leafr.LeafrTag = Symbol();
    /* */
    class Base extends Life {
        [Leafr.LeafrTag] = Leafr.LeafrTag;
        addRef(ref) {
            super.addRef(ref);
            ref.vchan(this.$);
        }
        cvr(vtor, rtov) {
            return new Converter(this, vtor, rtov);
        }
    }
    Leafr.Base = Base;
    class Entity extends Base {
        p_value;
        p_branch;
        constructor(p_value, p_branch) {
            super();
            this.p_value = p_value;
            this.p_branch = p_branch;
        }
        get $() { return this.p_value; }
        [Leafr.setValue](new_v, isBranch = false) {
            if (new_v === this.p_value)
                return;
            const old_v = this.p_value;
            this.p_value = new_v;
            if (!isBranch)
                this.p_branch?.();
            this.p_refs.forEach(ref => ref.vchan(new_v, old_v));
        }
    }
    Leafr.Entity = Entity;
    class Converter extends Base {
        source;
        stov;
        vtos;
        constructor(source, stov, vtos) {
            super();
            this.source = source;
            this.stov = stov;
            this.vtos = vtos;
            const ref = {
                lterm: () => this.terminate(),
                vchan: this.notify
            };
            source.addRef(ref);
        }
        [Leafr.setValue](new_v, isBranch = false) {
            if (this.vtos)
                this.source[Leafr.setValue](this.vtos(new_v));
        }
        get $() { return this.stov(this.source.$); }
        notify = (s_new, s_old) => {
            const new_v = this.stov(s_new);
            const old_v = (s_old !== undefined ? this.stov(s_old) : undefined);
            this.p_refs.forEach(ref => ref.vchan(new_v, old_v));
        };
    }
    Leafr.Converter = Converter;
    class Branch extends Base {
        ;
    }
    Leafr.Branch = Branch;
})(Leafr || (Leafr = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvTWVoL01vZGVsL0xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUU7QUFFbEMsTUFBTSxVQUFVLEtBQUssQ0FBUyxLQUFTLEVBQUcsTUFBcUI7SUFFOUQsT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUcsS0FBSyxFQUFHLE1BQU0sQ0FBRSxDQUFFO0FBQzdDLENBQUM7QUFZRCxXQUFpQixLQUFLO0lBRVIsY0FBUSxHQUFHLE1BQU0sRUFBRyxDQUFFO0lBQ3RCLGNBQVEsR0FBRyxNQUFNLEVBQUcsQ0FBRTtJQUVuQyxLQUFLO0lBRUwsTUFBc0IsSUFBVyxTQUFRLElBQWtCO1FBRTFDLENBQUUsTUFBQSxRQUFRLENBQUUsR0FBRyxNQUFBLFFBQVEsQ0FBRTtRQUt6QixNQUFNLENBQUcsR0FBcUI7WUFFN0MsS0FBSyxDQUFDLE1BQU0sQ0FBRyxHQUFHLENBQUUsQ0FBRTtZQUN0QixHQUFHLENBQUMsS0FBSyxDQUFHLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBRTtRQUN2QixDQUFDO1FBRU0sR0FBRyxDQUFTLElBQXFCLEVBQUcsSUFBdUI7WUFFakUsT0FBTyxJQUFJLFNBQVMsQ0FBRyxJQUFJLEVBQUcsSUFBSSxFQUFHLElBQUksQ0FBRSxDQUFFO1FBQzlDLENBQUM7S0FDRDtJQWpCcUIsVUFBSSxPQWlCekIsQ0FBQTtJQUVELE1BQWEsTUFBYSxTQUFRLElBQVU7UUFFbkI7UUFBd0I7UUFBaEQsWUFBd0IsT0FBVyxFQUFhLFFBQXVCO1lBRXRFLEtBQUssRUFBRyxDQUFFO1lBRmEsWUFBTyxHQUFQLE9BQU8sQ0FBSTtZQUFhLGFBQVEsR0FBUixRQUFRLENBQWU7UUFHdkUsQ0FBQztRQUVELElBQW9CLENBQUMsS0FBVSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDO1FBRXRDLENBQUUsTUFBQSxRQUFRLENBQUUsQ0FBRyxLQUFTLEVBQUcsV0FBcUIsS0FBSztZQUVwRSxJQUFLLEtBQUssS0FBSyxJQUFJLENBQUMsT0FBTztnQkFBSSxPQUFRO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUU7WUFDdEIsSUFBSSxDQUFFLFFBQVE7Z0JBQUcsSUFBSSxDQUFDLFFBQVMsRUFBRSxFQUFFLENBQUU7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFHLEtBQUssRUFBRyxLQUFLLENBQUUsQ0FBRSxDQUFFO1FBQzdELENBQUM7S0FDRDtJQWpCWSxZQUFNLFNBaUJsQixDQUFBO0lBRUQsTUFBYSxTQUFvQixTQUFRLElBQVU7UUFJdkM7UUFDQTtRQUNBO1FBSlgsWUFFVyxNQUFvQixFQUNwQixJQUFxQixFQUNyQixJQUF1QjtZQUdqQyxLQUFLLEVBQUcsQ0FBRTtZQUxBLFdBQU0sR0FBTixNQUFNLENBQWM7WUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBaUI7WUFDckIsU0FBSSxHQUFKLElBQUksQ0FBbUI7WUFLakMsTUFBTSxHQUFHLEdBQ1Q7Z0JBQ0MsS0FBSyxFQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUc7Z0JBQy9CLEtBQUssRUFBRyxJQUFJLENBQUMsTUFBTTthQUNuQixDQUFBO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBRyxHQUFHLENBQUUsQ0FBRTtRQUN4QixDQUFDO1FBRWUsQ0FBRSxNQUFBLFFBQVEsQ0FBRSxDQUFHLEtBQVMsRUFBRyxXQUFxQixLQUFLO1lBRXBFLElBQUssSUFBSSxDQUFDLElBQUk7Z0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRyxNQUFBLFFBQVEsQ0FBRSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUcsS0FBSyxDQUFFLENBQUUsQ0FBRTtRQUNyRSxDQUFDO1FBRUQsSUFBb0IsQ0FBQyxLQUFVLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxDQUFFLENBQUMsQ0FBQztRQUUzRCxNQUFNLEdBQUcsQ0FBRSxLQUFTLEVBQUcsS0FBVyxFQUFVLEVBQUU7WUFFdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBRTtZQUNuQyxNQUFNLEtBQUssR0FBRyxDQUFFLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBRSxDQUFFO1lBRXpFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBRyxLQUFLLEVBQUcsS0FBSyxDQUFFLENBQUUsQ0FBRTtRQUM3RCxDQUFDLENBQUE7S0FDRDtJQWpDWSxlQUFTLFlBaUNyQixDQUFBO0lBRUQsTUFBc0IsTUFBYyxTQUFRLElBQVU7UUFFckQsQ0FBQztLQUNEO0lBSHFCLFlBQU0sU0FHM0IsQ0FBQTtBQVFGLENBQUMsRUEzRmdCLEtBQUssS0FBTCxLQUFLLFFBMkZyQiJ9