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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvYXBwL25hdmkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNuQyxPQUFPLEVBQUUsSUFBSSxFQUFHLFNBQVMsRUFBRyxJQUFJLEVBQUcsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkUsT0FBTyxFQUFlLEVBQUUsRUFBUyxNQUFNLGlCQUFpQixDQUFFO0FBMEIxRCxNQUFNLFVBQVUsSUFBSSxDQUFHLENBQVE7SUFFOUIsT0FBTyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUcsQ0FBQyxDQUFFLENBQUU7QUFDcEMsQ0FBQztBQUVELFdBQWlCLElBQUk7SUEwQnBCLE1BQWEsV0FBVztRQVlDO1FBVlIsS0FBSyxDQUFFO1FBQ1AsSUFBSSxDQUFVO1FBQ2QsSUFBSSxDQUFtQjtRQUN2QixhQUFhLENBQTZCO1FBQzFDLGlCQUFpQixDQUE2QjtRQUM5QyxRQUFRLENBQUU7UUFFVixpQkFBaUIsR0FBRyxJQUFJLENBQTZCLFNBQVMsQ0FBRSxDQUFFO1FBQ2xFLFVBQVUsR0FBRyxJQUFJLEdBQXVDLENBQUU7UUFFMUUsWUFBd0IsQ0FBUTtZQUFSLE1BQUMsR0FBRCxDQUFDLENBQU87WUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUUsT0FBTyxDQUFDLENBQUMsaUJBQWlCLElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRyxJQUFJLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBRyxJQUFJLEVBQUcsU0FBUyxFQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBRSxDQUFFO1lBQ3ZKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBRTtZQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBc0IsU0FBUyxDQUFFLENBQUU7WUFDNUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBc0IsU0FBUyxDQUFFLENBQUU7WUFDaEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUcsRUFBRSxnQkFBZ0IsRUFBRyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUcsU0FBUyxDQUFFLEVBQUUsQ0FBRSxDQUFFO1lBQ25HLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUF1QixJQUFJLENBQUMsYUFBYSxDQUFFLENBQUU7UUFDbEUsQ0FBQztRQUVNLEtBQUssQ0FBQyxJQUFJLENBQUcsZ0JBQXdCLElBQUksQ0FBQyxJQUFJO1lBRXBELE1BQU0sV0FBVyxHQUNqQjtnQkFDQyxJQUFJLEVBQUcsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLElBQUksRUFBRyxRQUFRLENBQUMsUUFBUTtnQkFDeEIsTUFBTSxFQUFHLElBQUksZUFBZSxDQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUU7Z0JBQ2hELFFBQVE7YUFDUixDQUFFO1lBRUgsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUU3QyxDQUFFLElBQUksQ0FBQyxDQUFFLEVBQUUsaUJBQWtCLEVBQUUsQ0FBRSxXQUFXLENBQUUsQ0FBRSxJQUFJLEVBQUUsQ0FDdEQ7bUJBQ0csSUFBSSxDQUFDLENBQUUsRUFBRSxZQUFhLEVBQUUsQ0FBRyxXQUFXLENBQUUsQ0FDM0M7WUFFRCxJQUFJLENBQUMsV0FBVyxDQUFHLEtBQUssSUFBSSxhQUFhLENBQUUsQ0FBRTtRQUM5QyxDQUFDO1FBRU0sV0FBVyxDQUFFLEtBQXlCO1lBRTVDLElBQUksQ0FBQyxhQUFhLENBQUcsU0FBUyxDQUFFLENBQUcsS0FBSyxDQUFFLENBQUU7WUFDNUMsSUFBSSxDQUFDLGlCQUFpQixDQUFHLFNBQVMsQ0FBRSxDQUFHLEtBQU0sRUFBRSxHQUFHLENBQUUsQ0FBRTtZQUV0RCxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUcsS0FBSyxDQUFDLElBQUksQ0FBRSxDQUFFO1lBRTNDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUcsS0FBTSxFQUFFLElBQUksQ0FBRSxDQUFFO1lBQ3hELFNBQVMsQ0FBQyxhQUFhLENBQUcsU0FBUyxDQUFFLENBQUcsS0FBSyxDQUFFLENBQUU7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxTQUFTLENBQUU7WUFFMUMsSUFBSSxDQUFDLGNBQWMsQ0FBRyxLQUFLLENBQUUsQ0FBRTtRQUNoQyxDQUFDO1FBRVMsY0FBYyxDQUFHLEtBQXlCO1lBRW5ELE9BQU8sQ0FBQyxZQUFZLENBQUcsRUFBRSxFQUFHLEVBQUUsRUFBRyxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUU7WUFDaEQsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFHLEtBQUssQ0FBRSxDQUFFO1FBQzdDLENBQUM7UUFFTSxVQUFVLENBQUUsS0FBZTtZQUVqQyxPQUFPLEtBQUssQ0FBQyxDQUFDO2dCQUNkLENBQ0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFlLEVBQUUsQ0FBRSxLQUFLLENBQUU7b0JBQ2pDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDNUM7Z0JBQ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFO1FBQ3JCLENBQUM7UUFFTSxhQUFhLENBQUcsS0FBYTtZQUVuQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBYSxFQUFFLENBQUcsS0FBSyxDQUFFLElBQUksRUFBRSxDQUFFO1FBQ2hELENBQUM7UUFFUyxjQUFjLENBQUcsR0FBeUI7WUFFbkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7WUFDL0MsSUFBSyxTQUFTO2dCQUFHLE9BQU8sU0FBUyxDQUFFO1lBRW5DLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVyxFQUFFLENBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBRSxDQUFFO1lBQ2hELE1BQU0sYUFBYSxHQUFHLElBQUksU0FBUyxDQUFHLEdBQUcsQ0FBRSxDQUFFO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFHLEdBQUcsRUFBRyxhQUFhLENBQUUsQ0FBRTtZQUc3QyxPQUFPLGFBQWEsQ0FBRTtRQUN2QixDQUFDO0tBQ0Q7SUExRlksZ0JBQVcsY0EwRnZCLENBQUE7SUFFRCxNQUFNLFNBQVM7UUFNRztRQUpELGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUF1QixTQUFTLENBQUUsQ0FBRTtRQUUxRSxZQUVpQixHQUErQjtZQUEvQixRQUFHLEdBQUgsR0FBRyxDQUE0QjtRQUdoRCxDQUFDO0tBQ0Q7SUFHRCxNQUFhLEtBQUs7UUFZQTtRQUNBO1FBWEQsY0FBYyxDQUFXO1FBQ3pCLElBQUksQ0FBcUI7UUFDekIsSUFBSSxDQUFFO1FBQ04sS0FBSyxDQUFFO1FBQ1AsS0FBSyxDQUFtQjtRQUU5QixXQUFXLEdBQUcsSUFBSSxHQUFzQixDQUFFO1FBRXBELFlBRWlCLEdBQWlCLEVBQ2pCLEdBQXVCLEVBQ3ZDLENBQWU7WUFGQyxRQUFHLEdBQUgsR0FBRyxDQUFjO1lBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQW9CO1lBSXZDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQU0sRUFBRSxHQUFHLENBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBRyxHQUFHLEVBQUcsSUFBSSxFQUFHLEVBQUUsQ0FBRSxDQUFFLENBQUM7WUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBQztZQUVoQyxNQUFNLEdBQUcsR0FDVDtnQkFDQyxjQUFjLEVBQUcsQ0FBRSxLQUFLLEVBQUcsRUFBRTtvQkFFNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBRSxDQUFFLENBQUU7Z0JBQ3ZGLENBQUM7Z0JBRUQsaUJBQWlCLEVBQUcsQ0FBRSxLQUFLLEVBQUcsRUFBRTtvQkFFL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUUsQ0FBRSxDQUFFO2dCQUMvRSxDQUFDO2FBQ0QsQ0FBRTtZQUNILElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFHLEdBQUcsQ0FBRSxDQUFFO1lBRTVCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUU7UUFDL0MsQ0FBQztRQUVELElBQVcsSUFBSTtZQUVkLE1BQU0sSUFBSSxHQUFjLENBQUUsSUFBSSxDQUFFLENBQUU7WUFDbEMsS0FBTSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFHLENBQUMsRUFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUc7Z0JBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFFLENBQUU7WUFDbEUsT0FBTyxJQUFJLENBQUU7UUFDZCxDQUFDO1FBRU0sSUFBSSxDQUFHLElBQWE7WUFFMUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBRyxJQUFJLENBQUUsQ0FBRTtRQUN2QyxDQUFDO1FBRUQsSUFBVyxJQUFJO1lBRWQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBRyxJQUFJLENBQUUsQ0FBRTtRQUN6QyxDQUFDO1FBRUQsSUFBVyxRQUFRO1lBRWxCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFHLElBQUksQ0FBRSxDQUFFO1FBQzlDLENBQUM7UUFFRCxJQUFXLFFBQVE7WUFFbEIsT0FBTyxDQUFFLEdBQUksSUFBSSxDQUFDLEdBQUksRUFBRSxRQUFRLElBQUksRUFBRSxFQUFHLGtCQUFrQixDQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUUsQ0FBQTtRQUNsRixDQUFDO1FBRU0sS0FBSyxDQUFDLGdCQUFnQixDQUFHLFNBQXFCO1lBRXBELE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRyxDQUFFO1lBRTNCLEdBQUcsQ0FBRyxPQUFPLEVBQUcsU0FBUyxDQUFFLElBQUksQ0FBRyxHQUFHLENBQUUsQ0FBRSxDQUFFO1lBRTNDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFHLFNBQVMsQ0FBRyxDQUFDLENBQUUsQ0FBRSxDQUFFO1lBRXZELE9BQU8sU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSyxFQUFFLGdCQUFnQixDQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFFLENBQUU7Z0JBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUU7UUFDVixDQUFDO1FBRU0sS0FBSyxDQUFDLFdBQVcsS0FBSyxDQUFDO0tBQzlCO0lBakZZLFVBQUssUUFpRmpCLENBQUE7SUFJRCxLQUFLO0lBRUwsU0FBZ0IsSUFBSSxDQUFHLEdBQXdCLEVBQUcsR0FBSSxPQUFvQjtRQUV6RSxNQUFNLEtBQUssR0FBRyxDQUFFLEdBQUcsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUUsQ0FBRTtRQUMvRCxNQUFNLEVBQUUsR0FBbUMsQ0FBRSxHQUFHLFlBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQTtRQUVuRixNQUFNLEtBQUssR0FBRyxDQUFFLEVBQWUsRUFBRyxFQUFFO1lBRW5DLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFHLENBQUU7WUFDMUIsRUFBRSxDQUFDLGNBQWMsRUFBRyxDQUFFO1FBQ3ZCLENBQUMsQ0FBQTtRQUVELE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FFVjtZQUNDLEdBQUksRUFBRTtZQUNOLEtBQUssRUFBRyxFQUFFLElBQUksRUFBRyxLQUFLLENBQUMsSUFBSSxFQUFHLEdBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtZQUM1QyxXQUFXLEVBQUcsRUFBRSxLQUFLLEVBQUcsR0FBSSxFQUFFLENBQUMsV0FBVyxFQUFFO1NBQzVDLEVBQ0QsR0FBSSxDQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBRSxLQUFLLENBQUMsS0FBSyxDQUFFLENBQUUsQ0FDbEQsQ0FBRTtJQUNKLENBQUM7SUFwQmUsU0FBSSxPQW9CbkIsQ0FBQTtBQUNGLENBQUMsRUEvT2dCLElBQUksS0FBSixJQUFJLFFBK09wQiJ9