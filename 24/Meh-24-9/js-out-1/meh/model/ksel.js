import { log } from "../common.js";
import { leaf } from "./leaf.js";
export function ksel(init) {
    return new ksel.Selector(init);
}
(function (ksel) {
    class Selector {
        current;
        items = new Map;
        state_source = { false: leaf(false), true: leaf(true) };
        constructor(init) {
            this.current = leaf.ll.make(init);
            const key_change = (new_k, old_k) => {
                const old_i = old_k !== undefined && this.items.get(old_k);
                const new_i = this.items.get(new_k);
                if (old_i)
                    old_i.src = this.state_source.false;
                if (new_i)
                    new_i.src = this.state_source.true;
            };
            leaf.ref(this.current, key_change);
        }
        make_item(key) {
            let item = this.items.get(key);
            if (!item) {
                item = new Item(this, key, this.get_stat_src(key));
                this.items.set(key, item);
                log(item.value);
            }
            return item;
        }
        get_stat_src(key) {
            return (key == this.current.value) ? this.state_source.true : this.state_source.false;
        }
    }
    ksel.Selector = Selector;
    ksel.item = (selector, key, init_state) => (new Item(selector, key, init_state));
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
    ksel.Item = Item;
    const cv = (v) => v;
})(ksel || (ksel = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3NlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwva3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFFO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUU7QUFJbEMsTUFBTSxVQUFVLElBQUksQ0FBUyxJQUFvQjtJQUVoRCxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBUyxJQUFJLENBQUUsQ0FBRTtBQUMxQyxDQUFDO0FBRUQsV0FBaUIsSUFBSTtJQUdwQixNQUFhLFFBQVE7UUFFSixPQUFPLENBQWU7UUFDNUIsS0FBSyxHQUFHLElBQUksR0FBc0IsQ0FBRTtRQUNwQyxZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUcsSUFBSSxDQUFHLEtBQUssQ0FBRSxFQUFHLElBQUksRUFBRyxJQUFJLENBQUcsSUFBSSxDQUFFLEVBQUUsQ0FBRTtRQUU1RSxZQUVDLElBQW9CO1lBR3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUU7WUFFdEMsTUFBTSxVQUFVLEdBQXVCLENBQUUsS0FBSyxFQUFHLEtBQUssRUFBRyxFQUFFO2dCQUUxRCxNQUFNLEtBQUssR0FBRyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEtBQUssQ0FBRSxDQUFDO2dCQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFFdkMsSUFBSSxLQUFLO29CQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUU7Z0JBQ2pELElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFFO1lBQ2pELENBQUMsQ0FBQztZQUVGLElBQUksQ0FBQyxHQUFHLENBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFVLENBQUUsQ0FBRTtRQUMvQyxDQUFDO1FBRU0sU0FBUyxDQUFHLEdBQU87WUFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFFLElBQUksRUFDVjtnQkFDQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUcsSUFBSSxFQUFHLEdBQUcsRUFBRyxJQUFJLENBQUMsWUFBWSxDQUFHLEdBQUcsQ0FBRSxDQUFFLENBQUU7Z0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEdBQUcsRUFBRyxJQUFJLENBQUUsQ0FBRTtnQkFFL0IsR0FBRyxDQUFHLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBQTthQUNsQjtZQUNELE9BQU8sSUFBSSxDQUFFO1FBQ2QsQ0FBQztRQUVTLFlBQVksQ0FBRyxHQUFPO1lBRS9CLE9BQU8sQ0FBRSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFFO1FBQzFGLENBQUM7S0FDRDtJQTFDWSxhQUFRLFdBMENwQixDQUFBO0lBS1ksU0FBSSxHQUFHLENBQVEsUUFBeUIsRUFBRyxHQUFPLEVBQUcsVUFBc0IsRUFBRyxFQUFFLENBQzdGLENBQ0MsSUFBSSxJQUFJLENBQUcsUUFBUSxFQUFHLEdBQUcsRUFBRyxVQUFVLENBQUUsQ0FDeEMsQ0FBRTtJQUVILE1BQWEsSUFBVyxTQUFRLElBQUksQ0FBQyxJQUFnQjtRQUl6QztRQUNNO1FBSGpCLFlBRVcsUUFBeUIsRUFDbkIsR0FBTyxFQUN2QixVQUFzQjtZQUd0QixLQUFLLENBQUcsVUFBVSxFQUFHLEVBQUUsQ0FBRSxDQUFFO1lBTGpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1lBQ25CLFFBQUcsR0FBSCxHQUFHLENBQUk7UUFLeEIsQ0FBQztRQUVELElBQW9CLEtBQUssS0FBZ0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQztRQUV4RCxNQUFNO1lBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUU7UUFDekMsQ0FBQztLQUNEO0lBbEJZLFNBQUksT0FrQmhCLENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxDQUFFLENBQVcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFFO0FBQ2xDLENBQUMsRUE1RWdCLElBQUksS0FBSixJQUFJLFFBNEVwQiJ9