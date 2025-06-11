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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3NlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwva3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFFO0FBSWxDLE1BQU0sVUFBVSxJQUFJLENBQVMsSUFBZ0M7SUFFNUQsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFFLENBQUU7QUFDMUMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFHcEIsTUFBYSxRQUFRO1FBRUosT0FBTyxDQUEyQjtRQUN4QyxLQUFLLEdBQUcsSUFBSSxHQUFrQyxDQUFFO1FBQ2hELFlBQVksQ0FBYztRQUVwQyxZQUVDLE9BQW1DLFNBQVMsRUFDNUMsU0FBdUI7WUFHdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQTtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBRXRDLE1BQU0sVUFBVSxHQUFtQyxDQUFFLEtBQUssRUFBRyxLQUFLLEVBQUcsRUFBRTtnQkFFdEUsTUFBTSxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFFLENBQUM7Z0JBRXZDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUU7Z0JBQzVDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUU7WUFDNUMsQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBcUIsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFVLENBQUUsQ0FBRTtRQUMzRCxDQUFDO1FBRU0sU0FBUyxDQUFHLEdBQU87WUFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFFLElBQUksRUFDVixDQUFDO2dCQUNBLElBQUksR0FBRyxJQUFJLElBQUksQ0FBRyxJQUFJLEVBQUcsR0FBRyxFQUFHLElBQUksQ0FBQyxZQUFZLENBQUcsR0FBRyxDQUFFLENBQUUsQ0FBRTtnQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxFQUFHLElBQUksQ0FBRSxDQUFFO1lBQ2hDLENBQUM7WUFDRCxPQUFPLElBQUksQ0FBRTtRQUNkLENBQUM7UUFFUyxZQUFZLENBQUcsR0FBTztZQUUvQixPQUFPLENBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUU7UUFDaEYsQ0FBQztLQUNEO0lBMUNZLGFBQVEsV0EwQ3BCLENBQUE7SUFLWSxTQUFJLEdBQUcsQ0FBUSxRQUF5QixFQUFHLEdBQU8sRUFBRyxVQUFzQixFQUFHLEVBQUUsQ0FDN0YsQ0FDQyxJQUFJLElBQUksQ0FBRyxRQUFRLEVBQUcsR0FBRyxFQUFHLFVBQVUsQ0FBRSxDQUN4QyxDQUFFO0lBRUgsTUFBYSxJQUFXLFNBQVEsSUFBSSxDQUFDLElBQWdCO1FBSXpDO1FBQ007UUFIakIsWUFFVyxRQUF5QixFQUNuQixHQUFPLEVBQ3ZCLFVBQXNCO1lBR3RCLEtBQUssQ0FBRyxVQUFVLEVBQUcsRUFBRSxDQUFFLENBQUU7WUFMakIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7WUFDbkIsUUFBRyxHQUFILEdBQUcsQ0FBSTtRQUt4QixDQUFDO1FBRUQsSUFBb0IsS0FBSyxLQUFnQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDO1FBRXhELE1BQU07WUFFWixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRTtRQUN6QyxDQUFDO0tBQ0Q7SUFsQlksU0FBSSxPQWtCaEIsQ0FBQTtJQUVELE1BQU0sRUFBRSxHQUFHLENBQUUsQ0FBVyxFQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUU7QUFDbEMsQ0FBQyxFQTVFZ0IsSUFBSSxLQUFKLElBQUksUUE0RXBCO0FBRUQsTUFBTSxZQUFZLEdBQ2xCO0lBQ0MsS0FBSyxFQUFHLElBQUksQ0FBRyxLQUFLLENBQUU7SUFDdEIsSUFBSSxFQUFHLElBQUksQ0FBRyxJQUFJLENBQUU7Q0FDcEIsQ0FBRSJ9