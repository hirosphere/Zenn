import { Exist, } from "../model/exist.js";
import { Leaf } from "../model/leaf.js";
export class Browser extends Exist {
    title;
    constructor(com, initv) {
        super(com);
        this.title = new Leaf.String(this, initv?.title ?? "", () => this.updatetitle());
        this.updatetitle();
    }
    updatetitle() {
        document.title = this.title.value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssR0FBRyxNQUFNLG1CQUFtQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQU94QyxNQUFNLE9BQU8sT0FBUSxTQUFRLEtBQUs7SUFFakIsS0FBSyxDQUFlO0lBRXBDLFlBQWEsR0FBVyxFQUFFLEtBQWU7UUFFeEMsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRWIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBRSxDQUFDO1FBRW5GLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRVMsV0FBVztRQUVwQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ25DLENBQUM7Q0FDRCJ9