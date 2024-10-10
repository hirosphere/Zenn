import { log } from "../common.js";
import { Leafr } from "./leaf.js";
export class Renn {
    _items_ = [];
    _orders_ = [];
    constructor(items) {
        if (items)
            this.insert(items);
    }
    get items() {
        return this._items_;
    }
    insert(srcs, start) {
        start = pos_trim(start, srcs);
        this._items_.splice(start, 0, ...srcs);
        this._orders_.splice(start, 0, ...srcs.map(src => new Order(src)));
        log("insert", srcs.length, this._items_.length);
    }
}
const pos_trim = (pos, ar) => {
    if (pos === undefined || pos >= ar.length)
        return ar.length;
    if (pos < 0)
        return 0;
    return pos;
};
export class Order extends Leafr {
    source;
    constructor(source, order = undefined) {
        super(order);
        this.source = source;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVubi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvcmVubi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQVMsR0FBRyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFbEMsTUFBTSxPQUFPLElBQUk7SUFFTixPQUFPLEdBQVcsRUFBRSxDQUFDO0lBQ3JCLFFBQVEsR0FBb0IsRUFBRSxDQUFFO0lBRTFDLFlBQWEsS0FBYztRQUUxQixJQUFJLEtBQUs7WUFBRyxJQUFJLENBQUMsTUFBTSxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQ2xDLENBQUM7SUFHRCxJQUFXLEtBQUs7UUFFZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDckIsQ0FBQztJQUVNLE1BQU0sQ0FBRSxJQUFXLEVBQUUsS0FBYTtRQUV4QyxLQUFLLEdBQUcsUUFBUSxDQUFFLEtBQUssRUFBRSxJQUFJLENBQUUsQ0FBRTtRQUVqQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUksSUFBSSxDQUFFLENBQUM7UUFFM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBRW5CLEtBQUssRUFBRSxDQUFDLEVBQ1IsR0FBSSxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUUsR0FBRyxDQUFFLENBQUUsQ0FDdkMsQ0FBQztRQUVGLEdBQUcsQ0FBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lBQ25ELENBQUM7Q0FDRDtBQUVELE1BQU0sUUFBUSxHQUFHLENBQUUsR0FBUyxFQUFFLEVBQWtCLEVBQUcsRUFBRTtJQUVwRCxJQUFJLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNO1FBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFFO0lBQy9ELElBQUksR0FBRyxHQUFHLENBQUM7UUFBSSxPQUFPLENBQUMsQ0FBRTtJQUN6QixPQUFPLEdBQUcsQ0FBRTtBQUNiLENBQUMsQ0FBQTtBQUVELE1BQU0sT0FBTyxLQUFZLFNBQVEsS0FBYTtJQUk1QjtJQUZqQixZQUVpQixNQUFVLEVBQUUsUUFBYyxTQUFTO1FBRW5ELEtBQUssQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUZDLFdBQU0sR0FBTixNQUFNLENBQUk7SUFHM0IsQ0FBQztDQUNEIn0=