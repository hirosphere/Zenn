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
            this.root = (typeof i.create_root_index == "function" && i.create_root_index(this)) || new navi.Index(this, null, i.create_root_index);
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
        path = new Renn;
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
            this.update_path();
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
        /* */
        update_path() {
            const path = [this];
            for (let i = this.com; i; i = i.com)
                i && path.unshift(i);
            // log ( path.map ( i => i.title.value ) .join ( "/" ) ) ;
            this.path.new(path);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvYXBwL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFlLEVBQUUsRUFBUyxNQUFNLGlCQUFpQixDQUFFO0FBMEIxRCxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDcEMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUF5QnBCLE1BQWEsV0FBVztRQVVDO1FBUlIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsYUFBYSxDQUFFO1FBQ2YsUUFBUSxDQUFFO1FBRVYsaUJBQWlCLEdBQUcsSUFBSSxDQUE2QixTQUFTLENBQUUsQ0FBRTtRQUNsRSxVQUFVLEdBQUcsSUFBSSxHQUFtQyxDQUFFO1FBRXRFLFlBQXdCLENBQVE7WUFBUixNQUFDLEdBQUQsQ0FBQyxDQUFPO1lBRS9CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUU7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFFLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUcsSUFBSSxDQUFFLENBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUcsSUFBSSxFQUFHLElBQUksRUFBRyxDQUFDLENBQUMsaUJBQWlCLENBQUUsQ0FBRTtZQUNsSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBa0IsU0FBUyxDQUFFLENBQUU7WUFDeEQsSUFBSSxDQUFD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