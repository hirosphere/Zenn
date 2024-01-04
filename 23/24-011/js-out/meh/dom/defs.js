import { LeafrRefFactory } from "../model/index.js";
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
        constructor(ns, type, first_part, remain_parts) {
            this.ns = ns;
            this.type = type;
            if (first_part === undefined)
                return;
            if (first_part instanceof Object
                &&
                    !((first_part instanceof Element) ||
                        (first_part instanceof Each) ||
                        (first_part instanceof LeafrRefFactory))) {
                this.echar = first_part;
                this.parts = remain_parts;
            }
            else {
                this.parts = remain_parts ? [first_part, ...remain_parts] : [first_part];
            }
        }
        echar;
        parts;
        terminate() {
            this.ns = "";
            this.parts = undefined;
        }
    }
    defs.Element = Element;
})(defs || (defs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBSXBELE1BQU0sS0FBVyxJQUFJLENBaUhwQjtBQWpIRCxXQUFpQixJQUFJO0lBRXBCOzs7Ozs7Ozs7OztPQVdHO0lBTUgsaUJBQWlCO0lBRWpCLE1BQWEsSUFBSTtRQUVoQixZQUFhLE1BQXlCLElBQ3JDLENBQUM7S0FDRjtJQUpZLFNBQUksT0FJaEIsQ0FBQTtJQU1ZLFlBQU8sR0FBRyxDQUFFLElBQW1CLEVBQUcsRUFBRSxDQUFDLENBQ2xELENBQ0MsQ0FBRSxJQUFJLFlBQVksT0FBTyxDQUFFO1FBQzNCLENBQUUsSUFBSSxZQUFZLElBQUksQ0FBRTtRQUN4QixDQUFFLElBQUksWUFBWSxlQUFlLENBQUUsQ0FDbkMsQ0FBQztJQTZCRixvQkFBb0I7SUFFcEIsTUFBYSxPQUFPO1FBSVg7UUFDQTtRQUhSLFlBRVEsRUFBVyxFQUNYLElBQWEsRUFDcEIsVUFBaUMsRUFDakMsWUFBd0I7WUFIakIsT0FBRSxHQUFGLEVBQUUsQ0FBUztZQUNYLFNBQUksR0FBSixJQUFJLENBQVM7WUFLcEIsSUFBSSxVQUFVLEtBQUssU0FBUztnQkFBSSxPQUFPO1lBRXZDLElBRUUsVUFBVSxZQUFZLE1BQU07O29CQUU1QixDQUNBLENBQ0MsQ0FBRSxVQUFVLFlBQVksT0FBTyxDQUFFO3dCQUNqQyxDQUFFLFVBQVUsWUFBWSxJQUFJLENBQUU7d0JBQzlCLENBQUUsVUFBVSxZQUFZLGVBQWUsQ0FBRSxDQUN6QyxFQUVIO2dCQUNDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQzthQUMxQjtpQkFFRDtnQkFDQyxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBRSxVQUFVLEVBQUUsR0FBSSxZQUFZLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBRSxVQUFVLENBQUUsQ0FBQzthQUM5RTtRQUNGLENBQUM7UUFFTSxLQUFLLENBQWtCO1FBQ3ZCLEtBQUssQ0FBbUI7UUFFeEIsU0FBUztZQUVmLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDeEIsQ0FBQztLQUNEO0lBekNZLFlBQU8sVUF5Q25CLENBQUE7QUFLRixDQUFDLEVBakhnQixJQUFJLEtBQUosSUFBSSxRQWlIcEIifQ==