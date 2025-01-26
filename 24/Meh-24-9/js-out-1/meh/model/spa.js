import { leaf, set_value, Renn, ksel } from "./index.js";
import { ef } from "../dom/index.js";
export function app(i) {
    return new app.Application(i);
}
(function (app_1) {
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
            this.root = (typeof i.root == "function" && i.root(this)) || new app.Index(this, null, i.root);
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
    app_1.Application = Application;
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
    app_1.Index = Index;
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
    app_1.link = link;
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL21laC9tb2RlbC9zcGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLElBQUksRUFBRyxTQUFTLEVBQUcsSUFBSSxFQUFHLElBQUksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM1RCxPQUFPLEVBQWUsRUFBRSxFQUFTLE1BQU0saUJBQWlCLENBQUU7QUFhMUQsTUFBTSxVQUFVLEdBQUcsQ0FBRyxDQUFPO0lBRTVCLE9BQU8sSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFHLENBQUMsQ0FBRSxDQUFFO0FBQ25DLENBQUM7QUFFRCxXQUFpQixLQUFHO0lBeUJuQixNQUFhLFdBQVc7UUFVQztRQVJSLEtBQUssQ0FBRTtRQUNQLElBQUksQ0FBVTtRQUNkLGFBQWEsQ0FBRTtRQUNmLFFBQVEsQ0FBRTtRQUVWLGlCQUFpQixHQUFHLElBQUksQ0FBNkIsU0FBUyxDQUFFLENBQUU7UUFDbEUsVUFBVSxHQUFHLElBQUksR0FBbUMsQ0FBRTtRQUV0RSxZQUF3QixDQUFPO1lBQVAsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUU7WUFDMUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQWtCLFNBQVMsQ0FBRSxDQUFFO1lBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFHLEVBQUUsZ0JBQWdCLEVBQUcsU0FBUyxDQUFDLEVB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