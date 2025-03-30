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
        path;
        current_index;
        selector;
        current_container = leaf(undefined);
        containers = new Map;
        constructor(i) {
            this.i = i;
            this.title = leaf.str(i.title);
            this.root = (typeof i.create_root_index == "function" && i.create_root_index(this)) || new navi.Index(this, undefined, i.create_root_index);
            this.path = new Renn([this.root]);
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
            const index = await this.root.fetch_path_index((this.i?.url_to_path_array?.(search_args)) ?? [])
                ?? this.i?.url_to_index?.(search_args);
            this.set_current(index ?? default_index);
        }
        set_current(index) {
            this.current_index[set_value](index);
            index && this.path.replace(index.path);
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
                (this.i.index_to_title?.(index) ??
                    index.title.value + " - " + this.title.value)
                : this.title.value;
        }
        make_url_path(index) {
            return this.i.index_to_url?.(index) ?? "";
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
        get path() {
            const path = [this];
            for (let i = this.com; i; i = i.com)
                i && path.unshift(i);
            return path;
        }
        part(name) {
            return this.p_part_list.get(name);
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
            log("Fetch", part_path.join("/"));
            const part = this.p_part_list.get(part_path[0]);
            return part_path.length > 1 ?
                part?.fetch_path_index(part_path.slice(1))
                : part;
        }
        async fetch_parts() { }
    }
    navi.Index = Index;
    /* */
    function link(arg, ...content) {
        const index = (arg instanceof navi.Index ? arg : arg.index);
        const ec = (arg instanceof navi.Index ? {} : arg);
        const click = (ev) => {
            index.sel_item.select();
            ev.preventDefault();
        };
        return ef.a({
            ...ec,
            attrs: { href: index.link, ...ec.attrs },
            active_acts: { click, ...ec.active_acts }
        }, ...(content.length ? content : [index.title]));
    }
    navi.link = link;
})(navi || (navi = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvYXBwL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFlLEVBQUUsRUFBUyxNQUFNLGlCQUFpQixDQUFFO0FBMEIxRCxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDcEMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUF5QnBCLE1BQWEsV0FBVztRQVdDO1FBVFIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsSUFBSSxDQUFtQjtRQUN2QixhQUFhLENBQUU7UUFDZixRQUFRLENBQUU7UUFFVixpQkFBaUIsR0FBRyxJQUFJLENBQTZCLFNBQVMsQ0FBRSxDQUFFO1FBQ2xFLFVBQVUsR0FBRyxJQUFJLEdBQW1DLENBQUU7UUFFdEUsWUFBd0IsQ0FBUTtZQUFSLE1BQUMsR0FBRCxDQUFDLENBQU87WUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUUsT0FBTyxDQUFDLENBQUMsaUJBQWlCLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRyxJQUFJLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLEVBQUcsU0FBUyxFQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRSxDQUFFO1lBQ3ZKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUcsQ0FBRSxJQUFJ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