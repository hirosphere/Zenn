import { Life } from "./Life.js";
export const setValue = Symbol();
export var Leafr;
(function (Leafr) {
    Leafr.create = (iv) => new Source(iv);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGVhZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvTWVoL01vZGVsL0xlYWZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUU7QUFFbEMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sRUFBRyxDQUFFO0FBaUJuQyxNQUFNLEtBQVcsS0FBSyxDQWlHckI7QUFqR0QsV0FBaUIsS0FBSztJQUVSLFlBQU0sR0FBRyxDQUFRLEVBQU0sRUFBa0IsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFHLEVBQUUsQ0FBRSxDQUFFO0lBRTVFLEtBQUs7SUFFTCxNQUFzQixJQUFZLFNBQVEsSUFBd0I7UUFLMUQsR0FBRyxDQUFTLElBQXdCLEVBQUcsSUFBMEI7WUFFdkUsT0FBTyxJQUFJLFNBQVMsQ0FBYSxJQUFJLEVBQUcsSUFBSSxFQUFHLElBQUksQ0FBRSxDQUFFO1FBQ3hELENBQUM7S0FDRDtJQVRxQixVQUFJLE9BU3pCLENBQUE7SUFFRCxLQUFLO0lBRUwsTUFBYSxNQUFhLFNBQVEsSUFBVTtRQUVuQjtRQUF4QixZQUF3QixPQUFXO1lBRWxDLEtBQUssRUFBRyxDQUFFO1lBRmEsWUFBTyxHQUFQLE9BQU8sQ0FBSTtRQUduQyxDQUFDO1FBRUQsSUFBVyxDQUFDO1lBRVgsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFFO1FBQ3RCLENBQUM7UUFFTSxDQUFFLFFBQVEsQ0FBRSxDQUFHLEtBQVMsRUFBRyxTQUFtQixJQUFJO1lBRXhELElBQUssS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPO2dCQUFJLE9BQVE7WUFFdkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBRTtZQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBRTtZQUV0QixNQUFNO2dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUVsQixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUcsS0FBSyxFQUFHLEtBQUssQ0FBRSxDQUNsQyxDQUFFO1FBQ0osQ0FBQztLQUNEO0lBekJZLFlBQU0sU0F5QmxCLENBQUE7SUFFRCxLQUFLO0lBRUwsTUFBYSxTQUFvQixTQUFRLElBQVU7UUFJdkM7UUFDQTtRQUNBO1FBSlgsWUFFVyxNQUFvQixFQUNwQixFQUF1QixFQUN2QixFQUF5QjtZQUduQyxLQUFLLEVBQUcsQ0FBRTtZQUxBLFdBQU0sR0FBTixNQUFNLENBQWM7WUFDcEIsT0FBRSxHQUFGLEVBQUUsQ0FBcUI7WUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBdUI7WUFLbkMsTUFBTSxHQUFHLEdBQ1Q7Z0JBQ0MsS0FBSyxFQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUc7Z0JBQy9CLEtBQUssRUFBRyxDQUFFLEtBQUssRUFBRyxLQUFLLEVBQUcsRUFBRTtvQkFFM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBRyxLQUFLLENBQUUsQ0FBRTtvQkFDakMsTUFBTSxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBRyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFFO29CQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FFbEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFHLEtBQUssRUFBRyxLQUFLLENBQUUsQ0FDbEMsQ0FBQTtnQkFDRixDQUFDO2FBQ0QsQ0FBQTtZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUcsR0FBRyxDQUFFLENBQUU7UUFDeEIsQ0FBQztRQUVELElBQVcsQ0FBQztZQUVYLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxDQUFFO1FBQ25DLENBQUM7UUFFTSxDQUFFLFFBQVEsQ0FBRSxDQUFHLEtBQVMsRUFBRyxTQUFtQixJQUFJO1lBRXhELElBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRyxRQUFRLENBQUUsQ0FFdkMsSUFBSSxDQUFDLEVBQUUsQ0FBRyxLQUFLLENBQUUsRUFDakIsTUFBTSxDQUNOLENBQUU7UUFDSixDQUFDO0tBQ0Q7SUF6Q1ksZUFBUyxZQXlDckIsQ0FBQTtBQVFGLENBQUMsRUFqR2dCLEtBQUssS0FBTCxLQUFLLFFBaUdyQiJ9