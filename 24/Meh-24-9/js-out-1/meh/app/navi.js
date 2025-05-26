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
        current_com_index;
        selector;
        current_container = leaf(undefined);
        containers = new Map;
        constructor(i) {
            this.i = i;
            this.title = leaf.str(i.title);
            this.root = (typeof i.create_root_index == "function" && i.create_root_index(this)) || new navi.Index(this, undefined, i.create_root_index);
            this.path = new Renn([this.root]);
            this.current_index = leaf(undefined);
            this.current_com_index = leaf(undefined);
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
            this.current_com_index[set_value](index?.com);
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
        i;
        container_type;
        type;
        name;
        title;
        parts;
        p_part_list = new Map;
        constructor(app, com, i) {
            this.app = app;
            this.com = com;
            this.i = i;
            this.type = i.type ?? "";
            this.name = leaf.str(i.name);
            this.title = leaf.str(i.title ?? i.name);
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
        /* */
        get page() {
            return this.i.page?.(this);
        }
        /* */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvYXBwL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFlLEVBQUUsRUFBUyxNQUFNLGlCQUFpQixDQUFFO0FBMEIxRCxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDcEMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUE2QnBCLE1BQWEsV0FBVztRQVlDO1FBVlIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsSUFBSSxDQUFtQjtRQUN2QixhQUFhLENBQTZCO1FBQzFDLGlCQUFpQixDQUE2QjtRQUM5QyxRQUFRLENBQUU7UUFFVixpQkFBaUIsR0FBRyxJQUFJLENBQTZCLFNBQVMsQ0FBRSxDQUFFO1FBQ2xFLFVBQVUsR0FBRyxJQUFJLEdBQXVDLENBQUU7UUFFMUUsWUFBd0IsQ0FBUTtZQUFSLE1BQUMsR0FBRCxDQUFDLENBQU87WUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUUsT0FBTyxDQUFDLENBQUMsaUJBQWlCLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRyxJQUFJLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLEVBQUcsU0FBUyxFQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRSxDQUFFO1lBQ3ZKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFB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