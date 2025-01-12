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
            this.root = new navi.Index(this, i.root);
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
        name;
        title;
        parts;
        constructor(navi, v) {
            this.navi = navi;
            this.name = leaf.str(v.name);
            this.title = leaf.str(v.title ?? "");
            const parts = v.parts?.map(v => new Index(navi, v));
            this.parts = new Renn(parts);
        }
        get url_path() {
            return this.navi.make_url_path(this);
        }
        make_selector() {
            return new Selector(this);
        }
    }
    navi_1.Index = Index;
    class Selector {
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
    navi_1.Selector = Selector;
    function link(selector) {
        const click = (ev) => {
            selector.select();
            ev.preventDefault();
        };
        return ef.a({
            attrs: { href: selector.index.url_path },
            active_acts: { click }
        }, selector.index.name);
    }
    navi_1.link = link;
})(navi || (navi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLElBQUksRUFBRyxTQUFTLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxpQkFBaUIsQ0FBRTtBQVl0QyxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDN0IsQ0FBQztBQUVELFdBQWlCLE1BQUk7SUFrQnBCLE1BQWEsSUFBSTtRQU9RO1FBTFIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsWUFBWSxDQUFFO1FBQ2QsUUFBUSxDQUFFO1FBRTFCLFlBQXdCLENBQVE7WUFBUixNQUFDLEdBQUQsQ0FBQyxDQUFPO1lBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUcsSUFBSSxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBRTtZQUM5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBeUIsU0FBUyxDQUFFLENBQUU7WUFDOUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQXlCLElBQUksQ0FBQyxZQUFZLENBQUUsQ0FBRTtRQUNuRSxDQUFDO1FBRU0sV0FBVyxDQUFFLEtBQXlCO1lBRTVDLElBQUksQ0FBQyxZQUFZLENBQUcsU0FBUyxDQUFFLENBQUcsS0FBSyxDQUFFLENBQUM7WUFDMUMsT0FBTyxDQUFDLFlBQVksQ0FBRyxFQUFFLEVBQUcsRUFBRSxFQUFHLEtBQUssRUFBRSxRQUFRLENBQUUsQ0FBRTtZQUNwRCxR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