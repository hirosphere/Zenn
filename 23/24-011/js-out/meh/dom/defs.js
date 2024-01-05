import { LeafrRefFactory } from "../model/index.js";
const log = console.log;
export var defs;
(function (defs) {
    /**
     * type Node
     * class Element < E >
     * type EChar < E >
     * type Class
     * type Attrs < E >
     * type Props < E >
     * type Acts < E >
     * type Part
     * class Each
     * type Text
     */
    /** class Each */
    class Each {
        constructor(create) { }
    }
    defs.Each = Each;
    defs.isechar = (part) => !((part instanceof Element) ||
        (part instanceof Each) ||
        (part instanceof LeafrRefFactory));
    /** class Element */
    class Element {
        ns;
        type;
        constructor(ns, type, first, remain) {
            this.ns = ns;
            this.type = type;
            if (first === undefined)
                return;
            if (first instanceof Object
                &&
                    !((first instanceof Element) ||
                        (first instanceof Each) ||
                        (first instanceof LeafrRefFactory))) {
                this.echar = first;
                this.parts = remain;
            }
            else {
                first && remain && log("defs.Element", [first, ...remain]);
                this.parts = first && (remain && [first, ...remain] || [first]) || undefined;
            }
        }
        echar;
        parts;
        terminate() {
            this.parts = undefined;
        }
    }
    defs.Element = Element;
})(defs || (defs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3BELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFJeEIsTUFBTSxLQUFXLElBQUksQ0FpSHBCO0FBakhELFdBQWlCLElBQUk7SUFFcEI7Ozs7Ozs7Ozs7O09BV0c7SUFNSCxpQkFBaUI7SUFFakIsTUFBYSxJQUFJO1FBRWhCLFlBQWEsTUFBeUIsSUFDckMsQ0FBQztLQUNGO0lBSlksU0FBSSxPQUloQixDQUFBO0lBTVksWUFBTyxHQUFHLENBQUUsSUFBbUIsRUFBRyxFQUFFLENBQUMsQ0FDbEQsQ0FDQyxDQUFFLElBQUksWUFBWSxPQUFPLENBQUU7UUFDM0IsQ0FBRSxJQUFJLFlBQVksSUFBSSxDQUFFO1FBQ3hCLENBQUUsSUFBSSxZQUFZLGVBQWUsQ0FBRSxDQUNuQyxDQUFDO0lBNkJGLG9CQUFvQjtJQUVwQixNQUFhLE9BQU87UUFJWDtRQUNBO1FBSFIsWUFFUSxFQUFXLEVBQ1gsSUFBYSxFQUNwQixLQUE0QixFQUM1QixNQUFrQjtZQUhYLE9BQUUsR0FBRixFQUFFLENBQVM7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFTO1lBS3BCLElBQUksS0FBSyxLQUFLLFNBQVM7Z0JBQUksT0FBTztZQUVsQyxJQUVFLEtBQUssWUFBWSxNQUFNOztvQkFFdkIsQ0FDQSxDQUNDLENBQUUsS0FBSyxZQUFZLE9BQU8sQ0FBRTt3QkFDNUIsQ0FBRSxLQUFLLFlBQVksSUFBSSxDQUFFO3dCQUN6QixDQUFFLEtBQUssWUFBWSxlQUFlLENBQUUsQ0FDcEMsRUFFSDtnQkFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7YUFDcEI7aUJBRUQ7Z0JBQ0MsS0FBSyxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUUsY0FBYyxFQUFFLENBQUUsS0FBSyxFQUFFLEdBQUksTUFBTSxDQUFFLENBQUUsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBRSxNQUFNLElBQUksQ0FBRSxLQUFLLEVBQUUsR0FBSSxNQUFNLENBQUUsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFFLElBQUksU0FBUyxDQUFDO2FBQ3BGO1FBQ0YsQ0FBQztRQUVNLEtBQUssQ0FBa0I7UUFDdkIsS0FBSyxDQUFtQjtRQUV4QixTQUFTO1lBRWYsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDeEIsQ0FBQztLQUNEO0lBekNZLFlBQU8sVUF5Q25CLENBQUE7QUFLRixDQUFDLEVBakhnQixJQUFJLEtBQUosSUFBSSxRQWlIcEIifQ==