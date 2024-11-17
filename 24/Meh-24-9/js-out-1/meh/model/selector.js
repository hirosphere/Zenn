import { log } from "../common.js";
import { leaf } from "./leaf.js";
export function selector(init) {
    return new selector.Selector(init);
}
(function (selector_1) {
    class Selector {
        current;
        items = new Map;
        stat_src = { false: leaf(false), true: leaf(true) };
        constructor(init) {
            this.current = leaf(init);
            const key_change = (new_k, old_k) => {
                const old_i = old_k !== undefined && this.items.get(old_k);
                const new_i = this.items.get(new_k);
                if (old_i)
                    old_i.src = this.stat_src.false;
                if (new_i)
                    new_i.src = this.stat_src.true;
            };
            leaf.ref(this.current, key_change);
        }
        make_item(key) {
            let item = this.items.get(key);
            if (!item) {
                log("make_item", key);
                item = new Item(this, key, this.get_stat_src(key));
                this.items.set(key, item);
            }
            return item;
        }
        get_stat_src(key) {
            return (key == this.current.value) ? this.stat_src.true : this.stat_src.false;
        }
    }
    selector_1.Selector = Selector;
    class Item extends leaf.Conv {
        selector;
        key;
        constructor(selector, key, init_state) {
            super(init_state, cv);
            this.selector = selector;
            this.key = key;
        }
        get value() { return super.value; }
        select() {
            this.selector.current.value = this.key;
        }
    }
    selector_1.Item = Item;
    const cv = (v) => v;
})(selector || (selector = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL21vZGVsL3NlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxjQUFjLENBQUU7QUFDcEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBRTtBQUlsQyxNQUFNLFVBQVUsUUFBUSxDQUFTLElBQVE7SUFFeEMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUcsSUFBSSxDQUFFLENBQUU7QUFDeEMsQ0FBQztBQUVELFdBQWlCLFVBQVE7SUFFeEIsTUFBYSxRQUFRO1FBRUosT0FBTyxDQUFlO1FBQzVCLEtBQUssR0FBRyxJQUFJLEdBQXNCLENBQUU7UUFDcEMsUUFBUSxHQUFHLEVBQUUsS0FBSyxFQUFHLElBQUksQ0FBRyxLQUFLLENBQUUsRUFBRyxJQUFJLEVBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxFQUFFLENBQUU7UUFFeEUsWUFFQyxJQUFRO1lBR1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQVMsSUFBSSxDQUFFLENBQUU7WUFFcEMsTUFBTSxVQUFVLEdBQXVCLENBQUUsS0FBSyxFQUFHLEtBQUssRUFBRyxFQUFFO2dCQUUxRCxNQUFNLEtBQUssR0FBRyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEtBQUssQ0FBRSxDQUFDO2dCQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFFdkMsSUFBSSxLQUFLO29CQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUU7Z0JBQzdDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFO1lBQzdDLENBQUMsQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFVLENBQUUsQ0FBRTtRQUMvQyxDQUFDO1FBRU0sU0FBUyxDQUFHLEdBQU87WUFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFFLElBQUksRUFDVjtnQkFDQyxHQUFHLENBQUUsV0FBVyxFQUFHLEdBQUcsQ0FBRSxDQUFFO2dCQUUxQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUcsSUFBSSxFQUFHLEdBQUcsRUFBRyxJQUFJLENBQUMsWUFBWSxDQUFHLEdBQUcsQ0FBRSxDQUFFLENBQUU7Z0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEdBQUcsRUFBRyxJQUFJLENBQUUsQ0FBRTthQUMvQjtZQUNELE9BQU8sSUFBSSxDQUFFO1FBQ2QsQ0FBQztRQUVTLFlBQVksQ0FBRyxHQUFPO1lBRS9CLE9BQU8sQ0FBRSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFFO1FBQ2xGLENBQUM7S0FDRDtJQTFDWSxtQkFBUSxXQTBDcEIsQ0FBQTtJQUVELE1BQWEsSUFBVyxTQUFRLElBQUksQ0FBQyxJQUFnQjtRQUl6QztRQUNNO1FBSGpCLFlBRVcsUUFBeUIsRUFDbkIsR0FBTyxFQUN2QixVQUFzQjtZQUd0QixLQUFLLENBQUcsVUFBVSxFQUFHLEVBQUUsQ0FBRSxDQUFFO1lBTGpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1lBQ25CLFFBQUcsR0FBSCxHQUFHLENBQUk7UUFLeEIsQ0FBQztRQUVELElBQW9CLEtBQUssS0FBZ0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQztRQUV4RCxNQUFNO1lBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUU7UUFDekMsQ0FBQztLQUNEO0lBbEJZLGVBQUksT0FrQmhCLENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxDQUFFLENBQVcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFFO0FBQ2xDLENBQUMsRUFuRWdCLFFBQVEsS0FBUixRQUFRLFFBbUV4QiJ9