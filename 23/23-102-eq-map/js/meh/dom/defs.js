import { ToString } from "../model/leaf.js";
export var defs;
(function (defs) {
    const e = { isElement: true, type: "a" };
    //  //
    defs.createElement = (type, first, ...rest) => {
        if (typeof first == "object") {
            if (!("isElement" in first || first instanceof ToString)) // ! isPart
             {
                return {
                    isElement: true,
                    type,
                    ...first,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFRLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2xELE1BQU0sS0FBVyxJQUFJLENBd0dwQjtBQXhHRCxXQUFpQixJQUFJO0lBNkJwQixNQUFNLENBQUMsR0FBYSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBbURuRCxNQUFNO0lBRU8sa0JBQWEsR0FBRyxDQUFFLElBQWEsRUFBRSxLQUE0QixFQUFFLEdBQUksSUFBYyxFQUFhLEVBQUU7UUFFNUcsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQzVCO1lBQ0MsSUFBSSxDQUFFLENBQUUsV0FBVyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksUUFBUSxDQUFFLEVBQUksV0FBVzthQUMxRTtnQkFFQyxPQUFPO29CQUNOLFNBQVMsRUFBRSxJQUFJO29CQUNmLElBQUk7b0JBQ0osR0FBSSxLQUFLO29CQUNULEtBQUssRUFBRSxJQUFJO2lCQUNYLENBQUM7YUFDRjtTQUNEO1FBRUQsT0FBTztZQUNOLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSTtZQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDN0MsQ0FBQztJQUNILENBQUMsQ0FBQTtBQUNGLENBQUMsRUF4R2dCLElBQUksS0FBSixJQUFJLFFBd0dwQiJ9