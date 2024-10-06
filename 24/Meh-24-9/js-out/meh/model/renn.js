import { log } from "../common.js";
import { Leafr } from "./leaf.js";
export class Renn {
    _items_ = [];
    constructor(items) {
        if (items)
            this.insert(items);
    }
    get items() {
        return this._items_;
    }
    insert(items, start = undefined) {
        const s = start ?? this._items_.length;
        this._items_.splice(s, 0, ...items);
        log("insert", items.length, this._items_.length);
    }
}
export class Order extends Leafr.num {
    source;
    constructor(source, ord) {
        super(ord);
        this.source = source;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvcmVubi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbEMsTUFBTSxPQUFPLElBQUk7SUFFTixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBRS9CLFlBQWEsS0FBYztRQUUxQixJQUFJLEtBQUs7WUFBRyxJQUFJLENBQUMsTUFBTSxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQ2xDLENBQUM7SUFJRCxJQUFXLEtBQUs7UUFFZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckIsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFZLEVBQUUsUUFBbUIsU0FBUztRQUV4RCxNQUFNLENBQUMsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUU7UUFFeEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFJLEtBQUssQ0FBRSxDQUFDO1FBRXhDLEdBQUcsQ0FBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lBQ3BELENBQUM7Q0FDRDtBQUlELE1BQU0sT0FBTyxLQUFZLFNBQVEsS0FBSyxDQUFDLEdBQUc7SUFJeEI7SUFGakIsWUFFaUIsTUFBVSxFQUFFLEdBQVk7UUFFeEMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRkcsV0FBTSxHQUFOLE1BQU0sQ0FBSTtJQUczQixDQUFDO0NBQ0QifQ==