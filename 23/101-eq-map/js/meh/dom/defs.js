import { Leaf, ToStr } from "../model/leaf.js";
import { Lian } from "../model/lian.js";
export var defs;
(function (defs) {
    class LP {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    const clp = (src, create) => new LP(src, create);
    const l = new Lian(...["a", "b", "c"]);
    const lp = new LP(l, (v) => console.log("LP", v));
    lp.source.forEach(item => lp.create(item));
    //  //
    defs.createElement = (type, first, ...rest) => {
        if (typeof first == "object") {
            if (!("isElement" in first || first instanceof Leaf || first instanceof ToStr)) {
                return {
                    isElement: true,
                    type,
                    props: first,
                    parts: rest
                };
            }
        }
        return {
            isElement: true,
            type,
            parts: first ? [first, ...rest] : undefined
        };
    };
})(defs || (defs = {}));
const x = {};
x;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFJeEMsTUFBTSxLQUFXLElBQUksQ0EyR3BCO0FBM0dELFdBQWlCLElBQUk7SUFxRHBCLE1BQU0sRUFBRTtRQUVQLE1BQU0sQ0FBQztRQUNQLE1BQU0sQ0FBQztRQUVQLFlBRUMsTUFBbUIsRUFDbkIsTUFBNkI7WUFHN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsQ0FBQztLQUNEO0lBRUQsTUFBTSxHQUFHLEdBQUcsQ0FBUSxHQUFnQixFQUFFLE1BQTZCLEVBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFFLEdBQUcsRUFBRSxNQUFNLENBQUUsQ0FBQztJQUUvRixNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBYyxHQUFJLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBRSxDQUFDO0lBRXhELE1BQU0sRUFBRSxHQUFTLElBQUksRUFBRSxDQUFjLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztJQUUxRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUUsQ0FBQztJQVMvQyxNQUFNO0lBRU8sa0JBQWEsR0FBRyxDQUFFLElBQWEsRUFBRSxLQUFzQixFQUFFLEdBQUksSUFBYyxFQUFhLEVBQUU7UUFFdEcsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQzVCO1lBQ0MsSUFBSSxDQUFFLENBQUUsV0FBVyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksSUFBSSxJQUFJLEtBQUssWUFBWSxLQUFLLENBQUUsRUFDakY7Z0JBQ0MsT0FBTztvQkFDTixTQUFTLEVBQUUsSUFBSTtvQkFDZixJQUFJO29CQUNKLEtBQUssRUFBRSxLQUFLO29CQUNaLEtBQUssRUFBRSxJQUFJO2lCQUNYLENBQUM7YUFDRjtTQUNEO1FBRUQsT0FBTztZQUNOLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSTtZQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDN0MsQ0FBQztJQUNILENBQUMsQ0FBQTtBQUNGLENBQUMsRUEzR2dCLElBQUksS0FBSixJQUFJLFFBMkdwQjtBQU9ELE1BQU0sQ0FBQyxHQUFTLEVBQUUsQ0FBQztBQUNuQixDQUFDLENBQUEifQ==