import { Srcr } from "../model/leaf.js";
import { defs } from "./defs.js";
import * as nodet from "./nodet.js";
function create_element(ns, type, first, ...remain) {
    if (first instanceof Srcr ||
        first instanceof nodet.Nodet ||
        first instanceof defs.Place ||
        first instanceof Node ||
        typeof first == "string" ||
        typeof first == "number" ||
        typeof first == "boolean") {
        const parts = (remain !== undefined ? [first, ...remain]
            : [first]);
        return new nodet.Element({ ns, type, parts });
    }
    return new nodet.Element({ ns, type, ...first, parts: remain });
}
class Handler {
    ns;
    constructor(ns) {
        this.ns = ns;
    }
    get(target, type) {
        return this.makefn(type);
    }
    fns = new Map;
    makefn(type) {
        if (this.fns.has(type))
            return this.fns.get(type);
        const fn = (first, ...remain) => create_element(this.ns, type, first, ...remain);
        this.fns.set(type, fn);
        return fn;
    }
}
export const ef = new Proxy({}, new Handler(""));
export const sf = new Proxy({}, new Handler("http://www.w3.org/2000/svg"));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9lZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDeEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEtBQUssS0FBSyxNQUFNLFlBQVksQ0FBQztBQUVwQyxTQUFTLGNBQWMsQ0FFdEIsRUFBVyxFQUNYLElBQWEsRUFDYixLQUFxQyxFQUNyQyxHQUFJLE1BQW1CO0lBR3ZCLElBRUMsS0FBSyxZQUFZLElBQUk7UUFDckIsS0FBSyxZQUFZLEtBQUssQ0FBQyxLQUFLO1FBQzVCLEtBQUssWUFBWSxJQUFJLENBQUMsS0FBSztRQUMzQixLQUFLLFlBQVksSUFBSTtRQUNyQixPQUFPLEtBQUssSUFBSSxRQUFRO1FBQ3hCLE9BQU8sS0FBSyxJQUFJLFFBQVE7UUFDeEIsT0FBTyxLQUFLLElBQUksU0FBUyxFQUUxQixDQUFDO1FBQ0EsTUFBTSxLQUFLLEdBQ1gsQ0FDQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFFLEtBQUssRUFBRSxHQUFJLE1BQU0sQ0FBRTtZQUM1QyxDQUFDLENBQUMsQ0FBRSxLQUFLLENBQUUsQ0FDWCxDQUFDO1FBRUYsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFJLEtBQUssRUFBRSxLQUFLLEVBQUcsTUFBTSxFQUFFLENBQUUsQ0FBQztBQUNyRSxDQUFDO0FBU0QsTUFBTSxPQUFPO0lBRVM7SUFBckIsWUFBcUIsRUFBVztRQUFYLE9BQUUsR0FBRixFQUFFLENBQVM7SUFDL0IsQ0FBQztJQUVLLEdBQUcsQ0FBRSxNQUFVLEVBQUUsSUFBYTtRQUVwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLEdBQUcsR0FBRyxJQUFJLEdBQXNDLENBQUU7SUFFbEQsTUFBTSxDQUFFLElBQWE7UUFFNUIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUU7WUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXhELE1BQU0sRUFBRSxHQUE0QixDQUFFLEtBQUssRUFBRSxHQUFJLE1BQU0sRUFBRyxFQUFFLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFJLE1BQU0sQ0FBRSxDQUFDO1FBQ2hILElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUksRUFBRSxFQUFFLENBQUUsQ0FBQztRQUN6QixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7Q0FDRDtBQVFELE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FFMUIsRUFBa0MsRUFDbEMsSUFBSSxPQUFPLENBQUUsRUFBRSxDQUFFLENBQ2pCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBRTFCLEVBQWlDLEVBQ2pDLElBQUksT0FBTyxDQUFFLDRCQUE0QixDQUFFLENBQzNDLENBQUMifQ==