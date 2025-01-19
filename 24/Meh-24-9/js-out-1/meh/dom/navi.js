import { leaf, set_value, Renn, ksel } from "../model/index.js";
import { ef } from "../dom/index.js";
export function navi(i) {
    return new navi.Navi(i);
}
(function (navi_1) {
    class Navi {
        i;
        title;
        root;
        currentIndex;
        selector;
        constructor(i) {
            this.i = i;
            this.title = leaf.str(i.title);
            this.root = (typeof i.root == "function" && i.root(this)) || new navi.Index(this, null, i.root);
            this.currentIndex = leaf(undefined);
            this.selector = ksel(this.currentIndex);
        }
        set_current(index) {
            this.currentIndex[set_value](index);
            history.replaceState("", "", index?.url_path);
            document.title = this.make_title(index);
        }
        make_title(index) {
            return index ?
                (this.i.make_title?.(index) ??
                    index.title.value + " - " + this.title.value)
                : this.title.value;
        }
        make_url_path(index) {
            return this.i.make_url_path?.(index) ?? "";
        }
    }
    navi_1.Navi = Navi;
    class Index {
        navi;
        com;
        type;
        name;
        title;
        parts;
        constructor(navi, com, i) {
            this.navi = navi;
            this.com = com;
            this.type = i.type ?? "";
            this.name = leaf.str(i.name);
            this.title = leaf.str(i.title ?? "");
            const parts = i.parts?.map(v => new Index(navi, this, v));
            this.parts = new Renn(parts);
        }
        get url_path() {
            return this.navi.make_url_path(this);
        }
        mk_sel_item() {
            return new SelectorItem(this);
        }
        make_page() {
            ;
        }
    }
    navi_1.Index = Index;
    class SelectorItem {
        index;
        selected;
        constructor(index, navi) {
            this.index = index;
            this.selected = (navi ?? index.navi).selector.make_item(index);
        }
        select() {
            this.index.navi.set_current(this.index);
        }
    }
    navi_1.SelectorItem = SelectorItem;
    function link(selector, title) {
        const click = (ev) => {
            selector.select();
            ev.preventDefault();
        };
        return ef.a({
            attrs: { href: selector.index.url_path },
            active_acts: { click }
        }, title ?? selector.index.name);
    }
    navi_1.link = link;
})(navi || (navi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLElBQUksRUFBRyxTQUFTLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBRTtBQVl0QyxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDN0IsQ0FBQztBQUVELFdBQWlCLE1BQUk7SUFxQnBCLE1BQWEsSUFBSTtRQU9RO1FBTFIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsWUFBWSxDQUFFO1FBQ2QsUUFBUSxDQUFFO1FBRTFCLFlBQXdCLENBQVE7WUFBUixNQUFDLEdBQUQsQ0FBQyxDQUFPO1lBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRyxJQUFJLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLEVBQUcsSUFBSSxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBRTtZQUMzRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBeUIsU0FBUyxDQUFFLENBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQXlCLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBRTtRQUNuRSxDQUFDO1FBRU0sV0FBVyxDQUFFLEtBQXlCO1lBRTVDLElBQUksQ0FBQyxZQUFZLENBQUcsU0FBUyxDQUFFLENBQUcsS0FB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