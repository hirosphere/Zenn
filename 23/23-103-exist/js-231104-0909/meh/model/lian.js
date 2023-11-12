/*
    [ class Lian ]

    要素の順序・構成の変更通知が得られるArray。
    要素の型は、専用のLian.Itemクラスの継承クラスのみ。

    DOMエレメントのchildNodesの動的な構成変更を実現するために、モデルとして使用。
*/
import { Leaf, setRoValue } from "./leaf.js";
const log = console.log;
export class Lian extends Array {
    static create(items) {
        return new Lian().addItems(items);
    }
    refs = new Set();
    ref(ref) {
        this.refs.add(ref);
        ref.add?.(0, this.length);
    }
    //  //
    addItems(items, start) {
        const st = regnext(this, start);
        this.splice(st, 0, ...items);
        items.forEach(i => i[lian] = this);
        this.reorder(st, this.length);
        this.refs.forEach(ref => ref.add?.(st, items.length));
        return this;
    }
    // order operations //
    add(item, order) {
        const ord = regnext(this, order);
        this.splice(ord, 0, item);
        item[lian] = this;
        this.reorder(ord, this.length);
        this.refs.forEach(ref => ref.add?.(ord, 1));
    }
    remove(item) {
        if (item[lian] != this)
            return;
        const order = item.order.v;
        if (order < 0 || this.length <= order)
            return;
        if (item != this[order])
            return;
        delete item[lian];
        this.splice(order, 1);
        this.reorder(order, this.length);
        this.refs.forEach(ref => ref.remove?.(order, 1));
    }
    clear() {
        const len = this.length;
        this.refs.forEach((ref) => ref.remove?.(0, len));
        this.length = 0;
    }
    //  //
    reorder(start, next) {
        for (let ord = start; ord < next; ord++) {
            this[ord].order[setRoValue](ord);
        }
    }
}
const regnext = (ar, order) => {
    if (order == undefined || order > ar.length || order < 0)
        return ar.length;
    return order;
};
const lian = Symbol();
(function (Lian) {
    class Item {
        order = new Leaf.Ro.Number(0);
        [lian];
        remove() {
            this[lian]?.remove(this);
            delete this[lian];
        }
    }
    Lian.Item = Item;
})(Lian || (Lian = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGlhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztFQU9FO0FBRUYsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFN0MsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4QixNQUFNLE9BQU8sSUFBZ0MsU0FBUSxLQUFjO0lBRWxFLE1BQU0sQ0FBQyxNQUFNLENBQThCLEtBQWM7UUFFeEQsT0FBTyxJQUFJLElBQUksRUFBWSxDQUFFLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRVMsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFnQixDQUFDO0lBRWxDLEdBQUcsQ0FBRSxHQUFjO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO0lBRUMsUUFBUSxDQUFFLEtBQWMsRUFBRSxLQUFnQjtRQUVoRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFJLEtBQUssQ0FBRSxDQUFDO1FBRWhDLEtBQUssQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsSUFBSSxDQUFFLEdBQUcsSUFBSSxDQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFHLEdBQUcsQ0FBQyxFQUFF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