import { leaf } from "./leaf.js";
export function ksel(init) {
    return new ksel.Selector(init);
}
(function (ksel) {
    class Selector {
        current;
        items = new Map;
        stat_src = { false: leaf(false), true: leaf(true) };
        constructor(init) {
            this.current = leaf.ll.make(init);
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
                item = new Item(this, key, this.get_stat_src(key));
                this.items.set(key, item);
            }
            return item;
        }
        get_stat_src(key) {
            return (key == this.current.value) ? this.stat_src.true : this.stat_src.false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5LXNlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwva2V5LXNlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFFO0FBSWxDLE1BQU0sVUFBVSxJQUFJLENBQVMsSUFBb0I7SUFFaEQsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFFLENBQUU7QUFDMUMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFHcEIsTUFBYSxRQUFRO1FBRUosT0FBTyxDQUFlO1FBQzVCLEtBQUssR0FBRyxJQUFJLEdBQXNCLENBQUU7UUFDcEMsUUFBUSxHQUFHLEVBQUUsS0FBSyxFQUFHLElBQUksQ0FBRyxLQUFLLENBQUUsRUFBRyxJQUFJLEVBQUcsSUFBSSxDQUFHLElBQUksQ0FBRSxFQUFFLENBQUU7UUFFeEUsWUFFQyxJQUFvQjtZQUdwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBRXRDLE1BQU0sVUFBVSxHQUF1QixDQUFFLEtBQUssRUFBRyxLQUFLLEVBQUcsRUFBRTtnQkFFMUQsTUFBTSxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFFLENBQUM7Z0JBRXZDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFFO2dCQUM3QyxJQUFJLEtBQUs7b0JBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRTtZQUM3QyxDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsR0FBRyxDQUFTLElBQUksQ0FBQyxPQUFPLEVBQUcsVUFBVSxDQUFFLENBQUU7UUFDL0MsQ0FBQztRQUVNLFNBQVMsQ0FBRyxHQUFPO1lBRXpCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFHLEdBQUcsQ0FBRSxDQUFFO1lBQ25DLElBQUksQ0FBRSxJQUFJLEVBQ1Y7Z0JBQ0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFHLElBQUksRUFBRyxHQUFHLEVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRyxHQUFHLENBQUUsQ0FBRSxDQUFFO2dCQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxHQUFHLEVBQUcsSUFBSSxDQUFFLENBQUU7YUFDL0I7WUFDRCxPQUFPLElBQUksQ0FBRTtRQUNkLENBQUM7UUFFUyxZQUFZLENBQUcsR0FBTztZQUUvQixPQUFPLENBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBRTtRQUNsRixDQUFDO0tBQ0Q7SUF4Q1ksYUFBUSxXQXdDcEIsQ0FBQTtJQUtZLFNBQUksR0FBRyxDQUFRLFFBQXlCLEVBQUcsR0FBTyxFQUFHLFVBQXNCLEVBQUcsRUFBRSxDQUM3RixDQUNDLElBQUksSUFBSSxDQUFHLFFBQVEsRUFBRyxHQUFHLEVBQUcsVUFBVSxDQUFFLENBQ3hDLENBQUU7SUFFSCxNQUFhLElBQVcsU0FBUSxJQUFJLENBQUMsSUFBZ0I7UUFJekM7UUFDTTtRQUhqQixZQUVXLFFBQXlCLEVBQ25CLEdBQU8sRUFDdkIsVUFBc0I7WUFHdEIsS0FBSyxDQUFHLFVBQVUsRUFBRyxFQUFFLENBQUUsQ0FBRTtZQUxqQixhQUFRLEdBQVIsUUFBUSxDQUFpQjtZQUNuQixRQUFHLEdBQUgsR0FBRyxDQUFJO1FBS3hCLENBQUM7UUFFRCxJQUFvQixLQUFLLEtBQWdCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUM7UUFFeEQsTUFBTTtZQUVaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFO1FBQ3pDLENBQUM7S0FDRDtJQWxCWSxTQUFJLE9Ba0JoQixDQUFBO0lBRUQsTUFBTSxFQUFFLEdBQUcsQ0FBRSxDQUFXLEVBQUcsRUFBRSxDQUFDLENBQUMsQ0FBRTtBQUNsQyxDQUFDLEVBMUVnQixJQUFJLEtBQUosSUFBSSxRQTBFcEIifQ==