import { leaf, set_value, Renn, ksel } from "./index.js";
import { ef } from "../dom/index.js";
export function spa(i) {
    return new spa.Application(i);
}
(function (spa) {
    class Application {
        i;
        title;
        root;
        current_index;
        selector;
        current_container = leaf(undefined);
        containers = new Map;
        constructor(i) {
            this.i = i;
            this.title = leaf.str(i.title);
            this.root = (typeof i.root == "function" && i.root(this)) || new spa.Index(this, null, i.root);
            this.current_index = leaf(undefined);
            this.current_index.add_ref({ src_value_change: new_index => this.set_current(new_index) });
            this.selector = ksel(this.current_index);
        }
        set_current(index) {
            this.current_index[set_value](index);
            history.replaceState("", "", index?.link);
            document.title = this.make_title(index);
            const container = this.make_container(index?.type);
            container.current_index[set_value](index);
            this.current_container.value = container;
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
        make_container(key) {
            const container = this.containers.get(key);
            if (container)
                return container;
            const def = this.i.containers?.[key ?? ""];
            const new_container = new Container(def);
            this.containers.set(key, new_container);
            return new_container;
        }
    }
    spa.Application = Application;
    class Container {
        def;
        current_index = leaf.r(undefined);
        constructor(def) {
            this.def = def;
        }
    }
    class Index {
        app;
        com;
        container_type;
        type;
        name;
        title;
        parts;
        constructor(app, com, i) {
            this.app = app;
            this.com = com;
            this.type = i.type ?? "";
            this.name = leaf.str(i.name);
            this.title = leaf.str(i.title ?? "");
            const parts = i.parts?.map(v => new Index(app, this, v));
            this.parts = new Renn(parts);
            this.container_type = i.container_type ?? "";
        }
        get link() {
            return this.app.make_url_path(this);
        }
        get selector_item() {
            return this.app.selector.make_item(this);
        }
    }
    spa.Index = Index;
    function link(index, ...content) {
        const click = (ev) => {
            index.selector_item.select();
            ev.preventDefault();
        };
        return ef.a({
            attrs: { href: index.link },
            active_acts: { click }
        }, ...(content.length ? content : [index.title]));
    }
    spa.link = link;
})(spa || (spa = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL21laC9tb2RlbC9zcGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLElBQUksRUFBRyxTQUFTLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RCxPQUFPLEVBQWUsRUFBRSxFQUFTLE1BQU0saUJBQWlCLENBQUU7QUFhMUQsTUFBTSxVQUFVLEdBQUcsQ0FBRyxDQUFPO0lBRTVCLE9BQU8sSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFHLENBQUMsQ0FBRSxDQUFFO0FBQ25DLENBQUM7QUFFRCxXQUFpQixHQUFHO0lBeUJuQixNQUFhLFdBQVc7UUFVQztRQVJSLEtBQUssQ0FBRTtRQUNQLElBQUksQ0FBVTtRQUNkLGFBQWEsQ0FBRTtRQUNmLFFBQVEsQ0FBRTtRQUVWLGlCQUFpQixHQUFHLElBQUksQ0FBNkIsU0FBUyxDQUFFLENBQUU7UUFDbEUsVUFBVSxHQUFHLElBQUksR0FBbUMsQ0FBRTtRQUV0RSxZQUF3QixDQUFPO1lBQVAsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUU7WUFDMUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQWtCLFNBQVMsQ0FBRSxDQUFFO1lBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFHLEVBQUUsZ0JBQWdCLEVBQUcsU0FBUyxDQUFDLEVB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