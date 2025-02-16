import { leaf } from "./leaf.js";
export function ksel(init) {
    return new ksel.Selector(init);
}
(function (ksel) {
    class Selector {
        current;
        items = new Map;
        state_source;
        constructor(init, com_state) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia3NlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwva3NlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFFO0FBSWxDLE1BQU0sVUFBVSxJQUFJLENBQVMsSUFBb0I7SUFFaEQsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQVMsSUFBSSxDQUFFLENBQUU7QUFDMUMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFHcEIsTUFBYSxRQUFRO1FBRUosT0FBTyxDQUFlO1FBQzVCLEtBQUssR0FBRyxJQUFJLEdBQXNCLENBQUU7UUFDcEMsWUFBWSxDQUFjO1FBRXBDLFlBRUMsSUFBb0IsRUFDcEIsU0FBdUI7WUFHdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQTtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFHLElBQUksQ0FBRSxDQUFFO1lBRXRDLE1BQU0sVUFBVSxHQUF1QixDQUFFLEtBQUssRUFBRyxLQUFLLEVBQUcsRUFBRTtnQkFFMUQsTUFBTSxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxLQUFLLENBQUUsQ0FBQztnQkFDOUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsS0FBSyxDQUFFLENBQUM7Z0JBRXZDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUU7Z0JBQzVDLElBQUksS0FBSztvQkFBRyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUU7WUFDNUMsQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBUyxJQUFJLENBQUMsT0FBTyxFQUFHLFVBQVUsQ0FBRSxDQUFFO1FBQy9DLENBQUM7UUFFTSxTQUFTLENBQUcsR0FBTztZQUV6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRyxHQUFHLENBQUUsQ0FBRTtZQUNuQyxJQUFJLENBQUUsSUFBSSxFQUNWO2dCQUNDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBRyxJQUFJLEVBQUcsR0FBRyxFQUFHLElBQUksQ0FBQyxZQUFZLENBQUcsR0FBRyxDQUFFLENBQUUsQ0FBRTtnQkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUcsR0FBRyxFQUFHLElBQUksQ0FBRSxDQUFFO2FBQy9CO1lBQ0QsT0FBTyxJQUFJLENBQUU7UUFDZCxDQUFDO1FBRVMsWUFBWSxDQUFHLEdBQU87WUFFL0IsT0FBTyxDQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFFO1FBQ2hGLENBQUM7S0FDRDtJQTFDWSxhQUFRLFdBMENwQixDQUFBO0lBS1ksU0FBSSxHQUFHLENBQVEsUUFBeUIsRUFBRyxHQUFPLEVBQUcsVUFBc0IsRUFBRyxFQUFFLENBQzdGLENBQ0MsSUFBSSxJQUFJLENBQUcsUUFBUSxFQUFHLEdBQUcsRUFBRyxVQUFVLENBQUUsQ0FDeEMsQ0FBRTtJQUVILE1BQWEsSUFBVyxTQUFRLElBQUksQ0FBQyxJQUFnQjtRQUl6QztRQUNNO1FBSGpCLFlBRVcsUUFBeUIsRUFDbkIsR0FBTyxFQUN2QixVQUFzQjtZQUd0QixLQUFLLENBQUcsVUFBVSxFQUFHLEVBQUUsQ0FBRSxDQUFFO1lBTGpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1lBQ25CLFFBQUcsR0FBSCxHQUFHLENBQUk7UUFLeEIsQ0FBQztRQUVELElBQW9CLEtBQUssS0FBZ0IsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQztRQUV4RCxNQUFNO1lBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUU7UUFDekMsQ0FBQztLQUNEO0lBbEJZLFNBQUksT0FrQmhCLENBQUE7SUFFRCxNQUFNLEVBQUUsR0FBRyxDQUFFLENBQVcsRUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFFO0FBQ2xDLENBQUMsRUE1RWdCLElBQUksS0FBSixJQUFJLFFBNEVwQjtBQUVELE1BQU0sWUFBWSxHQUNsQjtJQUNDLEtBQUssRUFBRyxJQUFJLENBQUcsS0FBSyxDQUFFO0lBQ3RCLElBQUksRUFBRyxJQUFJLENBQUcsSUFBSSxDQUFFO0NBQ3BCLENBQUUifQ==