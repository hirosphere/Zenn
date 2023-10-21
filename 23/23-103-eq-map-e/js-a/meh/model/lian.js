// class Lian ( 連：リエン・れん ) Arrayをリアクティブにするクラス //
export class Lian extends Array {
    refs = new Set();
    ref(update) {
        this.refs.add(update);
        update(0, 0, this.length);
    }
    add(item, order) {
        order = Math.min(order ?? this.length, this.length);
        this.splice(order, 0, item);
    }
    splice(start, deleteCount, ...newItems) {
        const rt = super.splice(start, deleteCount, ...newItems);
        this.refs.forEach(update => update(start, rt.length, newItems?.length ?? 0));
        return rt;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGlhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxnREFBZ0Q7QUFFaEQsTUFBTSxPQUFPLElBQWlCLFNBQVEsS0FBVztJQUV0QyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQW1CLENBQUM7SUFFckMsR0FBRyxDQUFFLE1BQW9CO1FBRS9CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sR0FBRyxDQUFFLElBQVEsRUFBRSxLQUFnQjtRQUVyQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBRSxDQUFDO0lBQy9CLENBQUM7SUFFTSxNQUFNLENBQUUsS0FBYSxFQUFFLFdBQW1CLEVBQUUsR0FBRyxRQUFhO1FBRWxFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxHQUFJLFFBQVEsQ0FBRSxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQyxDQUFHLENBQUUsQ0FBQztRQUNqRixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7Q0FDRCJ9