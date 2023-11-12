import { StringSource } from "../model/leaf.js";
export var defs;
(function (defs) {
    defs.ap = (source, create) => {
        return new ArrayParts(source, create);
    };
    defs.each = defs.ap;
    class ArrayParts {
        source;
        create;
        constructor(source, create) {
            this.source = source;
            this.create = create;
        }
    }
    defs.ArrayParts = ArrayParts;
    //  //
    defs.createElement = (type, first, ...rest) => {
        if (first && typeof first == "object") {
            if (!("isElement" in first || first instanceof StringSource || first instanceof ArrayParts)) // ! isPart
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
export const ap = defs.ap;
export const each = defs.each;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFRLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS3RELE1BQU0sS0FBVyxJQUFJLENBb0lwQjtBQXBJRCxXQUFpQixJQUFJO0lBc0ZQLE9BQUUsR0FBRyxDQUFXLE1BQXVCLEVBQUUsTUFBMEMsRUFBRyxFQUFFO1FBRXBHLE9BQU8sSUFBSSxVQUFVLENBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQ3pDLENBQUMsQ0FBQztJQUVXLFNBQUksR0FBRyxLQUFBLEVBQUUsQ0FBQztJQUV2QixNQUFhLFVBQVU7UUFJZDtRQUNBO1FBSFIsWUFFUSxNQUF1QixFQUN2QixNQUEwQztZQUQxQyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFvQztRQUNoRCxDQUFDO0tBQ0g7SUFQWSxlQUFVLGFBT3RCLENBQUE7SUFTRCxNQUFNO0lBRU8sa0JBQWEsR0FBRyxDQUFFLElBQWEsRUFBRSxLQUE0QixFQUFFLEdBQUksSUFBYyxFQUFhLEVBQUU7UUFFNUcsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLElBQUksUUFBUSxFQUNyQztZQUNDLElBQUksQ0FBRSxDQUFFLFdBQVcsSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLFlBQVksSUFBSSxLQUFLLFlBQVksVUFBVSxDQUFFLEVBQUksV0FBVzthQUM3RztnQkFDQyxPQUFPO29CQUNOLFNBQVMsRUFBRSxJQUFJO29CQUNmLElBQUk7b0JBQ0osR0FBSSxLQUFLO29CQUNULEtBQUssRUFBRSxJQUFJO2lCQUNYLENBQUM7YUFDRjtTQUNEO1FBRUQsT0FBTztZQUNOLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSTtZQUNKLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDN0MsQ0FBQztJQUNILENBQUMsQ0FBQTtBQUNGLENBQUMsRUFwSWdCLElBQUksS0FBSixJQUFJLFFBb0lwQjtBQUVELE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQzFCLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDIn0=