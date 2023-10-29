import { ToString } from "../model/leaf.js";
export var defs;
(function (defs) {
    defs.ap = (source, create) => {
        return new ArrayParts(source, create);
    };
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
        if (typeof first == "object") {
            if (!("isElement" in first || first instanceof ToString || first instanceof ArrayParts)) // ! isPart
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
// questplace //
{
    const c1 = () => { };
    const c2 = [() => { }, {}];
    const as1 = {};
    as1.a = () => { };
    as1.b = [() => { }, { passive: false }];
    const ae = (e, n, a) => {
        e?.addEventListener(n, a);
    };
    ae(null, "", (ev) => { ev.target; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvZG9tL2RlZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFRLFFBQVEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBS2xELE1BQU0sS0FBVyxJQUFJLENBNkhwQjtBQTdIRCxXQUFpQixJQUFJO0lBaUZQLE9BQUUsR0FBRyxDQUFpQixNQUF1QixFQUFFLE1BQTBDLEVBQUcsRUFBRTtRQUUxRyxPQUFPLElBQUksVUFBVSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUM7SUFFRixNQUFhLFVBQVU7UUFJZDtRQUNBO1FBSFIsWUFFUSxNQUF1QixFQUN2QixNQUEwQztZQUQxQyxXQUFNLEdBQU4sTUFBTSxDQUFpQjtZQUN2QixXQUFNLEdBQU4sTUFBTSxDQUFvQztRQUNoRCxDQUFDO0tBQ0g7SUFQWSxlQUFVLGFBT3RCLENBQUE7SUFTRCxNQUFNO0lBRU8sa0JBQWEsR0FBRyxDQUFFLElBQWEsRUFBRSxLQUE0QixFQUFFLEdBQUksSUFBYyxFQUFhLEVBQUU7UUFFNUcsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQzVCO1lBQ0MsSUFBSSxDQUFFLENBQUUsV0FBVyxJQUFJLEtBQUssSUFBSSxLQUFLLFlBQVksUUFBUSxJQUFJLEtBQUssWUFBWSxVQUFVLENBQUUsRUFBSSxXQUFXO2FBQ3pHO2dCQUNDLE9BQU87b0JBQ04sU0FBUyxFQUFFLElBQUk7b0JBQ2YsSUFBSTtvQkFDSixHQUFJLEtBQUs7b0JBQ1QsS0FBSyxFQUFFLElBQUk7aUJBQ1gsQ0FBQzthQUNGO1NBQ0Q7UUFFRCxPQUFPO1lBQ04sU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJO1lBQ0osS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUM3QyxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyxFQTdIZ0IsSUFBSSxLQUFKLElBQUksUUE2SHBCO0FBR0QsZ0JBQWdCO0FBRWhCO0lBT0MsTUFBTSxFQUFFLEdBQVUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQzNCLE1BQU0sRUFBRSxHQUFVLENBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBRSxDQUFDO0lBRW5DLE1BQU0sR0FBRyxHQUFVLEVBQUUsQ0FBQztJQUN0QixHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUNqQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFFLENBQUM7SUFFekMsTUFBTSxFQUFFLEdBQUcsQ0FBRSxDQUFrQixFQUFFLENBQVUsRUFBRSxDQUFpQixFQUFHLEVBQUU7UUFFbEUsQ0FBQyxFQUFFLGdCQUFnQixDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUM3QixDQUFDLENBQUM7SUFFRixFQUFFLENBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQVUsRUFBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsQ0FBRSxDQUFDO0NBQ2hEIn0=