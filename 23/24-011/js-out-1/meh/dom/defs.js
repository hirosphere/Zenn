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
    class Each {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    defs.Each = Each;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFTLEtBQUssRUFBUSxNQUFNLG1CQUFtQixDQUFDO0FBQ3ZELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFJeEIsTUFBTSxLQUFXLElBQUksQ0F1SXBCO0FBdklELFdBQWlCLElBQUk7SUFFcEI7Ozs7Ozs7Ozs7O09BV0c7SUFRSCxXQUFXO0lBRVgsTUFBYSxhQUFhO1FBRUw7UUFBcEIsWUFBb0IsS0FBc0I7WUFBdEIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFBRyxDQUFDO0tBRzlDO0lBTFksa0JBQWEsZ0JBS3pCLENBQUE7SUFFRCxNQUFhLElBQUk7UUFJUjtRQUNBO1FBSFIsWUFFUSxNQUFtQyxFQUNuQyxNQUFnQztZQURoQyxXQUFNLEdBQU4sTUFBTSxDQUE2QjtZQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUV2QyxDQUFDO0tBR0Y7SUFWWSxTQUFJLE9BVWhCLENBQUE7SUFnREQsb0JBQW9CO0lBRXBCLE1BQWEsT0FBTztRQUlYO1FBQ0E7UUFIUixZQUVRLEVBQVcsRUFDWCxJQUFhLEVBQ3BCLEtBQTRCLEVBQzVCLE1BQWtCO1lBSFgsT0FBRSxHQUFGLEVBQUUsQ0FBUztZQUNYLFNBQUksR0FBSixJQUFJLENBQVM7WUFLcEIsSUFBSSxLQUFLLEtBQUssU0FBUztnQkFBSSxPQUFPO1lBRWxDLElBRUUsS0FBSyxZQUFZLE1BQU07O29CQUV2QixDQUNBLENBQ0MsQ0FBRSxLQUFLLFlBQVksT0FBTyxDQUFFO3dCQUM1QixDQUFFLEtBQUssWUFBWSxJQUFJLENBQUU7d0JBQ3pCLENBQUUsS0FBSyxZQUFZLEtBQUssQ0FBRSxDQUMxQixFQUVIO2dCQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUNwQjtpQkFFRDtnQkFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxDQUFFLE1BQU0sSUFBSSxDQUFFLEtBQUssRUFBRSxHQUFJLE1BQU0sQ0FBRSxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUUsSUFBSSxTQUFTLENBQUM7YUFDcEY7UUFDRixDQUFDO1FBRU0sS0FBSyxDQUFrQjtRQUN2QixLQUFLLENBQW1CO1FBRXhCLFNBQVM7WUFFZixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN4QixDQUFDO0tBQ0Q7SUF4Q1ksWUFBTyxVQXdDbkIsQ0FBQTtBQUtGLENBQUMsRUF2SWdCLElBQUksS0FBSixJQUFJLFFBdUlwQiJ9