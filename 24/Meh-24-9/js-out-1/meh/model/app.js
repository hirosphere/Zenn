import { log } from "../common.js";
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
        async init(default_index = this.root) {
            const search_args = {
                root: this.root,
                path: location.pathname,
                params: new URLSearchParams(location.search),
                location,
            };
            const index = await this.root.fetch_path_index((this.i?.make_path_from_url?.(search_args)) ?? [])
                ?? this.i?.make_index_from_url?.(search_args);
            this.set_current(index ?? default_index);
        }
        set_current(index) {
            this.current_index[set_value](index);
            const container = this.make_container(index?.type);
            container.current_index[set_value](index);
            this.current_container.value = container;
            this.update_browser(index);
        }
        update_browser(index) {
            history.replaceState("", "", index?.link);
            document.title = this.make_title(index);
        }
        make_title(index) {
            return index ?
                (this.i.make_title?.(index) ??
                    index.title.value + " - " + this.title.value)
                : this.title.value;
        }
        make_url_path(index) {
            return this.i.make_url_from_index?.(index) ?? "";
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
        p_part_list = new Map;
        constructor(app, com, i) {
            this.app = app;
            this.com = com;
            this.type = i.type ?? "";
            this.name = leaf.str(i.name);
            this.title = leaf.str(i.title ?? "");
            const parts = i.parts?.map(pi => new Index(app, this, pi));
            this.parts = new Renn(parts);
            const ref = {
                src_add_orders: (range) => {
                    range.items.forEach(o => this.p_part_list.set(o.target.name.value, o.target));
                    this.p_part_list.size && log(this.p_part_list.keys());
                },
                src_remove_orders: (range) => {
                    range.items.forEach(o => this.p_part_list.delete(o.target.name.value));
                },
            };
            this.parts.add_ref(ref);
            this.container_type = i.container_type ?? "";
        }
        get link() {
            return this.app.make_url_path(this);
        }
        get sel_item() {
            return this.app.selector.make_item(this);
        }
        get url_path() {
            return [...this.com?.url_path ?? [], encodeURIComponent(this.name.value)];
        }
        async fetch_path_index(part_path) {
            await this.fetch_parts();
            log("FETCH PATH INDEX", part_path.join("/"));
            const part = this.p_part_list.get(part_path[0]);
            return part_path.length > 1 ?
                part?.fetch_path_index(part_path.slice(1))
                : part;
        }
        async fetch_parts() { }
    }
    app_1.Index = Index;
    function link(index, ...content) {
        const click = (ev) => {
            index.sel_item.select();
            ev.preventDefault();
        };
        return ef.a({
            attrs: { href: index.link },
            active_acts: { click }
        }, ...(content.length ? content : [index.title]));
    }
    app_1.link = link;
})(app || (app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL21laC9tb2RlbC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVELE9BQU8sRUFBZSxFQUFFLEVBQVMsTUFBTSxpQkFBaUIsQ0FBRTtBQXlCMUQsTUFBTSxVQUFVLEdBQUcsQ0FBRyxDQUFPO0lBRTVCLE9BQU8sSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFHLENBQUMsQ0FBRSxDQUFFO0FBQ25DLENBQUM7QUFFRCxXQUFpQixLQUFHO0lBb0JuQixNQUFhLFdBQVc7UUFVQztRQVJSLEtBQUssQ0FBRTtRQUNQLElBQUksQ0FBVTtRQUNkLGFBQWEsQ0FBRTtRQUNmLFFBQVEsQ0FBRTtRQUVWLGlCQUFpQixHQUFHLElBQUksQ0FBNkIsU0FBUyxDQUFFLENBQUU7UUFDbEUsVUFBVSxHQUFHLElBQUksR0FBbUMsQ0FBRTtRQUV0RSxZQUF3QixDQUFPO1lBQVAsTUFBQyxHQUFELENBQUMsQ0FBTTtZQUU5QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBRSxDQUFFO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFFLENBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUU7WUFDMUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQWtCLFNBQVMsQ0FBRSxDQUFFO1lBQ3hELElBQUksQ0FBQyxhQUFhLENB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