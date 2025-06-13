import { Life } from "./Life.js";
export const setValue = Symbol();
export function Leafr(iv) {
    return new Leafr.Source(iv);
}
(function (Leafr) {
    /* */
    class Base extends Life {
        cvr(stor, rtos) {
            return new Converter(this, stor, rtos);
        }
    }
    Leafr.Base = Base;
    /* */
    class Source extends Base {
        p_value;
        constructor(p_value) {
            super();
            this.p_value = p_value;
        }
        get $() {
            return this.p_value;
        }
        [setValue](new_v, notify = true) {
            if (new_v === this.p_value)
                return;
            const old_v = this.p_value;
            this.p_value = new_v;
            notify &&
                this.p_refs.forEach(ref => ref.vchan(new_v, old_v));
        }
    }
    Leafr.Source = Source;
    /* */
    class Converter extends Base {
        source;
        SR;
        RS;
        constructor(source, SR, RS) {
            super();
            this.source = source;
            this.SR = SR;
            this.RS = RS;
            const ref = {
                lterm: () => this.terminate(),
                vchan: (s_new, s_old) => {
                    const r_new = this.SR(s_new);
                    const r_old = s_old !== undefined ? this.SR(s_old) : undefined;
                    this.p_refs.forEach(ref => ref.vchan(r_new, r_old));
                }
            };
            source.addRef(ref);
        }
        get $() {
            return this.SR(this.source.$);
        }
        [setValue](new_v, notify = true) {
            if (this.RS)
                this.source[setValue](this.RS(new_v), notify);
        }
    }
    Leafr.Converter = Converter;
})(Leafr || (Leafr = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvTWVoL01vZGVsL0xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUU7QUFFbEMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRyxDQUFFO0FBRW5DLE1BQU0sVUFBVSxLQUFLLENBQVMsRUFBTTtJQUVuQyxPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBRyxFQUFFLENBQUUsQ0FBRTtBQUNqQyxDQUFDO0FBaUJELFdBQWlCLEtBQUs7SUFFckIsS0FBSztJQUVMLE1BQXNCLElBQVksU0FBUSxJQUF3QjtRQUsxRCxHQUFHLENBQVMsSUFBd0IsRUFBRyxJQUEwQjtZQUV2RSxPQUFPLElBQUksU0FBUyxDQUFhLElBQUksRUFBRyxJQUFJLEVBQUcsSUFBSSxDQUFFLENBQUU7UUFDeEQsQ0FBQztLQUNEO0lBVHFCLFVBQUksT0FTekIsQ0FBQTtJQUVELEtBQUs7SUFFTCxNQUFhLE1BQWEsU0FBUSxJQUFVO1FBRW5CO1FBQXhCLFlBQXdCLE9BQVc7WUFFbEMsS0FBSyxFQUFHLENBQUU7WUFGYSxZQUFPLEdBQVAsT0FBTyxDQUFJO1FBR25DLENBQUM7UUFFRCxJQUFXLENBQUM7WUFFWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUU7UUFDdEIsQ0FBQztRQUVNLENBQUUsUUFBUSxDQUFFLENBQUcsS0FBUyxFQUFHLFNBQW1CLElBQUk7WUFFeEQsSUFBSyxLQUFLLEtBQUssSUFBSSxDQUFDLE9BQU87Z0JBQUksT0FBUTtZQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFFO1lBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFFO1lBRXRCLE1BQU07Z0JBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBRWxCLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBRyxLQUFLLEVBQUcsS0FBSyxDQUFFLENBQ2xDLENBQUU7UUFDSixDQUFDO0tBQ0Q7SUF6QlksWUFBTSxTQXlCbEIsQ0FBQTtJQUVELEtBQUs7SUFFTCxNQUFhLFNBQW9CLFNBQVEsSUFBVTtRQUl2QztRQUNBO1FBQ0E7UUFKWCxZQUVXLE1BQW9CLEVBQ3BCLEVBQXVCLEVBQ3ZCLEVBQXlCO1lBR25DLEtBQUssRUFBRyxDQUFFO1lBTEEsV0FBTSxHQUFOLE1BQU0sQ0FBYztZQUNwQixPQUFFLEdBQUYsRUFBRSxDQUFxQjtZQUN2QixPQUFFLEdBQUYsRUFBRSxDQUF1QjtZQUtuQyxNQUFNLEdBQUcsR0FDVDtnQkFDQyxLQUFLLEVBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRztnQkFDL0IsS0FBSyxFQUFHLENBQUUsS0FBSyxFQUFHLEtBQUssRUFBRyxFQUFFO29CQUUzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFHLEtBQUssQ0FBRSxDQUFFO29CQUNqQyxNQUFNLEtBQUssR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFHLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUU7b0JBQ25FLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUVsQixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUcsS0FBSyxFQUFHLEtBQUssQ0FBRSxDQUNsQyxDQUFBO2dCQUNGLENBQUM7YUFDRCxDQUFBO1lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBRyxHQUFHLENBQUUsQ0FBRTtRQUN4QixDQUFDO1FBRUQsSUFBVyxDQUFDO1lBRVgsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLENBQUU7UUFDbkMsQ0FBQztRQUVNLENBQUUsUUFBUSxDQUFFLENBQUcsS0FBUyxFQUFHLFNBQW1CLElBQUk7WUFFeEQsSUFBSyxJQUFJLENBQUMsRUFBRTtnQkFBSSxJQUFJLENBQUMsTUFBTSxDQUFHLFFBQVEsQ0FBRSxDQUV2QyxJQUFJLENBQUMsRUFBRSxDQUFHLEtBQUssQ0FBRSxFQUNqQixNQUFNLENBQ04sQ0FBRTtRQUNKLENBQUM7S0FDRDtJQXpDWSxlQUFTLFlBeUNyQixDQUFBO0FBUUYsQ0FBQyxFQS9GZ0IsS0FBSyxLQUFMLEtBQUssUUErRnJCIn0=