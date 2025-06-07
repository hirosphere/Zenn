import { leaf } from "./leaf.js";
export function ksel(init) {
    return new ksel.Selector(init);
}
(function (ksel) {
    class Selector {
        current;
        items = new Map;
        state_source;
        constructor(init = undefined, com_state) {
            this.state_source = com_state ?? state_source.true;
            this.current = leaf.ll.make(init);
            const key_change = (new_k, old_k) => {
                const old_i = old_k !== undefined && this.items.get(old_k);
                const new_i = this.items.get(new_k);
                if (old_i)
                    old_i.src = state_source.false;
                if (new_i)
                    new_i.src = this.state_source;
            };
            leaf.ref(this.current, key_change);
        }
        make_item(key) {
            let item = this.items.get(key);
            if (!item) {
                item = new Item(this, key, this.get_stat_src(key));
                this.items.set(key, item);
            }
            return item;
        }
        get_stat_src(key) {
            return (key == this.current.value) ? this.state_source : state_source.false;
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
const state_source = {
    false: leaf(false),
    true: leaf(true)
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3NlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwva3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFFO0FBSWxDLE1BQU0sVUFBVSxJQUFJLENBQVMsSUFBZ0M7SUFFNUQsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFFLENBQUU7QUFDMUMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFHcEIsTUFBYSxRQUFRO1FBRUosT0FBTyxDQUEyQjtRQUN4QyxLQUFLLEdBQUcsSUFBSSxHQUFrQyxDQUFFO1FBQ2hELFlBQVksQ0FBYztRQUVwQyxZQUVDLE9BQW1DLFNBQVMsRUFDNUMsU0FBdUI7WUFHdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQTtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBRXRDLE1BQU0sVUFBVSxHQUFtQyxDQUFFLEtBQUssRUFBRyxLQUFLLEVBQUcsRUFBRTtnQkFFdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFFLENBQUM7Z0JBRXZDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUU7Z0JBQzVDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUU7WUFDNUMsQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBcUIsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFVLENBQUUsQ0FBRTtRQUMzRCxDQUFDO1FBRU0sU0FBUyxDQUFHLEdBQU87WUFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFFLElBQUksRUFDVjtnQkFDQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUcsSUFBSSxFQUFHLEdBQUcsRUFBRyxJQUFJLENBQUMsWUFBWSxDQUFHLEdBQUcsQ0FBRSxDQUFFLENBQUU7Z0JBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEdBQUcsRUFBRyxJQUFJLENBQUUsQ0FBRTthQUMvQjtZQUNELE9BQU8sSUFBSSxDQUFFO1FBQ2QsQ0FBQztRQUVTLFlBQVksQ0FBRyxHQUFPO1lBRS9CLE9BQU8sQ0FBRSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBRTtRQUNoRixDQUFDO0tBQ0Q7SUExQ1ksYUFBUSxXQTBDcEIsQ0FBQTtJQUtZLFNBQUksR0FBRyxDQUFRLFFBQXlCLEVBQUcsR0FBTyxFQUFHLFVBQXNCLEVBQUcsRUFBRSxDQUM3RixDQUNDLElBQUksSUFBSSxDQUFHLFFBQVEsRUFBRyxHQUFHLEVBQUcsVUFBVSxDQUFFLENBQ3hDLENBQUU7SUFFSCxNQUFhLElBQVcsU0FBUSxJQUFJLENBQUMsSUFBZ0I7UUFJekM7UUFDTTtRQUhqQixZQUVXLFFBQXlCLEVBQ25CLEdBQU8sRUFDdkIsVUFBc0I7WUFHdEIsS0FBSyxDQUFHLFVBQVUsRUFBRyxFQUFFLENBQUUsQ0FBRTtZQUxqQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtZQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFJO1FBS3hCLENBQUM7UUFFRCxJQUFvQixLQUFLLEtBQWdCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUM7UUFFeEQsTUFBTTtZQUVaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFO1FBQ3pDLENBQUM7S0FDRDtJQWxCWSxTQUFJLE9Ba0JoQixDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsQ0FBRSxDQUFXLEVBQUcsRUFBRSxDQUFDLENBQUMsQ0FBRTtBQUNsQyxDQUFDLEVBNUVnQixJQUFJLEtBQUosSUFBSSxRQTRFcEI7QUFFRCxNQUFNLFlBQVksR0FDbEI7SUFDQyxLQUFLLEVBQUcsSUFBSSxDQUFHLEtBQUssQ0FBRTtJQUN0QixJQUFJLEVBQUcsSUFBSSxDQUFHLElBQUksQ0FBRTtDQUNwQixDQUFFIn0=