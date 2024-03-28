import { dom, ef, each, root, log } from "../meh/index.js";
import * as models from "./models.js";
import { map as mapsrc } from "./danchi-map.js";
const vals = Object.values;
const App = async () => {
    const params = new URLSearchParams(location.search);
    const danchi = new models.Danchi(mapsrc);
    const roompath = params.get("room") ?? "";
    const room = danchi.rooms[roompath];
    log("room", roompath, room);
    if (room) {
        try {
            const module = await import(room.mod_path);
            const Page = module.default;
            log("dymport", Page);
            if (Page)
                return Page(room.index);
        }
        catch (err) {
            log(err);
        }
    }
    return ef.main(ef.h1("課題団地"), Map.Danchi(danchi), SearchMonitor(params));
};
var Map;
(function (Map) {
    Map.Danchi = (model) => {
        return ef.section(ef.h2("Map"), ef.section(each(vals(model.parts), block => Map.Block(block))));
    };
    Map.Block = (model) => {
        return ef.section(ef.h3(model.index, "街区"), ef.section(each(vals(model.parts), part => Building(part))));
    };
    const Building = (model) => {
        return ef.section(ef.h4(model.index, "棟"));
    };
})(Map || (Map = {}));
const SearchMonitor = (ps) => {
    return ef.article({}, ef.h2("URL Search"), ef.table(each(Array.from(ps.entries()), ([name, value]) => ef.tr(ef.td(name), ef.td(value)))), ef.section({ props: {}, attrs: {}, style: { display: "flex", gap: "1ex", } }), ef.section(ef.textarea({ props: { value: "Danchi" } })));
};
const Link = (room) => {
    return ef.a({ attrs: { href: room?.link ?? "" }, style: {} }, room?.index ?? "---");
};
dom.create(root, await App(), "body");
export const dummy = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzLXNyYy9rYWRhaS1kYW5jaGktMS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsSUFBSSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBRTNCLE1BQU0sR0FBRyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBRXRCLE1BQU0sTUFBTSxHQUFHLElBQUksZUFBZSxDQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQztJQUV0RCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUUsTUFBTSxDQUFFLENBQUM7SUFFM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUUsSUFBSSxFQUFFLENBQUM7SUFDNUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBRSxRQUFRLENBQUUsQ0FBQztJQUV0QyxHQUFHLENBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUUsQ0FBQztJQUU5QixJQUFJLElBQUksRUFDUjtRQUNDLElBQ0E7WUFDQyxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7WUFDN0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUU1QixHQUFHLENBQUUsU0FBUyxFQUFFLElBQUksQ0FBRSxDQUFDO1lBRXZCLElBQUksSUFBSTtnQkFBRyxPQUFPLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUM7U0FDckM7UUFDRCxPQUFPLEdBQUcsRUFBRztZQUFFLEdBQUcsQ0FBRSxHQUFHLENBQUMsQ0FBQztTQUFFO0tBRTNCO0lBRUQsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUViLEVBQUUsQ0FBQyxFQUFFLENBQUUsTUFBTSxDQUFFLEVBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBRSxNQUFNLENBQUUsRUFDcEIsYUFBYSxDQUFFLE1BQU0sQ0FBRSxDQUN2QixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBVSxHQUFHLENBcUNaO0FBckNELFdBQVUsR0FBRztJQUVDLFVBQU0sR0FBRyxDQUFFLEtBQXFCLEVBQUcsRUFBRTtRQUVqRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsQ0FBQyxFQUFFLENBQUUsS0FBSyxDQUFFLEVBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FFVCxJQUFJLENBQUUsSUFBSSxDQUFFLEtBQUssQ0FBQyxLQUFLLENBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUEsS0FBSyxDQUFFLEtBQUssQ0FBRSxDQUFFLENBQ3BELENBQ0QsQ0FBQztJQUNILENBQUMsQ0FBQztJQUVXLFNBQUssR0FBRyxDQUFFLEtBQW9CLEVBQUcsRUFBRTtRQUUvQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBRWhCLEVBQUUsQ0FBQyxFQUFFLENBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUUsRUFDMUIsRUFBRSxDQUFDLE9BQU8sQ0FFVCxJQUFJLENBRUgsSUFBSSxDQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUUsSUFBSSxDQUFFLENBQ3hCLENBQ0QsQ0FDRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBRSxLQUF1QixFQUFHLEVBQUU7UUFFOUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLENBQUMsRUFBRSxDQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFFLENBQ3pCLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSCxDQUFDLEVBckNTLEdBQUcsS0FBSCxHQUFHLFFBcUNaO0FBR0QsTUFBTSxhQUFhLEdBQUcsQ0FBRSxFQUFvQixFQUFHLEVBQUU7SUFFaEQsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUVoQixFQUFFLEVBRUYsRUFBRSxDQUFDLEVBQUUsQ0FBRSxZQUFZLENBQUUsRUFFckIsRUFBRSxDQUFDLEtBQUssQ0FFUCxJQUFJLENBRUgsS0FBSyxDQUFDLElBQUksQ0FBRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUUsRUFFMUIsQ0FBRSxDQUFFLElBQUksRUFBRSxLQUFLLENBQUUsRUFBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FFM0IsRUFBRSxDQUFDLEVBQUUsQ0FBRSxJQUFJLENBQUUsRUFDYixFQUFFLENBQUMsRUFBRSxDQUFFLEtBQUssQ0FBRSxDQUNkLENBQ0QsQ0FDRCxFQUdELEVBQUUsQ0FBQyxPQUFPLENBRVQsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFJLEVBQUUsQ0FHbEUsRUFFRCxFQUFFLENBQUMsT0FBTyxDQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBRSxDQUFFLENBQzNELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxDQUFFLElBQW9CLEVBQUcsRUFBRTtJQUV2QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBRVYsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssSUFBSSxLQUFLLENBQ3RFLENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixHQUFHLENBQUMsTUFBTSxDQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0FBRXhDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMifQ==