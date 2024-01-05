import { defs } from "./defs.js";
import { Nodet } from "./nodet.js";
const log = console.log;
export const create = (container, def, ceqsel, rel) => {
    const ce = typeof ceqsel == "string" ? document.querySelector(ceqsel) : ceqsel;
    return new Nodet(container, def, ce, rel);
};
/** factory proxy handler */
const createElement = (ns, type, first_part, remain_parts) => {
    return new defs.Element(ns, type, first_part, remain_parts);
};
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
        log(type);
        const fn = (first, ...remain) => createElement(this.ns, type, first, remain);
        this.fns.set(type, fn);
        return fn;
    }
}
const createElementFactory = (ns) => {
    return new Proxy({}, new Handler(ns));
};
export const ef = createElementFactory("");
export const sf = createElementFactory("http://www.w3.org/2000/svg");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvbWVoL2RvbS9lZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV4QixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQ25CLENBQ0MsU0FBcUIsRUFDckIsR0FBZSxFQUNmLE1BQXlCLEVBQ3pCLEdBQVksRUFFSCxFQUFFO0lBRVgsTUFBTSxFQUFFLEdBQW9CLE9BQU8sTUFBTSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBRSxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRWxHLE9BQU8sSUFBSSxLQUFLLENBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFFLENBQUM7QUFDN0MsQ0FBQyxDQUFBO0FBMkJELDRCQUE0QjtBQUc1QixNQUFNLGFBQWEsR0FDbkIsQ0FDQyxFQUF5QixFQUN6QixJQUF5QixFQUN6QixVQUF5QyxFQUN6QyxZQUE4QixFQUVkLEVBQUU7SUFFbEIsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFFLENBQUM7QUFDL0QsQ0FBQyxDQUFDO0FBSUYsTUFBTSxPQUFPO0lBRVM7SUFBckIsWUFBcUIsRUFBVztRQUFYLE9BQUUsR0FBRixFQUFFLENBQVM7SUFDL0IsQ0FBQztJQUVLLEdBQUcsQ0FBRSxNQUFVLEVBQUUsSUFBYTtRQUVwQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELEdBQUcsR0FBRyxJQUFJLEdBQXdDLENBQUU7SUFFcEQsTUFBTSxDQUFFLElBQWE7UUFFcEIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUU7WUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXhELEdBQUcsQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUVaLE1BQU0sRUFBRSxHQUE4QixDQUFFLEtBQUssRUFBRSxHQUFJLE1BQU0sRUFBRyxFQUFFLENBQUMsYUFBYSxDQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUUsQ0FBQztRQUM3RyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxJQUFJLEVBQUUsRUFBRSxDQUFFLENBQUM7UUFDekIsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0Q7QUFFRCxNQUFNLG9CQUFvQixHQUFHLENBQXVCLEVBQVcsRUFBRyxFQUFFO0lBRW5FLE9BQU8sSUFBSSxLQUFLLENBQUcsRUFBTyxFQUFFLElBQUksT0FBTyxDQUFFLEVBQUUsQ0FBRSxDQUFFLENBQUM7QUFDakQsQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLG9CQUFvQixDQUEwQixFQUFFLENBQUUsQ0FBQztBQUNyRSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsb0JBQW9CLENBQXlCLDRCQUE0QixDQUFFLENBQUMifQ==