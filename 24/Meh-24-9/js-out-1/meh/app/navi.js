import { log } from "../common.js";
import { leaf, set_value, Renn, ksel } from "../model/index.js";
import { ef } from "../dom/index.js";
export function navi(i) {
    return new navi.Application(i);
}
(function (navi) {
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
            this.root = (typeof i.root == "function" && i.root(this)) || new navi.Index(this, null, i.root);
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
    navi.Application = Application;
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
    navi.Index = Index;
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
    navi.link = link;
})(navi || (navi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvYXBwL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFlLEVBQUUsRUFBUyxNQUFNLGlCQUFpQixDQUFFO0FBeUIxRCxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDcEMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUFvQnBCLE1BQWEsV0FBVztRQVVDO1FBUlIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsYUFBYSxDQUFFO1FBQ2YsUUFBUSxDQUFFO1FBRVYsaUJBQWlCLEdBQUcsSUFBSSxDQUE2QixTQUFTLENBQUUsQ0FBRTtRQUNsRSxVQUFVLEdBQUcsSUFBSSxHQUFtQyxDQUFFO1FBRXRFLFlBQXdCLENBQVE7WUFBUixNQUFDLEdBQUQsQ0FBQyxDQUFPO1lBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRyxJQUFJLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLEVBQUcsSUFBSSxFQUFHLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBRTtZQUMzRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBa0IsU0FBUyxDQUFFLENBQUU7WUFDeEQsSUFBSSxDQUFDLGFBQWEs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