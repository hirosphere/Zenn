import { Exist, Leaf } from "./index.js";
export class Index extends Exist {
    title;
    constructor(con, args) {
        super(con);
        this.title = Leaf.make(this, args.title);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbmF2aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV6QyxNQUFNLE9BQU8sS0FBTSxTQUFRLEtBQUs7SUFFL0IsS0FBSyxDQUFnQjtJQUVyQixZQUFhLEdBQXFCLEVBQUUsSUFBaUI7UUFFcEQsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRWIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7SUFDNUMsQ0FBQztDQUNEIn0=