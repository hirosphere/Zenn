import { Leafr } from "../model/index.js";
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
    /** Part */
    class PartsFragment {
        items;
        constructor(items) {
            this.items = items;
        }
    }
    defs.PartsFragment = PartsFragment;
    class RennEach {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    defs.RennEach = RennEach;
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
                        (first instanceof RennEach) ||
                        (first instanceof Leafr))) {
                this.echar = first;
                this.parts = remain;
            }
            else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLEtBQUssRUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFJeEIsTUFBTSxLQUFXLElBQUksQ0F5SXBCO0FBeklELFdBQWlCLElBQUk7SUFFcEI7Ozs7Ozs7Ozs7O09BV0c7SUFRSCxXQUFXO0lBRVgsTUFBYSxhQUFhO1FBRUw7UUFBcEIsWUFBb0IsS0FBc0I7WUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFBRyxDQUFDO0tBRzlDO0lBTFksa0JBQWEsZ0JBS3pCLENBQUE7SUFFRCxNQUFhLFFBQVE7UUFJWjtRQUNBO1FBSFIsWUFFUSxNQUFtQixFQUNuQixNQUF3QztZQUR4QyxXQUFNLEdBQU4sTUFBTSxDQUFhO1lBQ25CLFdBQU0sR0FBTixNQUFNLENBQWtDO1FBRS9DLENBQUM7S0FHRjtJQVZZLGFBQVEsV0FVcEIsQ0FBQTtJQWtERCxvQkFBb0I7SUFFcEIsTUFBYSxPQUFPO1FBSVg7UUFDQTtRQUhSLFlBRVEsRUFBVyxFQUNYLElBQWEsRUFDcEIsS0FBNEIsRUFDNUIsTUFBa0I7WUFIWCxPQUFFLEdBQUYsRUFBRSxDQUFTO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUztZQUtwQixJQUFJLEtBQUssS0FBSyxTQUFTO2dCQUFJLE9BQU87WUFFbEMsSUFFRSxLQUFLLFlBQVksTUFBTTs7b0JBRXZCLENBQ0EsQ0FDQyxDQUFFLEtBQUssWUFBWSxPQUFPLENBQUU7d0JBQzVCLENBQUUsS0FBSyxZQUFZLFFBQVEsQ0FBRTt3QkFDN0IsQ0FBRSxLQUFLLFlBQVksS0FBSyxDQUFFLENBQzFCLEVBRUg7Z0JBQ0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO2FBQ3BCO2lCQUVEO2dCQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUUsTUFBTSxJQUFJLENBQUUsS0FBSyxFQUFFLEdBQUksTUFBTSxDQUFFLElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBRSxJQUFJLFNBQVMsQ0FBQzthQUNwRjtRQUNGLENBQUM7UUFFTSxLQUFLLENBQWtCO1FBQ3ZCLEtBQUssQ0FBbUI7UUFFeEIsU0FBUztZQUVmLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3hCLENBQUM7S0FDRDtJQXhDWSxZQUFPLFVBd0NuQixDQUFBO0FBS0YsQ0FBQyxFQXpJZ0IsSUFBSSxLQUFKLElBQUksUUF5SXBCIn0=