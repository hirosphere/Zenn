import { Exist, Leafr, Leaf, Renn } from "./index.js";
import { _setvalue } from "../shadow-props.js";
const log = console.log;
export class Browser extends Exist {
    args;
    constructor(com, args) {
        super(com);
        this.args = args;
    }
    current = new Leafr(this, undefined);
    set_current(index, tohistory = false) {
        this.current[_setvalue](index);
        document.title =
            this.current?.val?.title.val ??
                this.args?.default_title ??
                "";
    }
}
(function (Browser) {
    class Item {
        browser;
        index;
        constructor(browser, index) {
            this.browser = browser;
            this.index = index;
        }
        select(to_history = false) {
            this.browser.set_current(this.index, to_history);
        }
    }
    Browser.Item = Item;
})(Browser || (Browser = {}));
export class Index extends Exist {
    title;
    path;
    parts = new Renn(this);
    constructor(con, initv) {
        super(con);
        this.title = Leaf.make(this, initv?.title ?? "");
        this.path = new Leafr.String(this, initv?.path ?? "");
    }
    get link() {
        log(this.title.value);
        return "";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbmF2aS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFVLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFRLE1BQU0sWUFBWSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBRXhCLE1BQU0sT0FBTyxPQUFRLFNBQVEsS0FBSztJQUVHO0lBQXBDLFlBQWEsR0FBVyxFQUFZLElBQXFCO1FBRXhELEtBQUssQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUZzQixTQUFJLEdBQUosSUFBSSxDQUFpQjtJQUd6RCxDQUFDO0lBRWUsT0FBTyxHQUFHLElBQUksS0FBSyxDQUF5QixJQUFJLEVBQUUsU0FBUyxDQUFFLENBQUM7SUFFdkUsV0FBVyxDQUFFLEtBQXlCLEVBQUUsWUFBc0IsS0FBSztRQUV6RSxJQUFJLENBQUMsT0FBTyxDQUFFLFNBQVMsQ0FBRSxDQUFFLEtBQUssQ0FBRSxDQUFDO1FBRW5DLFFBQVEsQ0FBQyxLQUFLO1lBQ2IsSUFBSSxDQUFDLE9BQVEsRUFBRyxHQUFJLEVBQUcsS0FBSyxDQUFDLEdBQUc7Z0JBQ2hDLElBQUksQ0FBQyxJQUFLLEVBQUcsYUFBYTtnQkFDMUIsRUFBRSxDQUNGO0lBQ0YsQ0FBQztDQUNEO0FBRUQsV0FBaUIsT0FBTztJQU92QixNQUFhLElBQUk7UUFJTDtRQUNNO1FBSGpCLFlBRVcsT0FBaUIsRUFDWCxLQUF5QjtZQUQvQixZQUFPLEdBQVAsT0FBTyxDQUFVO1lBQ1gsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFFekMsQ0FBQztRQUVLLE1BQU0sQ0FBRSxhQUF1QixLQUFLO1lBRTFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFFLENBQUM7UUFDcEQsQ0FBQztLQUNEO0lBYlksWUFBSSxPQWFoQixDQUFBO0FBQ0YsQ0FBQyxFQXJCZ0IsT0FBTyxLQUFQLE9BQU8sUUFxQnZCO0FBRUQsTUFBTSxPQUFPLEtBQWdDLFNBQVEsS0FBSztJQUV6QyxLQUFLLENBQWdCO0lBQ3JCLElBQUksQ0FBQztJQUNMLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBUyxJQUFJLENBQUUsQ0FBQztJQUVoRCxZQUFhLEdBQXFCLEVBQUUsS0FBbUI7UUFFdEQsS0FBSyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRWIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFXLElBQUk7UUFFZCxHQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUUsQ0FBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7Q0FDRCJ9