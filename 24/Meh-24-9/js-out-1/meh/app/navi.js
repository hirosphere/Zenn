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